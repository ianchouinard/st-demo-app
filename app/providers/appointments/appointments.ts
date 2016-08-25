import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppointmentService {  
    constructor(private http: Http) {
    }

    loadAppointments() {
        let appts = this.http.get(`https://st-demo-appointment-api.herokuapp.com/appointment`);
        return appts;
    }

    updateAppointment(name, phone, message, uuid, id, addOrRemove) {
    	var apiurl = 'https://st-demo-appointment-api.herokuapp.com/appointment/' + id;
    	var payload = JSON.stringify({name: name, phone: phone, message: message, uuid: uuid, available: addOrRemove });
    	let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
    	this.http.put(apiurl, payload, {headers: headers})
        	.subscribe(data => {
         	console.log(data);
        }, error => {
            console.log("Error");
        });
    }

}

