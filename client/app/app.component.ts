import {Component,OnInit} from 'angular2/core';
import {SocketService} from './socket.service';
import {ConnectComponent} from './connect.component';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {Headers, RequestOptions} from 'angular2/http';

@Component({
  selector: 'my-app',
  template:`
    <h1>Angular2 SockJS Cloud Unit</h1>
    <connect></connect>
    
    <form novalidate>
      <label>Ecrire a moi :</label>
      <input type="text" [(ngModel)]="msg1" placeholder="My message"/>
      <input type="submit" (click)="sendToMe()" />
    </form>

    <form novalidate>
      <label>Ecrire a une personne :</label>
      <input type="text" [(ngModel)]="msg2" placeholder="My message"/>
      <input type="submit" (click)="sendToOne()" />
    </form>

    <form novalidate>
      <label>Ecrire a tout le monde :</label>
      <input type="text" [(ngModel)]="msg3" placeholder="My message"/>
      <input type="submit" (click)="sendToAll()" />
    </form>

    `,
    providers: [HTTP_PROVIDERS, SocketService],
    directives: [ConnectComponent]
})


export class AppComponent implements OnInit {
  constructor(private _socketService: SocketService, private http: Http){}

  msg1: string;
  msg2: string;
  msg3: string;

  public sendToMe() {
    this._socketService.sendToMe(this.msg1);
  }

  public sendToOne() {
    this._socketService.sendToOne(this.msg2);
  }

  public sendToAll() {
    this._socketService.sock.sendToAll(this.msg3);
  }

  ngOnInit() {
    this._socketService.connect();

    this._socketService.sock.onmessage = function(e) {
      console.log('OKKKKKKKKKK');
    };
  }

}
