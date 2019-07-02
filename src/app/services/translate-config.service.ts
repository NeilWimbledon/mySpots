import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  constructor(
    private translate: TranslateService
  ) { }

  public init() :Promise<void> {
    let language :string = this.translate.getBrowserLang();
    this.translate.setDefaultLang("en");
    return this.setLanguage(language);
  }
 
  public setLanguage(setLang :string) :Promise<void> {
    return( this.translate.use(setLang).toPromise());
  }
}
