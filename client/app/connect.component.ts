import {Component} from 'angular2/core';
import {Headers, RequestOptions} from 'angular2/http';
import {HTTP_PROVIDERS}   from 'angular2/http';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'connect',
  template: `
<input type="text" [(ngModel)]="name" name="nameC" placeholder="your name"/>
<input type="password" [(ngModel)]="password" name="passwordC" placeholder="your password"/>
<input type="submit" (click)="sendToConnect(name,password)" />`,
  providers: [HTTP_PROVIDERS]

})


export class Connection {
  data: object;

  constructor(private http: Http){}

  sendToConnect: function(n, p) {

    var username = n;
    var password = p;
console.log(n+p);
    var creds ="username=" + username + "&password=" + password;

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });



    this.http.post('http://localhost:9998/api/connection', creds, {
      headers: headers
    })
      .map(res => res.json())
      .subscribe(
       data => console.log(data.token),
       err => console.log(err),
       //() => console.log('Authentication Complete')
      );

  }
