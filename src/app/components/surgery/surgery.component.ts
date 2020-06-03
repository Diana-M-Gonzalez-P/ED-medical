import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/class/error';
import { SurgeryModel } from '../../model/surgery.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-surgery',
  templateUrl: './surgery.component.html',
  styleUrls: ['./surgery.component.scss']
})
export class SurgeryComponent implements OnInit {

  name: string;
  dni: string;
  surgery = new SurgeryModel();
  formSurgery: FormGroup;
  matcher = new MyErrorStateMatcher();
  arraySurgery: any = [ ];
  listCost: any = [ ];

  constructor(
    private api: ApiService,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getInfoUser();
    this.listSurgery();
    this.formSurgery = this.formBuilder.group({
      surgery: ['', [Validators.required]],
    });
  }

  get formSu() { return this.formSurgery.controls; }

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

  listSurgery() {
    this.api.getSurgery()
    .subscribe( resp => {
      this.arraySurgery = resp;
      console.log(this.arraySurgery);
    });
  }

  searchSurgery(){
    this.surgery.surgery = this.formSurgery.get('surgery').value;
    this.listCost = [ ];
    for (const key in this.arraySurgery) {
      if (this.arraySurgery.hasOwnProperty(key)) {
        const element = this.arraySurgery[key];
        if ( this.surgery.surgery === element.surgery) {
            this.listCost.push(element);
         }
      }
    }
  }
}
