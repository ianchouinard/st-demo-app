import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';

declare var navigator: any;
declare var Connection: any;

@Component({
	templateUrl: 'build/modules/networkstatus/networkstatus.html',
	selector: 'networkstatus'
})
export class NetworkStatus {

	constructor(private platform: Platform) {}
	
	public netInfo;
	public message;
	public cssClass;

	checkNetwork() {
        this.platform.ready().then(() => {
            var networkState = navigator.connection.type;
            var states = {};

            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet';
            states[Connection.WIFI]     = 'WiFi';
            states[Connection.CELL_2G]  = '2G connection';
            states[Connection.CELL_3G]  = '3G connection';
            states[Connection.CELL_4G]  = '4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';
            this.netInfo = states[networkState];

            var hasInternet = ['WiFi, Ethernet'];
            var usingData = ['2G connection', '3G connection', '4G connection', 'Cell generic connection'];
            if (hasInternet.indexOf(states[networkState]) > -1) {
            	this.message = "Connected to " + states[networkState]; 
            	this.cssClass = "network-status-good";
            } else if (usingData.indexOf(states[networkState]) > -1) {
            	this.message = 'You are using a ' + states[networkState] + '. This may consume data.'
            	this.cssClass = 'network-status-warning';
            } else if (states[networkState] == 'No network connection') {
            	this.message = "You are not connected to wireless";
            	this.cssClass = 'network-status-error';
            } else {
            	this.message = "";
            	this.cssClass = 'hidden';
            }
            
        });
    }

    ngOnInit() {
    	this.checkNetwork();
    }

}