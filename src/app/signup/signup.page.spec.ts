import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth-service';
import { SignupPage } from './signup.page';

describe('SignupPage', () => {
  let component: SignupPage;
  let fixture: ComponentFixture<SignupPage>;
  
  class RouterStub {
  };
  class AuthServiceStub{

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        AlertController,
        LoadingController,
        { provide: Router, useClass: RouterStub },
        { provide: AuthService, useClass: AuthServiceStub },
        
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
