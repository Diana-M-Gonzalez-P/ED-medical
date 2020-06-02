import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultDoctorComponent } from './consult-doctor.component';

describe('ConsultDoctorComponent', () => {
  let component: ConsultDoctorComponent;
  let fixture: ComponentFixture<ConsultDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
