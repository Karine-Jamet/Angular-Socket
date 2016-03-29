import {Component} from 'angular2/core';
import {Headers, RequestOptions} from 'angular2/http';
import {HTTP_PROVIDERS}   from 'angular2/http';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {SocketService} from '../../services/socket/socket.service';



@Component({
  selector: 'connect',
  styleUrls: ['./app/components/connect.component.css'],
  template: `
  <div class="mdl-card mdl-shadow--2dp through mdl-shadow--16dp">
  <div class="mdl-card__title">
    <h2 class="mdl-card__title-text">Connect to CloudUnit</h2>
  </div>
  <div class="mdl-card__media ">
      <img src="app/images/logo-cloudunit.png" width="220" height="auto" border="0" alt="" style="padding:20px;">
  </div>
  <div class="mdl-card__supporting-text">
      <input type="text"  name="nameC" placeholder="your name"/>
      <input type="password" name="passwordC" placeholder="your password"/>
  </div>
  <div class="mdl-card__actions">
      <input type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" (click)="sendToConnect(name,password)"/>
  </div>
</div>`,
  //templateUrl: './app/components/connect.component.html',
  providers: [HTTP_PROVIDERS]
})
export class ConnectComponent {
  name : string;
  password: string;
  private _isAuthenticated: boolean = false;
  _username: string = '';

  constructor(private _socketService: SocketService, private http: Http){}

  public authentication : void () {
    if(this._socketService.sendToConnect(this.name, this.password)) {
      this._username = this.name;
      this._isAuthenticated = true;
    }
  }
