import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Session } from '../../class/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  services: any;
  session = new Session();

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.session.validateUser(this.router);
    this.listServices();
  }

  listServices(){
    this.api.getServices()
    .subscribe( resp => {
      this.services = resp;
      for (const key in resp) {
        if (resp.hasOwnProperty(key)) {
          const element = resp[key];
          switch (element.type) {
            case 'schedule':
              element.link = '/agendar';
              break;
            case 'doctor':
              element.link = '/consultar-especialista';
              break;
            case 'surgery':
              element.link = '/cirugia';
              break;
            case 'doctor-home':
              element.link = '/medico-en-casa';
              break;
            default:
              break;
          }
        }
      }
    });
  }
}
