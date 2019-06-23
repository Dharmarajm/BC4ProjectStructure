import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ImagePicker, ImagePickerOptions  } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File, FileEntry, IFile } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AlertController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Base64 } from '@ionic-native/base64/ngx';
import { EditProfilePage } from './edit-profile/edit-profile.page';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page },{ path: 'edit-profile', component:EditProfilePage}])
  ],
  declarations: [Tab3Page,EditProfilePage],
  providers: [
  ImagePicker,
  Crop,
  Camera,
  FileTransfer,
  File,
  Base64,
  WebView,
  AlertController,
  ],

})
export class Tab3PageModule {}
