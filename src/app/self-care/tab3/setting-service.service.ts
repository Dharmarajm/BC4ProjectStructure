import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SettingServiceService {

  constructor(private http: HttpClient) { }

   setting(){
	    return this.http.get(environment.apiUrl+"users/picture_show")
	}
	editprofile(val,id){
		return this.http.put(environment.apiUrl+"users/"+id,val)
	}
	sendimage(val){
	return this.http.post(environment.apiUrl+"users/profile_picture",val)
    }

}
