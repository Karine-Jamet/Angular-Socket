import {Component,OnInit} from 'angular2/core';
import {SocketService} from './services/socket/socket.service';
import {ConnectComponent} from './components/connect/connect.component';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'my-app',
<<<<<<< HEAD
  template:`
      <h1>Angular2 SockJS Cloud Unit</h1>
      <connect #connection ></connect>
      <div [ngClass]="{hide: connection.isDisconnect }" >
          <input type="text" [(ngModel)]="check" name="name" placeholder="your name"/>
          <input type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" (click)="sendToCheck(check)" />
    </div>
    `,
    providers: [HTTP_PROVIDERS, SocketService],
    directives: [ConnectComponent]
=======
  templateUrl: './app/app.component.html',
  providers: [HTTP_PROVIDERS, SocketService],
  directives: [ConnectComponent]
>>>>>>> connect
})


export class AppComponent implements OnInit {
  constructor(private _socketService: SocketService, private http: Http){}

  msg1: string;
  msg2: string;
  msg3: string;
  msgReceives: string[] = [];

  public sendToMe() {
    this._socketService.sendToMe(this.msg1);
  }

  public sendToOne() {
    //console.log("sendToOne");
    this._socketService.sendToOne(this.msg2);
  }

  public sendToAll() {
    this._socketService.sendToAll(this.msg3);
  }

  ngOnInit() {
    this._socketService.connect();
  }

}
