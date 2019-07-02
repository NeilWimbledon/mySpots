import { TestBed } from '@angular/core/testing';

import { TranslateConfigService } from './translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

describe('TranslateConfigService', () => {

  let TranslateServiceSpy :any = jasmine.createSpyObj('TranslateService ', [ 'getBrowserLang', 'setDefaultLang', 'use' ]);
  TranslateServiceSpy.use.and.callFake(function(lang :string) :Observable<any>{
     return new Observable();
   });

  TranslateServiceSpy.getBrowserLang.and.callFake(function() :string{ return "fr"});

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: TranslateService, useValue: TranslateServiceSpy },
      
    ],
  }));

  it('should be created', () => {
    const service: TranslateConfigService = TestBed.get(TranslateConfigService);
    expect(service).toBeTruthy();
  });
  it('Should initialise', () => {
    const service: TranslateConfigService = TestBed.get(TranslateConfigService);
    let pr :any = service.init();
    expect(TranslateServiceSpy.getBrowserLang ).toHaveBeenCalled();
    expect(TranslateServiceSpy.setDefaultLang ).toHaveBeenCalledWith("en");
    expect(TranslateServiceSpy.use ).toHaveBeenCalledWith("fr");
  });

  it('Should set language', () =>{
    const service: TranslateConfigService = TestBed.get(TranslateConfigService);
    let pr :any = service.setLanguage("en");
    expect(TranslateServiceSpy.use ).toHaveBeenCalledWith("en");

});

});
