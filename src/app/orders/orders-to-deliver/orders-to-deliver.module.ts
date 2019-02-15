import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrdersToDeliverPage } from './orders-to-deliver.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersToDeliverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrdersToDeliverPage]
})
export class OrdersToDeliverPageModule {}
