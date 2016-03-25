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
    
    <form (ngSubmit)="sendToMe()" #formToMe="ngForm" novalidate>
      <label>Ecrire a moi :</label>
      <input type="text" [(ngModel)]="msg1" ngControl="msg1Control" #msg1Control="ngForm" placeholder="My message" autofocus required/>
      <p [hidden]="msg1Control.valid">
        Message is required
      </p>
      <button type="submit" [disabled]="!formToMe.form.valid" >Send</button>
    </form>

    <form novalidate (ngSubmit)="sendToOne()" #formToOne="ngForm">
      <label>Ecrire a une personne :</label>
      <input type="text" [(ngModel)]="msg2" placeholder="My message" ngControl="msg2Control" #msg2Control="ngForm" required/>
      <p [hidden]="msg2Control.valid">
        Message is required
      </p>
      <button type="submit" [disabled]="!formToOne.form.valid" >Send</button>
    </form>
    

    <form (ngSubmit)="sendToAll()" #formToAll="ngForm" novalidate>
      <label>Ecrire a tout le monde :</label>
      <input type="text" [(ngModel)]="msg3" placeholder="My message" ngControl="msg3Control"  #msg3Control="ngForm" required/>
      <p [hidden]="msg3Control.valid">
          Message is required
      </p>
      <button type="submit" [disabled]="!formToAll.form.valid" >Send</button>
    </form>

    <h2>Message reçu</h2>
    <p *ngFor="#msgReceive of msgReceives;">
      {{msgReceive}}
    </p>
    `,
  providers: [HTTP_PROVIDERS, SocketService],
    directives: [ConnectComponent]
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
    this._socketService.sock.sendToAll(this.msg3);
  }

  ngOnInit() {
    this._socketService.connect();
  }

}
