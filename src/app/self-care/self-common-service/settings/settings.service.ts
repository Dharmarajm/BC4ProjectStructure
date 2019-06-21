import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class settingsService {

  constructor(private http: HttpClient) {
  }

  aboutUpdate(detail){
	return this.http.post(environment.apiUrl+"health_details/about_update",detail)
  }
  
  aboutDetail(){
	return this.http.get(environment.apiUrl+"health_details/about")
  }

  getPreview(id){
   return this.http.get(environment.apiUrl+"users/user_details?user_uid="+id)
  }

  setting(){
      return this.http.get(environment.apiUrl+"users/picture_show")
  }
  editprofile(val,id){
    return this.http.put(environment.apiUrl+"users/"+id,val)
  }
  sendimage(val){
  return this.http.post(environment.apiUrl+"users/profile_picture",val)
    }

  contactDetails(){
      return this.http.get(environment.apiUrl+"emergency_details")

  }
  addContacts(user_details){
      return this.http.post(environment.apiUrl+"emergency_details",user_details)

  }
}
