import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NetworkStatus} from '../../modules/networkstatus/networkstatus';

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [NetworkStatus]
})
export class HomePage {
  constructor(private navCtrl: NavController) {
  
  }
}
