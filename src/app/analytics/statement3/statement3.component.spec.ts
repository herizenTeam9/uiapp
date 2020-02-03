import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Statement3Component } from './statement3.component';

describe('Statement3Component', () => {
  let component: Statement3Component;
  let fixture: ComponentFixture<Statement3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Statement3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Statement3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
