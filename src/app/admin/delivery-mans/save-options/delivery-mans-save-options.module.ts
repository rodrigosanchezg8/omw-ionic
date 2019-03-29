import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeliveryMansSaveOptionsPage } from './delivery-mans-save-options.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryMansSaveOptionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeliveryMansSaveOptionsPage]
})
export class DeliveryMansSaveOptionsPageModule {}
