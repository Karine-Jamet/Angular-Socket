import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class SocketService {

  constructor (private http: Http) {}

  sock: any;
  // url: string = 'http://192.168.2.13:9998/gggg';

  url: string = 'http://127.0.0.1:9998/gggg';
  private _urlTest = 'http://127.0.0.1:9998/api/';  // URL to web api

  getTest () {
    return this.http.get(this._urlTest)
                    .map(res => res.json().data)
                     .catch(this.handleError);
  }

  public connect() {
    console.log("connect");
   this.sock = new SockJS(this.url);

    this.sock.onopen = function() {
       console.log('open');
      // this.send(JSON.stringify({msg : "hello"}));
    };
    this.sock.onmessage = function(e) {
        console.log('message', e.data);
    };
   this.sock.onclose = function() {
        console.log('close');
    };
  }



}
