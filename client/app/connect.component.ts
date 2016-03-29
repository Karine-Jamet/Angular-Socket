import {Component} from 'angular2/core';
import {Headers, RequestOptions} from 'angular2/http';
import {HTTP_PROVIDERS}   from 'angular2/http';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {SocketService} from '../../services/socket.service';



@Component({
  selector: 'connect',
  template: `
  <h2>Formulaire d'authentification</h2>
  <form *ngIf="!_isAuthenticated" novalidate>
    <input type="text" [(ngModel)]="name" placeholder="your name"/>
    <input type="password" [(ngModel)]="password" placeholder="your password"/>
    <input type="submit" (click)="authentication()" />
  </form>
  <p *ngIf="_isAuthenticated">
    Bienvenue, {{ _username }}
  </p>
  `,
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
