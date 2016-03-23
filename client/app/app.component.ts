import {Component,OnInit} from 'angular2/core';
import {SocketService} from './socket.service';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'my-app',
    template:`
      <h1>Truc</h1>
    <input type="text" [(ngModel)]="check" name="name" placeholder="your name"/>
    <input type="submit" (click)="sendToCheck(check)" />
    `,
    providers: [HTTP_PROVIDERS, SocketService]

})


export class AppComponent implements OnInit {
  constructor(private _socketService: SocketService, private http: Http){}
  // constructor(private _heroService: HeroService){}

  check: string;

  sendToCheck = function(e){
    //envoyer en socket
    this._socketService.sock.send(JSON.stringify({msg : e}));
  }
  ngOnInit() {
    this._socketService.connect();
    
    console.log('ngOnInit');
    this.getTest();
  }

 getTest() {
   this.http.get('http://127.0.0.1:9998/api/')
     .map((res: Response) => res.json())
      .subscribe(
      data => { console.log(data); },
        err => console.error(err),
        () => console.log('done')
      );
  }

}
