import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { ToastController, NavController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  public post: Post = new Post('', '', null);
  public filters: string[] = [];

  public task: AngularFireUploadTask;
  public progress: any; 

  constructor( 
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private alertCrl: AlertController,
  ) { 
    
  }

  ngOnInit() {
    const data = localStorage.getItem('devgram.post');
    if (data) this.post = JSON.parse(data);
    this.filters.push('filter-normal');
    this.filters.push('filter-1997');
    this.filters.push('filter-aden');
    this.filters.push('filter-gingham');
    this.filters.push('filter-ginza');
    this.filters.push('filter-moon');
    this.filters.push('filter-reyes');
    this.filters.push('filter-willow');
  }

  getLocation() {
      // https://www.google.com/maps/{{ this.post.location }}
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.post.location = `${position.coords.latitude},${position.coords.longitude}`;
        localStorage.setItem('devgram.post', JSON.stringify(this.post));
      });
    } else {
      this.showMessage('Não possivel obter a sua localização');
    }
  }

  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({ 
      message: message, 
      duration: 3000, 
    });
    toast.present;
  }

  async showCloseOptions() { 
    const alert = await this.alertCrl.create({
      header: 'Descartar Postagem',
      message: 'Deseja descartar está <strong>postagem<strong>?',
      buttons: [{
        text: 'Descartar',
        role:'cancel',
        cssClass: 'secondary',
        handler: () => {
          localStorage.removeItem('devgram.post');
          this.close();
        }
      }, {
        text: 'Manter',
        handler: () => {
          this.close();
        }
      }
    ]
    });

    await alert.present();

  }
    close() {
      this.navCtrl.navigateBack("/home");  
    }

  saveLocal() {
    localStorage.setItem('devgram.post', JSON.stringify(this.post));
  }
  
  submit() {
    const filePath = `post_${new Date().getTime()}.jpg`;
    this.task = this.storage.ref(filePath).putString(this.post.image, 'data_url');
    this.progress = this.task.percentageChanges();

    this.task.then((data) => {
      const ref = this.storage.ref(data.metadata.fullPath);
      ref.getDownloadURL().subscribe((imgUrl) => {
        this.post.image = imgUrl; 
        this.db.collection('posts').add(this.post);
        localStorage.removeItem('devgram.post');
        this.navCtrl.navigateBack("/home")
      })
    })
  }


  showMap() {
    this.navCtrl.navigateForward("/map");
  }

}
