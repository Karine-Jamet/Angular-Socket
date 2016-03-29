import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class SocketService {

  constructor (private http: Http) {}

  sock: any;

  private _otherPerson = [];

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

  public connect() : void {
    this.sock = new SockJS(this._urlSocket);

    this.sock.onopen = function() {
       console.log('open');
       this._isClose = true;
    };

    this.sock.onmessage = (e) => {
      this.messageReceived(e);
    }

    this.sock.onclose = function() {
        console.log('close');
    };
  }
  public messageReceived(e) {
    if (JSON.parse(e.data).type == "id") {  
        this._otherPerson.push(JSON.parse(e.data).data);
        console.log(this._otherPerson);
    } else if (JSON.parse(e.data).type == "Myid") {
      console.log("MyID");
      this._id  = JSON.parse(e.data).data;
      console.log(this._id);
    } else if (JSON.parse(e.data).type == "message") {
      console.log(JSON.parse(e.data).data);
    }
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
    let data = JSON.stringify({ msg: msg, to : [ this._id ] });
    this.sock.send(JSON.stringify({ data: data }));
   }

   public sendToOne(msg) {
    //console.log("sendToOne service");
    let data = JSON.stringify({ msg: msg, to : [this._otherPerson[0]] });
    this.sock.send(JSON.stringify({ data: data }));
  }


  public sendToAll(msg) {
    let test = this._otherPerson;
    test.push(this._id);
      let data = JSON.stringify({ msg: msg, to : test });
    this.sock.send(JSON.stringify({ data: data }));
  }
}
