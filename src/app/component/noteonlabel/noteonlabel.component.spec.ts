import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteonlabelComponent } from './noteonlabel.component';

describe('NoteonlabelComponent', () => {
  let component: NoteonlabelComponent;
  let fixture: ComponentFixture<NoteonlabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteonlabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteonlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
