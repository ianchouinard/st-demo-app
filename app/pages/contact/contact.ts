import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Camera} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/contact/contact.html'
})
export class ContactPage {

	public base64Image: string;

  	constructor(private navCtrl: NavController) {}

	takePicture(){
	    Camera.getPicture({
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false
        }).then(imageData => {
            this.base64Image = "data:image/jpeg;base64," + imageData;
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
  	}	

}
