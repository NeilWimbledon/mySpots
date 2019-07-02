import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(  private afAuth: AngularFireAuth,
                private translateService :TranslateService
    ){}

  /**
     * Creates a new user account associated with the specified email address and
     * password.
     *
     * On successful creation of the user account, this user will also be
     * signed in to your application.
     *
     * User account creation can fail if the account already exists or the password
     * is invalid.
     *
     * Note: The email address acts as a unique identifier for the user and
     * enables an email-based password reset.  This function will create
     * a new user account and set the initial user password.
     *
     * returns a promise wich resolves to the user id (UID)
     * If it fails a RegisterError is returned
     *
     * 
     * @param email The user's email address.
     * @param password The user's chosen password.
     */

  public register(email :string , password :string ) :Promise <string>{
   
    return new Promise<string>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( (res :firebase.auth.UserCredential) => {
        let uid :string = res.user.uid;
        resolve(uid);
        })
        .catch( err => {
            var myErr :Error  = new Error( this.translateService.instant("errors.auth.unknown"));
            myErr.name = "errors.auth.unknown";
            switch( err.code ){
              case "auth/email-already-in-use": {
                myErr.name = "errors.auth.exists";
                break;
              }
              case "auth/invalid-email": {
                myErr.name = "errors.auth.invalid";
                break;
              }
              case "auth/operation-not-allowed": {
                myErr.name = "errors.auth.notAllowed";
                break;
              }
              case "auth/weak-password": {
                myErr.name = "errors.auth.weak";
                break;
              }
              
              
            } 
            myErr.message = this.translateService.instant(myErr.name);
            reject(myErr);
        })
        
    })
  }
}


