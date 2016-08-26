import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Device} from 'ionic-native';
import {AppointmentService} from '../../providers/appointments/appointments';
import {ApptSchedule} from '../appt-schedule/appt-schedule';  

@Component({
  templateUrl: 'build/pages/about/about.html',
  providers: [AppointmentService]
})
export class AboutPage {

  public appts;
  public username;
  public uuid;
  public expandDetails = false;
  public loading = false;

  constructor(
    private navCtrl: NavController, 
    private platform: Platform, 
    private appointments: AppointmentService) {
  }

  public getAppointments() {
    this.loading = true;
    this.appointments.loadAppointments().subscribe(
      data => {
        this.loading = false;
        this.appts = data.json();
        this.appts.sort(function(a, b) {
          return parseFloat(a.order) - parseFloat(b.order);
        });
      },
      err => console.error(err),
        () => console.log('getRepos completed')
    );
  }

  public goToDetails(appointment) {  
    this.navCtrl.push(ApptSchedule, { appointment: appointment });
  }

  private getId() {
    this.platform.ready().then(() => {
     this.uuid = Device.device.uuid;
     if (this.uuid == "" || this.uuid === null) {
       this.uuid = "uuidNA";
     }
    });
  }

  displayInfo() {
    if (this.expandDetails) {
      this.expandDetails = false;
    } else {
      this.expandDetails = true;
    }
  }

  cancelAppointment(id) {
    this.loading = true;
    this.appointments.updateAppointment(
      "", "", "", "", id, true
    ).subscribe(
    data => {
      this.getAppointments();
      },
      err => console.error(err),
        () => console.log('completed')
    );
  }

  //set uuid on init
  ngOnInit() {
    this.getId();
  }

  //navigating back from appointments
  onPageWillEnter() {
    this.getAppointments();
  }

}
