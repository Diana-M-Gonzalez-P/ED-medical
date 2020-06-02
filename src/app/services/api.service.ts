import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../model/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  userToken: string;

  urlPublic = 'http://localhost:3000/';
  private urlLogin = this.urlPublic + 'user';
  private urlServices = this.urlPublic + 'services';

  constructor( private http: HttpClient) {
  }

  getLogin( user: UserModel ) {
    return this.http.get(this.urlLogin)
    .pipe(
      map(resp => {
        // tslint:disable-next-line: no-string-literal
        this.saveToken( resp['token'] );
        return resp;
      })
    );
  }

  saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  readToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  logout() {
    localStorage.removeItem('token');
  }

  getServices(){
      return this.http.get(this.urlServices);
  }
}
