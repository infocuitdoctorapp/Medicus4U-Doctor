import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, App } from 'ionic-angular';
import { PatientdetailsPage } from '../patientdetails/patientdetails';

/**
 * Generated class for the PastbookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pastbookings',
  templateUrl: 'pastbookings.html',
})
export class PastbookingsPage {

  public pastbooking=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl:ModalController, public app: App) {
    this.navParams = navParams;
    this.pastbooking = this.navParams.data;
    console.log("DATA SUCCESS",this.pastbooking);
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad PastbookingsPage');
  }

  navpatiententdetails(param) {
    // this.app.getRootNav().setRoot(PatientdetailsPage ,{"patientdetails":param});
    // this.navCtrl.setRoot(PatientdetailsPage ,{"patientdetails":param});
   let pastbooking = this.modalCtrl.create(PatientdetailsPage ,{"patientdetails":param});
   pastbooking.present();
    console.log("parammmmm",param)
  }

}
