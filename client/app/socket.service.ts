import {Injectable} from 'angular2/core';


@Injectable()
export class SocketService {

  sock: any;
  url: string = 'http://127.0.0.1:9998/gggg';

  // sock.send('test');
  // sock.close();

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
