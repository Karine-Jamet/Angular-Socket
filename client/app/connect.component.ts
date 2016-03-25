import {Component} from 'angular2/core';
import {Headers, RequestOptions} from 'angular2/http';
import {HTTP_PROVIDERS}   from 'angular2/http';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {SocketService} from './socket.service';



@Component({
  selector: 'connect',
  template: `
  <div [ngClass]="{hide: isConnect}" class="mdl-card mdl-shadow--2dp through mdl-shadow--16dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">Connect to CloudUnit</h2>
    </div>
    <div class="mdl-card__media ">
        <img src="app/images/logo-cloudunit.png" width="220" height="auto" border="0" alt="" style="padding:20px;">
    </div>
    <div class="mdl-card__supporting-text">
        <input type="text" [(ngModel)]="name" name="nameC" placeholder="your name"/>
        <input type="password" [(ngModel)]="password" name="passwordC" placeholder="your password"/>
    </div>
    <div class="mdl-card__actions">
        <input type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" (click)="sendToConnect(name,password)"/>
    </div>
  </div>`,
  providers: [HTTP_PROVIDERS]

})
export class ConnectComponent {
  data: object;
  private _token: string;
  isConnect=false;
  isDisconnect=true;

  constructor(private _socketService: SocketService, private http: Http){}

  sendToConnect: function(username, password) {

    var headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    // this.http.post('http://192.168.2.13:9998/api/connection',
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
          this.isConnect=true;
          this.isDisconnect=false;
        },
        err => console.log(err),
        //() => console.log('On Completed')
      );

  }
