import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import {Device} from 'ionic-native';
import {AppointmentService} from '../../providers/appointments/appointments';

@Component({
  templateUrl: 'build/pages/appt-schedule/appt-schedule.html',
  providers: [AppointmentService]
})

export class ApptSchedule {

  constructor(
  	private navCtrl: NavController,
  	private navParams: NavParams,
  	private appointments: AppointmentService,
  	private platform: Platform) {}

  public appointment = this.navParams.get('appointment');
  public name: string;
  public phone: string;
  public message: string;
  public apptId = this.appointment._id;
  private uuid;
  public loading = false;
  public success = false;

  schedule() {
    this.loading = true;
  	this.platform.ready().then(() => {
     this.uuid = Device.device.uuid;
     this.appointments.updateAppointment(
  		this.name, this.phone, this.message, this.uuid, this.apptId, false
  		).subscribe(
      data => {
        this.loading = false;
        this.success = true;
      },
        err => console.error(err),
          () => console.log('completed')
      );
    });
  }

  private getId() {
    this.platform.ready().then(() => {
     this.uuid = Device.device.uuid;
    });
  }

}
