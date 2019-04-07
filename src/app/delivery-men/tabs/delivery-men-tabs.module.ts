import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeliveryMenTabsPage } from './delivery-men-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryMenTabsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeliveryMenTabsPage]
})
export class DeliveryMenTabsPageModule {}
