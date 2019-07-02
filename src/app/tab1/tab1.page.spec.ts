import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab1Page } from './tab1.page';
import { Router } from '@angular/router';
import {Pipe, PipeTransform} from '@angular/core';

describe('Tab1Page', () => {

  class RouterStub {
  };

@Pipe({name: 'translate'})
class MockPipe implements PipeTransform {
    transform(value: string): string {
        //Do stuff here, if you want
        return value;
    }
}

  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tab1Page,
                      MockPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Router, useClass: RouterStub }

        
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
