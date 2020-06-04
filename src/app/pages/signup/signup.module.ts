import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignupPage } from './signup.page';

const routes: Routes = [
  {
    path: '',
    component: SignupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
