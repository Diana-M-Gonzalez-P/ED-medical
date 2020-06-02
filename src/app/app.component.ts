import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  url = '/home';

  constructor(private router: Router) {
       router.events.subscribe((route) => {
       if (route instanceof NavigationEnd){
          this.url = route.url;
          if (this.url && this.url.length > 0){
            this.url = this.url.slice(1);
          }
       }
    });
  }
}
