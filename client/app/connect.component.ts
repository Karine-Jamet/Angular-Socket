import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';


@Component({
    selector: 'connect',
    template:`
<input type="text" [(ngModel)]="check.name" name="name" placeholder="your name"/>
<input type="text" [(ngModel)]="check.password" name="password" placeholder="your password"/>
<input type="submit" (click)="sendToConnect(check)" />`,
providers: [SocketService]


})


export class Connection {
  data:array;

  sendToConnect : function(e){

    var username = e.data.name;
    var password = e.data.password;

var creds = "username=" + username + "&password=" + password;

var headers = new Headers();
headers.append('Content-Type', 'application/x-www-form-urlencoded');

this.http.post('http://localhost:3000/connection', creds, {
  headers: headers
  })
  .map(res => res.json())
  .subscribe(
    data => this.saveJwt(data.id_token),
    err => this.logError(err),
    () => console.log('Authentication Complete')
  );

}
