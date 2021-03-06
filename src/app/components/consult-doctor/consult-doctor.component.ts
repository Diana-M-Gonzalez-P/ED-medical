import { Component, OnInit, destroyPlatform } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorModel } from '../../model/doctor.model';
import { MyErrorStateMatcher } from 'src/app/class/error';
import { Session } from 'src/app/class/session';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-consult-doctor',
  templateUrl: './consult-doctor.component.html',
  styleUrls: ['./consult-doctor.component.scss']
})
export class ConsultDoctorComponent implements OnInit {

  name: string;
  dni: string;
  listSpec: any[];
  allInfo: object;
  listDoctor: any = [];
  doctor = new DoctorModel();
  formDoctor: FormGroup;
  matcher = new MyErrorStateMatcher();
  session = new Session();

  constructor(
    private api: ApiService,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.session.validateLogin(this.router);
    this.getInfoUser();
    this.listSpecialty();
    this.formDoctor = this.formBuilder.group({
      specialty: ['', [Validators.required]],
    });
  }

  get formD() { return this.formDoctor.controls; }

  goBack() {
    this.location.back();
  }

  getInfoUser(){
    this.api.getUser()
    .subscribe( resp => {
      // tslint:disable-next-line: no-string-literal
      this.name = resp['name'] + ' ' + resp['last-name'];
      // tslint:disable-next-line: no-string-literal
      this.dni = resp['dni'];
    });
  }

  listSpecialty() {
    this.api.getSpecialty()
    .subscribe( resp => {
      this.allInfo = resp;
      this.listSpec = this.getUnique(resp, 'specialty');
    });
  }

  getUnique(arr, comp) {
    const unique =
    arr.map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((e) => arr[e]).map(e => arr[e]);
    return unique;
  }

  searchDoctor( ){
    this.doctor.specialty = this.formDoctor.get('specialty').value;
    this.listDoctor = [ ];
    for (const key in this.allInfo) {
      if (this.allInfo.hasOwnProperty(key)) {
        const element = this.allInfo[key];
        if ( this.doctor.specialty === element.specialty) {
            this.listDoctor.push(element.name);
         }
      }
    }
  }
}
