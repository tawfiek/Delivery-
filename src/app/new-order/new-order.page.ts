import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewOrdersService} from '../services/orders/new-orders.service';
import {Order} from '../interfaces/order';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {

  orderForm: FormGroup;
  loading;
  constructor(private modalCtrl: ModalController,
              private formBuilder: FormBuilder,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private newOrdersService: NewOrdersService) { }

  ngOnInit() {
    this.initForm();
  }

  /**
   * Initialize Login Form
   */
  initForm () {
    this.orderForm = this.formBuilder.group({
      details: ['', Validators.required],
      addressFrom: ['', Validators.required],
      addressTo: ['', Validators.required]
    })
  }


  /**
   * Add  New Order to  the database
   * @param value: value of  orderForm
   */

  addOrder(value){
    this.presentLoading('Loading').then(()=>{
      const order: Order = {
        addressFrom: value.addressFrom,
        addressTo: value.addressTo,
        createdAt: new Date(),
        details: value.details,
        createdBy: localStorage.getItem('userEmail')
      };
        this.newOrdersService.addOrder(order).then((res)=> {
          this.loading.dismiss().then(()=>{
            this.close(true);
          })
      }).catch(err=>{
          this.loading.dismiss();
          this.presentAlert('Error', err.message);
      })
    })
  }



  /**
   * Function to  present an alert..
   * @param header: Header of the alert
   * @param message: message of alert
   */
  async presentAlert(header?: string ,message?: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  /**
   * Function to  present an loading..
   * @param message: message of loading
   */
  async presentLoading (message) {
    this.loading = await this.loadingCtrl.create({message: message});
    this.loading.present();
  }

  /**
   * Close the Modal.
   *
   */
  close(actionDone) {
    this.modalCtrl.dismiss({'actionDone': actionDone});
  }

}
