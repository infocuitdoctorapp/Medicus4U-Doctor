import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PatientdetailsPage } from '../patientdetails/patientdetails';
import { AlertController } from 'ionic-angular';
import { ProviderserviceProvider } from '../../Providers/providerservice/providerservice';
import { Observable } from '../../../node_modules/rxjs';

/**
 * Generated class for the UpcomingbookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upcomingbookings',
  templateUrl: 'upcomingbookings.html',
})
export class UpcomingbookingsPage {

  public upcomingbooking=[];
  public records:boolean= false;
  public subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,private api:ProviderserviceProvider,
    public modalCtrl: ModalController) {
    this.navParams = navParams;
    this.upcomingbooking = this.navParams.data;
  }

  ionViewDidLoad() {
    this.subscription = Observable.interval(5000).subscribe(x => {
    if(this.upcomingbooking.length == 0){
      this.records = true;
      }
      else{
        this.records = false;
      }
    });
    console.log('ionViewDidLoad UpcomingbookingsPage');
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navpatiententdetails(param) {
    let patientdetails = this.modalCtrl.create(PatientdetailsPage ,{"patientdetails":param});
    patientdetails.present();
    // this.navCtrl.push(PatientdetailsPage ,{"patientdetails":param});
    // console.log("parammmmm",param)
  }

  public appointment:any = {
    "checked": false,
  }
  updateappointment(appointment) {
    let alert = this.alertCtrl.create({
      subTitle:"Choose Reason For Appointment",
      // enableBackdropDismiss: false
    });
    // alert.setTitle('Choose Reason For Appointment');

    alert.addInput({
      type: 'radio',
      label: 'Headache',
      value: 'Headache',
      // checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'General',
      value: 'General',
      // checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Nausea',
      value: 'Nausea',
      // checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Viral',
      value: 'Viral',
      // checked: true
    });

    alert.addButton({
      text: 'Cancel',
      handler: data => {
        console.log("apppointment Cancelled", data);
        appointment.flag = true;
        this.api.updateappoinment('Cancel',appointment.app_id,data.value)
        .subscribe((resp:any) =>{
          if(resp.Message_Code == "RUS"){
            console.log("Patient Cancelled Successfully");
          }
        });
      }
    });
    alert.addButton({
      text: 'CheckOut',
      handler: data => {
        console.log("Appointment checkedout", data);
        appointment.flag = true;
        this.api.updateappoinment('Checkout',appointment.app_id,data.value)
        .subscribe((resp:any) =>{
          if(resp.Message_Code == "RUS"){
            console.log("Patient Checkout Successfully");
          }
        })
      }
    });
    alert.present();
    this.appointment.checked = true;
  }
}
