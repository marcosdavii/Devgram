import { environment } from './../../../environments/environment.prod';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PostPageRoutingModule } from './post-routing.module';
import { PostPage } from './post.page';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from  '@angular/fire/storage';
import { AngularFireAuthModule} from '@angular/fire/auth';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPageRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'devgram'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  declarations: [PostPage]
})
export class PostPageModule {}
