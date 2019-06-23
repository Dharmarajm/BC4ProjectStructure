import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, AbstractControl  } from '@angular/forms';
import { Contacts, Contact, ContactField, ContactFieldType } from '@ionic-native/contacts/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { settingsService } from '../../self-common-service/settings/settings.service';
import { ToastController,ModalController } from '@ionic/angular';
import { contactListPage } from '../contact-list/contact-list.page';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
//user_type: any;
contactForm: FormGroup
contact_details:any;
contactType:any;
tabBar:any;
userContactType: any=[{label:"Emergency",user_type:1},
                 {label:"Doctor",user_type:2},
                 {label:"Care Giver",user_type:3}]
  constructor(private router: Router, public route:ActivatedRoute, private fb: FormBuilder, private contacts: Contacts, private fileChooser: FileChooser, public userservice: settingsService,public toastController: ToastController,public modalController: ModalController) { 
    this.tabBar = document.getElementById('myTabBar');
    this.tabBar.style.display = 'none';
  }

    ngOnInit() {
       this.contactType=this.userContactType[0]['user_type'] 
    	 this.contactForm=this.fb.group({
       
    	'contact_name': [null,[Validators.required]],
    	'emergency_no': [null,[Validators.required, Validators.minLength(10)]],
      
     });
    }

  

    contact(){

        this.contacts.find(['*']).then((contacts)=>{
        alert(JSON.stringify(contacts[4]));
        
        this.contact_details=contacts;
      })
    }
   /* chooseUserType(data){
     this.user_type=data;
    }*/

    savecontact(val){
    	if(this.contactForm.valid){
        let user_details:any=val;
        user_details['user_type']=this.contactType
          this.userservice.addContacts(user_details).subscribe(res=>{
        	
            this.presentToast('Contact has been added successfully');
          	this.router.navigate(['self-care-tabs/tabs/tab2'])
          },error=>{
            console.log(error)
            if(error.status==422){
             this.presentToast('Contact Number has already been taken');
            }
          });

    	 
    	}else{
        
          this.presentToast('Please enter all the fields')
      }
    }

    async presentModal() {
        const modal = await this.modalController.create({
          component: contactListPage,
          componentProps: { value: this.contact_details }
        });
        return await modal.present();
    }

    _keyPress(event: any) {
      const pattern = /[0-9]/;
      let inputChar = String.fromCharCode(event.charCode);
      
      if(event.charCode!=0){
        if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
        }
      }
    }

    async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }



    ionViewWillLeave(){
       this.tabBar.style.display = 'flex'; 
    }

    close(){
     this.router.navigate(['/self-care-tabs/tabs/tab2'])
    }  
}
