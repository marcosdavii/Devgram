import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private fbAuth: AngularFireAuth,
  ) { 
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
   }

  ngOnInit() {
  }

  async submit() {
    const loanding = await this.loadingCtrl.create({ message: "Cadastrando...." });
    loanding.present();  

    this.fbAuth
        .createUserWithEmailAndPassword(
        this.form.controls['email'].value,
        this.form.controls['password'].value)
        .then((data) => {
          this.showMessage("Bem-vindo");
          loanding.dismiss();
          this.navCtrl.navigateRoot('login');
        })
        .catch((err) => {
          this.loadingCtrl.dismiss();
          this.showMessage("Não foi possivel realizar seu cadastro");
        });
  }

  async showMessage(message: string) {
      const toast = await this.toastCtrl.create({
        message: message,
        duration: 3000
    });
    toast.present;
  }

  async cancel() {
    this.navCtrl.navigateBack('login');
  }
}
