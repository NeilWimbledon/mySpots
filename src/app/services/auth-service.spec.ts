import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthService } from './auth-service';
import { TranslateService } from '@ngx-translate/core';


describe('AuthService', () => {

  let instant = function (arg :string) :string {  return arg;};
 
  let authService : AuthService;
  let createUserWithEmailAndPasswordSpy : jasmine.Spy = jasmine.createSpy("createUserWithEmailAndPassword");
  let instantSpy : jasmine.Spy = jasmine.createSpy("instant", instant);
  let ExpectedUid :string = "12345";
  let email="test@test.com";
  let password ="password";

  let AngularFireAuthStub: any = {
      auth: {
        createUserWithEmailAndPassword: createUserWithEmailAndPasswordSpy,
      }
  };
  let TranslateServiceStub: any = {
    
    instant: instantSpy,
   
};

  beforeEach(() =>{ 

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: TranslateService, useValue: TranslateServiceStub },
        
      ],
    });
    createUserWithEmailAndPasswordSpy.calls.reset();
    
  });

 it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('should return a UID',() => {
    
    const service: AuthService = TestBed.get(AuthService);
    createUserWithEmailAndPasswordSpy.and.returnValue(Promise.resolve(ExpectedUid));
    service.register( email, password )
    .then( id =>{
      expect(createUserWithEmailAndPasswordSpy). toHaveBeenCalledWith(email, password),
      expect(id).toEqual(ExpectedUid);
    })

  })

  it('should fail with "errors.auth.exists"',() => {
    
    const service: AuthService = TestBed.get(AuthService);
    createUserWithEmailAndPasswordSpy.and.returnValue(Promise.reject({code: "auth/email-already-in-use"}));
    service.register( email, password )
    .catch( (err :Error ) =>{
     
      expect(createUserWithEmailAndPasswordSpy). toHaveBeenCalledWith(email, password),
      expect(err.name).toEqual("errors.auth.exists");
    })

  })

  it('should fail with "errors.auth.invalid"',() => {
    
    const service: AuthService = TestBed.get(AuthService);
      createUserWithEmailAndPasswordSpy.and.returnValue(Promise.reject({code:"auth/invalid-email"}));
    service.register( email, password )
    .catch( (err :Error ) =>{
     
      expect(createUserWithEmailAndPasswordSpy). toHaveBeenCalledWith(email, password),
      expect(err.name).toEqual("errors.auth.invalid");
    })

  })

  it('should fail with "errors.auth.notAllowed"',() => {
    
    const service: AuthService = TestBed.get(AuthService);
      createUserWithEmailAndPasswordSpy.and.returnValue(Promise.reject({code:"auth/operation-not-allowed"}));
    service.register( email, password )
    .catch( (err :Error ) =>{
     
      expect(createUserWithEmailAndPasswordSpy). toHaveBeenCalledWith(email, password),
      expect(err.name).toEqual("errors.auth.notAllowed");
    })

  })

  it('should fail with "errors.auth.weak"',() => {
    
    const service: AuthService = TestBed.get(AuthService);
    createUserWithEmailAndPasswordSpy.and.returnValue(Promise.reject({code:"auth/weak-password"}));
    service.register( email, password )
    .catch( (err :Error ) =>{
     
      expect(createUserWithEmailAndPasswordSpy). toHaveBeenCalledWith(email, password),
      expect(err.name).toEqual("errors.auth.weak");
    })

  })

  it('should fail with "errors.auth.unknown"',() => {
    
    const service: AuthService = TestBed.get(AuthService);
    createUserWithEmailAndPasswordSpy.and.returnValue(Promise.reject({code:"made it up"}));
    service.register( email, password )
    .catch( (err :Error ) =>{
     
      expect(createUserWithEmailAndPasswordSpy). toHaveBeenCalledWith(email, password),
      expect(err.name).toEqual("errors.auth.unknown");
    })

  })
 

});
