import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';
var Tab1Page = /** @class */ (function () {
    function Tab1Page(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    Tab1Page.prototype.register = function () {
        this.router.navigate(['/signup']);
    };
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            AuthService])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map