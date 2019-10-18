import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratordialogboxComponent } from './collaboratordialogbox.component';

describe('CollaboratordialogboxComponent', () => {
  let component: CollaboratordialogboxComponent;
  let fixture: ComponentFixture<CollaboratordialogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratordialogboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratordialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
