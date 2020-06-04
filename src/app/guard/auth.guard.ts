import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private navCtrl: NavController,
    ) {

    }

    canActivate() {
        const user = localStorage.getItem('devgram.user');
        if (!user) {
            this.navCtrl.navigateRoot('login');
            return false;
        }

        return true;
    }

}