import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {

   constructor(private http: HttpClient) { }

care_detail(data){
	return this.http.post(environment.apiUrl+"users/patient_register",data)
}
login_credential(credential){
	return this.http.post(environment.apiUrl+"auth/login",credential)
	
}
verify_CGId(id){
	return this.http.get(environment.apiUrl+"users/user_uid?user_uid="+id)
}
CGdetails(val){
	return this.http.post(environment.apiUrl+"users/caregiver_register",val)
}

emailVerify(mail){
	 return this.http.get(environment.apiUrl+"users/identify_user?email="+mail)

}
VerifyCode(code,id){
	 return this.http.get(environment.apiUrl+"users/verification_code?user_id="+id+"&&verification_code="+code)
}
pwdUpdate(val){
   	return this.http.post(environment.apiUrl+"users/password_updation",val)

}
}
