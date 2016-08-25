import { Injectable } from '@angular/core';
import {Platform, Storage, SqlStorage} from 'ionic-angular';


@Injectable()
export class Deviceid {

  constructor(private platform: Platform) {
  }

  public saveGeo() {
  	let storage = new Storage(SqlStorage);
		storage.set('name', 'rats');
		storage.get('name').then((name) => {
			console.log(name);
	});
  }

}

