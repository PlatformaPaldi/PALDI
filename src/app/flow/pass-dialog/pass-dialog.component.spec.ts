import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDialogComponent } from './pass-dialog.component';

describe('PassDialogComponent', () => {
  let component: PassDialogComponent;
  let fixture: ComponentFixture<PassDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
