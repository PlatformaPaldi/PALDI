import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcoesMenuComponent } from './opcoes-menu.component';

describe('OpcoesMenuComponent', () => {
  let component: OpcoesMenuComponent;
  let fixture: ComponentFixture<OpcoesMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcoesMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcoesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
