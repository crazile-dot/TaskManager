import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  public headers: Headers = new Headers({
    'Content-Type': 'application/json'
  })

  constructor(private http: HttpClient) {
    //this.ROOT_URL = 'localhost:3000';
  }

  get(uri: string) {
    return this.http.get(uri, {'headers': {'Content-Type': 'application/json',}});
  }

  post(uri: string, payload: Object) {
    return this.http.post(uri, payload, {'headers': {'Content-Type': 'application/json',}});
  }

  put(uri: string, payload: Object) {
    return this.http.put(uri, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(uri, payload);
  }

  delete(uri: string) {
    return this.http.delete(uri);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users/login`, {
      email,
      password
    }, {
        observe: 'response'
      });
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users`, {
      email,
      password
    }, {
        observe: 'response'
      });
  }


}
