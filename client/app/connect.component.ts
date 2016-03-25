import {Component} from 'angular2/core';
import {Headers, RequestOptions} from 'angular2/http';
import {HTTP_PROVIDERS}   from 'angular2/http';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {SocketService} from './socket.service';



@Component({
  selector: 'connect',
  template: `
  <input type="text" [(ngModel)]="name" name="nameC" placeholder="your name"/>
  <input type="password" [(ngModel)]="password" name="passwordC" placeholder="your password"/>
  <input type="submit" (click)="sendToConnect(name,password)" />`,
  providers: [HTTP_PROVIDERS]

})
export class ConnectComponent {
  data: object;
  private _token: string;

  constructor(private _socketService: SocketService, private http: Http){}

  sendToConnect: function(username, password) {

    var headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post('http://localhost:9998/api/connection',
      JSON.stringify({ username: username, password: password }),
      { headers: headers }
    )
      .map(res => res.json())
      .subscribe(
        data => { 
          this._token = data.token;
          console.log(this._token);
          this._socketService.sock.send(JSON.stringify({ token: this._token}));
        },
        err => console.log(err),
        //() => console.log('On Completed')
      );

  }
