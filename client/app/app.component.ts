import {Component,OnInit} from 'angular2/core';
import {SocketService} from './socket.service';

@Component({
    selector: 'my-app',
    template:`
  <h1>Truc</h1>
<input type="text" [(ngModel)]="check" name="name" placeholder="your name"/>
<input type="submit" (click)="sendToCheck(check)" />`,
providers: [SocketService]

})


export class AppComponent implements OnInit {
   constructor(private _socketService: SocketService){}
  // constructor(private _heroService: HeroService){}

  check: string;

  sendToCheck = function(e){

      this._socketService.sock.send(JSON.stringify({msg : e}));
    //envoyer en socket
  }
  ngOnInit() {
    this._socketService.connect();
    console.log('ngOnInit');
  }
}
