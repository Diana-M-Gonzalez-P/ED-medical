import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/class/error';
import { UserModel } from 'src/app/model/user.model';
import Swal from 'sweetalert2';
import { Session } from 'src/app/class/session';
import { Location } from '@angular/common';

@Component({
  selector: 'app-appointment-home',
  templateUrl: './appointment-home.component.html',
  styleUrls: ['./appointment-home.component.scss']
})
export class AppointmentHomeComponent implements OnInit {

  nameComplite: string;
  name: string;
  lastName: string;
  dni: string;
  email: string;
  direction: string;
  user = new UserModel();
  formHome: FormGroup;
  matcher = new MyErrorStateMatcher();
  session = new Session();

  constructor(
    private api: ApiService,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.session.validateLogin(this.router);
    this.getInfoUser();
    this.formHome = this.formBuilder.group({
      name: [{value: this.name, disabled: true}],
      lastname: [{value: this.name, disabled: true}],
      dni: [{value: this.name, disabled: true}],
      email: [{value: this.name, disabled: true}],
      adress: [{value: this.name, disabled: true}],
      symptoms: ['', [Validators.required]]
    });
  }

  get formH() { return this.formHome.controls; }

  goBack() {
    this.location.back();
  }

  getInfoUser(){
    this.api.getUser()
    .subscribe( resp => {
      // tslint:disable-next-line: no-string-literal
      this.nameComplite = resp['name'] + ' ' + resp['last-name'];
      // tslint:disable-next-line: no-string-literal
      this.name = resp['name'];
      this.lastName = resp['last-name'];
      // tslint:disable-next-line: no-string-literal
      this.dni = resp['dni'];
      // tslint:disable-next-line: no-string-literal
      this.email = resp['email'];
      // tslint:disable-next-line: no-string-literal
      this.direction = resp['direction'];
    });
  }

  save( form ) {
    this.user.name = this.formHome.get('name').value;
    this.user.lastName = this.formHome.get('lastname').value;
    this.user.dni = this.formHome.get('dni').value;
    this.user.email = this.formHome.get('email').value;
    this.user.direction = this.formHome.get('adress').value;
    this.user.health = this.formHome.get('symptoms').value;

    if (form.valid) {
      this.api.postDoctorHome(this.user)
      .subscribe( resp => {
        console.log(resp);
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Su cita fue agendada con éxito, pronto ira el medico a su casa'
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
