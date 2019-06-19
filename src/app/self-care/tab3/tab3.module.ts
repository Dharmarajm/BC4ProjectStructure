import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { SettingServiceService } from './setting-service.service';
import { ImagePicker, ImagePickerOptions  } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File, FileEntry, IFile } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AlertController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule.forChild([{ path: '', component: Tab3Page },{ path: 'edit-profile', loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule'}])
  ],
  declarations: [Tab3Page],
  providers: [
  SettingServiceService,
  ImagePicker,
  Crop,
  Camera,
  FileTransfer,
  File,
  WebView,
  AlertController,
  ],

})
export class Tab3PageModule {}
