import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class SocketService {

  constructor (private http: Http) {}

  sock: any;

  private _otherPerson : any;

  const private _urlSocket: string = 'http://127.0.0.1:9998/websocket';
  const private _urlApi: string = 'http://127.0.0.1:9998/api';
  private _isClose: boolean = false;
  private _headers: = new Headers({ 'Content-Type': 'application/json' });
  private _token: string;
  private _id: number;

  getTest() {
  return this.http.get(this._urlApi)
                    .map(res => res.json().data)
                     .catch(this.handleError);
  }

  public connect() {
    this.sock = new SockJS(this._urlSocket);

    this.sock.onopen = function() {
       console.log('open');
       this._isClose = true;
    };

    this.sock.onmessage = function(e) {
      console.log('message', e);
      /*if(e.data.type == "id") {
        this._otherPerson.push(e.data);
      }
      console.log(this._otherPerson);*/
    };

    this.sock.onclose = function() {
        console.log('close');
    };
  }

  public sendToConnect(username, password) : boolean {

    this.http.post(this._urlApi + '/connection',
      JSON.stringify({ username: username, password: password }),
      { headers: this._headers }
    )
      .map(res => res.json())
      .subscribe(
        data => { 
          this._token = data.token;
          console.log(this._token);
          this.sock.send(JSON.stringify({ token: this._token}));
        },
        err => { console.log(err); },
        //() => console.log('On Completed')
      );
    return true;
  }

  public sendToMe(msg) {
    let data = JSON.stringify({ msg: msg, to : this_id });
    this.sock.send(data);
  }

  public sendToOne(msg) {
    let data = JSON.stringify({ msg: msg, to : _otherPerson[0] });
    this.sock.send(JSON.stringify({ data: data }));
  }


  public sendToAll(msg) {
    let data = JSON.stringify({ msg: msg, to : _otherPerson });
    this.sock.send(JSON.stringify({ data: data }));
  }
}
