import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  toDay = new Date();
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
      toDay: [ {value: this.toDay, disabled: true}],
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

  save( form ) {
    this.appointment.toDay = this.formSchedule.get('toDay').value;
    this.appointment.specialty = this.formSchedule.get('specialty').value;
    this.appointment.doctor = this.formSchedule.get('doctor').value;
    this.appointment.program = this.formSchedule.get('dateProgram').value;

    console.log(this.appointment.toDay);

    if ( form.valid ) {
      this.api.postAppointment(this.appointment)
      .subscribe( resp => {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Su cita fue agendada con éxito'
          });
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se puedo agendar su cita fue agendada'
        });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe llenar todo el formulario'
      });
    }
  }

}
