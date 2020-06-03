import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UserModel } from '../../model/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/class/error';
import { Router } from '@angular/router';
import { Session } from '../../class/session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new UserModel();
  session = new Session();
  formLogin: FormGroup;
  matcher = new MyErrorStateMatcher();
  respond: string;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.session.validateLogin(this.router);
    this.formLogin = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9-]+')]],
      password: ['', [Validators.required]]
    });
  }

  get formL() { return this.formLogin.controls; }

  loginUser() {
    this.user.dni = this.formLogin.get('dni').value;
    this.user.password = this.formLogin.get('password').value;
    this.api.getLogin(this.user)
    .subscribe( resp => {
      // tslint:disable-next-line: no-string-literal
      if ( this.user.dni === resp['dni'] && this.user.password === resp['password']){
        this.router.navigate( ['/home'] );
      } else {
        this.respond = 'Cédula o clave incorrectas';
      }
    }, error => {
      this.respond = 'No se pudo iniciar sesión';
    });
  }
}
