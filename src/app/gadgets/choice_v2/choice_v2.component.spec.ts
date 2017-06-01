/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Choice_v2Component } from './choice_v2.component';

describe('Choice_v2Component', () => {
  let component: Choice_v2Component;
  let fixture: ComponentFixture<Choice_v2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Choice_v2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Choice_v2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});