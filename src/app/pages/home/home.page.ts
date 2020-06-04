import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, NavController, ActionSheetController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public user: User = new User('', '', 'https://placehold.it/80');
  posts: Observable<any[]>;

  constructor(
    db: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.posts = db.collection('posts').valueChanges();
  }
  
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('devgram.user'));

    const img = localStorage.getItem('devgram.post');
    if (img) this.showMessage("Você tem uma publicação não salva"); 

  }

  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message: message, duration: 3000, buttons: [
        {
        icon: "send",
        handler: () => {
          this.navCtrl.navigateForward("/post")
        }
      }
    ]
  })
}

async showOptions() {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Opções',
    buttons:[{
      text: 'Logout',
      role: 'destructive',
      icon: 'power',
      handler: () => {
        localStorage.removeItem('devgram.user');
        this.navCtrl.navigateRoot("/login");
      }
    }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
    }]
  });
  await actionSheet.present();
}

}
