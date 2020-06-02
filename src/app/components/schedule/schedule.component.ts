import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Session } from '../../class/session';
import { AppointmentModel } from '../../model/appointment.model';
import { MyErrorStateMatcher } from 'src/app/class/error';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  name: string;
  dni: string;
  specialty: object;
  doctors: object;

  appointment = new AppointmentModel();
  session = new Session();
  formSchedule: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.session.validateLogin(this.router);
    this.getDoctors();
    this.getInfoUser();
    this.getMedicalGeneral();
    this.formSchedule = this.formBuilder.group({
      toDay: [ {value: new Date(), disabled: true}, [Validators.required]],
      specialty: ['', [Validators.required]],
      doctor: ['', [Validators.required]],
      dateProgram: ['', [Validators.required]]
    });
  }

  get formS() { return this.formSchedule.controls; }

  getInfoUser(){
    this.api.getUser()
    .subscribe( resp => {
      // tslint:disable-next-line: no-string-literal
      this.name = resp['name'] + ' ' + resp['last-name'];
      // tslint:disable-next-line: no-string-literal
      this.dni = resp['dni'];
    });
  }

  getMedicalGeneral(){
    this.api.getMedical()
    .subscribe( resp => {
      this.specialty = resp;
    });
  }

  getDoctors(){
    this.api.getDoctors()
    .subscribe( resp => {
      this.doctors = resp;
    });
  }

  save() {
    this.appointment.toDay = this.formSchedule.get('toDay').value;
    this.appointment.specialty = this.formSchedule.get('specialty').value;
    this.appointment.doctor = this.formSchedule.get('doctor').value;
    this.appointment.program = this.formSchedule.get('dateProgram').value;

    this.api.postAppointment(this.appointment)
    .subscribe( resp => {
        console.log(resp);
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Su cita fue agendada con éxito'
        });
        setTimeout(() => {
          this.formSchedule.reset();
        }, 3000);
    });
  }

}
