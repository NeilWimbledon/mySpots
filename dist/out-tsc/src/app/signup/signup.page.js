import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService, registerErrorNum } from '../auth-service';
var SignupPage = /** @class */ (function () {
    function SignupPage(authService, alert, router, loadingController) {
        this.authService = authService;
        this.alert = alert;
        this.router = router;
        this.loadingController = loadingController;
        this.email = "";
        this.password = "";
        this.cPassword = "";
    }
    SignupPage.prototype.ngOnInit = function () {
    };
    SignupPage.prototype.signUp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                duration: 10000,
                                message: "Loading...",
                                showBackdrop: true,
                                translucent: false
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        this.loading.present();
                        //const { email, password, cPassword } = this
                        if (this.password !== this.cPassword) {
                            this.showAlert("Error", "Passwords did not match.");
                            this.loading.dismiss();
                            return [2 /*return*/];
                        }
                        this.authService.register(this.email, this.password)
                            .then(function (uid) {
                            console.log("User Created with ID: " + uid);
                            _this.showAlert("Success", "Welcome aboard.");
                            _this.router.navigate(['/tabs']);
                            _this.loading.dismiss();
                        })
                            .catch(function (err) {
                            console.dir(err);
                            if (err.failureReason == registerErrorNum.userExists) {
                                _this.showAlert("Error", "This email address already exists please sign in");
                            }
                            else {
                                _this.showAlert("Error", err.failureMessage);
                            }
                            _this.loading.dismiss();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SignupPage.prototype.showAlert = function (header, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alert.create({
                            header: header,
                            message: message,
                            buttons: ["OK"]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SignupPage = tslib_1.__decorate([
        Component({
            selector: 'app-signup',
            templateUrl: './signup.page.html',
            styleUrls: ['./signup.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            AlertController,
            Router,
            LoadingController])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.page.js.map