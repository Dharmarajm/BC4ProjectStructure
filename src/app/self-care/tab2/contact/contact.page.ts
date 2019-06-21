import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, AbstractControl  } from '@angular/forms';
import { Contacts, Contact, ContactField, ContactFieldType } from '@ionic-native/contacts/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { settingsService } from '../../self-common-service/settings/settings.service';
import { ModalController } from '@ionic/angular';
import { contactListPage } from '../contact-list/contact-list.page';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
user_type: any;
contactForm: FormGroup
contact_details:any;
dataDetail: any=[{label:"Emergency",user_type:1},
                 {label:"Doctor",user_type:2},
                 {label:"Care Giver",user_type:3}]
  constructor(public modalController: ModalController,private router: Router, public route:ActivatedRoute, private fb: FormBuilder, private contacts: Contacts, private fileChooser: FileChooser, public userservice: settingsService) { 

 }

    ngOnInit() {

  	 this.contactForm=this.fb.group({
     
  	'contact_name': [null,[Validators.required]],
  	'emergency_no': [null,[Validators.required]],
    
   });
  }

  

contact(){

      this.contacts.find(['*']).then((contacts)=>{
      alert(JSON.stringify(contacts[4]));
      console.log(JSON.stringify(contacts))
      this.contact_details=contacts;
    })
  }
chooseUserType(data){
 this.user_type=data;
}
savecontact(val){
	if(this.contactForm.valid){
    let user_details:any=val;
    user_details['user_type']=this.user_type
     this.userservice.addContacts(user_details).subscribe(res=>{
    	console.log(res)

    	this.router.navigate(['self-care-tabs/tabs/tab2'])
       });

	 
	}else{
    alert('Enter All fields');
  }
}

 async presentModal() {
    const modal = await this.modalController.create({
      component: contactListPage,
      componentProps: { value: this.contact_details }
    });
    return await modal.present();
  }

}
