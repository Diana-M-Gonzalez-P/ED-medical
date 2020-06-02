import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Session } from '../../class/session';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  session = new Session();

  constructor(
    private api: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.session.validateLogin(this.router);
  }

  goLogout(){
    this.api.logout();
    this.router.navigateByUrl('');
  }

}
