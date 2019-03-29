import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClientsSaveCompanyPage } from './clients-save-company.page';

const routes: Routes = [
  {
    path: '',
    component: ClientsSaveCompanyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClientsSaveCompanyPage]
})
export class ClientsSaveCompanyPageModule {}
