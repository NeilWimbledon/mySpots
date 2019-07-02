import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
var AuthService = /** @class */ (function () {
    function AuthService(afAuth) {
        this.afAuth = afAuth;
    }
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
    AuthService.prototype.register = function (email, password) {
        return new Promise(function (resolve, reject) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function (res) {
                var uid = res.user.uid;
                resolve(uid);
            })
                .catch(function (err) {
                var msg = "Unknown eror creating user";
                var reason = registerErrorNum.Unknown;
                switch (err.code) {
                    case "auth/email-already-in-use": {
                        msg = "Email adress aleady in use";
                        reason = registerErrorNum.userExists;
                        break;
                    }
                    case "auth/invalid-email": {
                        msg = "Not a valid email adress";
                        reason = registerErrorNum.badEmail;
                        break;
                    }
                    case "auth/operation-not-allowed": {
                        msg = "Registration not enabled";
                        reason = registerErrorNum.notAllowed;
                        break;
                    }
                    case "auth/weak-password": {
                        msg = "Password to weak, choose a stringer password";
                        reason = registerErrorNum.weakPassword;
                        break;
                    }
                }
            });
        });
    };
    AuthService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
export var registerErrorNum;
(function (registerErrorNum) {
    registerErrorNum[registerErrorNum["userExists"] = 1] = "userExists";
    registerErrorNum[registerErrorNum["badEmail"] = 2] = "badEmail";
    registerErrorNum[registerErrorNum["notAllowed"] = 3] = "notAllowed";
    registerErrorNum[registerErrorNum["weakPassword"] = 4] = "weakPassword";
    registerErrorNum[registerErrorNum["Unknown"] = 5] = "Unknown";
})(registerErrorNum || (registerErrorNum = {}));
//# sourceMappingURL=auth-service.js.map