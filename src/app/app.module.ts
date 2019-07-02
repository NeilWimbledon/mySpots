import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth-service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from './services/translate-config.service';
 
export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [  BrowserModule, 
              IonicModule.forRoot(), 
              AppRoutingModule,
              AngularFirestoreModule, // imports firebase/firestore, only needed for database features
              AngularFireAuthModule, // imports firebase/auth, only needed for auth features
              AngularFireModule.initializeApp(environment.firebaseConfig),
              HttpClientModule,
              TranslateModule.forRoot({
                loader: {
                  provide: TranslateLoader,
                  useFactory: (LanguageLoader),
                  deps: [HttpClient]
                }
              }),
            ],
              
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    TranslateConfigService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
