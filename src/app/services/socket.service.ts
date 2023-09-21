import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket$!: WebSocketSubject<any>;
  // private readonly socketUrl = 'wss://demo.thingsboard.io/api/ws/plugins/telemetry?token='; // URL вашого  66iatclrgb8snnoginmd веб-сокет сервера
  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpcmF6bmF0b3Zza3lpQHRoaW5nc2JvYXJkLmlvIiwidXNlcklkIjoiOGYwMjY0MjAtNTdjMC0xMWVlLTg5ZjctMTdiZjUzZjY0M2Y0Iiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJzZXNzaW9uSWQiOiI2NTczZDgxZS05NjY2LTRhNjgtYWQzOS04NTJlMTg4YTlmN2MiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTY5NTIxOTcwNiwiZXhwIjoxNjk3MDE5NzA2LCJmaXJzdE5hbWUiOiJJdmFuIiwibGFzdE5hbWUiOiJSIiwiZW5hYmxlZCI6dHJ1ZSwicHJpdmFjeVBvbGljeUFjY2VwdGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiOGQ5MzkxZTAtNTdjMC0xMWVlLTg5ZjctMTdiZjUzZjY0M2Y0IiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.gbnSDf64yUA5XczpZ7r3mtOVlc-z57-8yiuzWpXFA1_an6FfTm45AY59LUM0cxuAZHm70fnURPkQ5WMmBTWpjg';

  constructor() {
    // this.createSocket(); // Створюємо сокет при ініціалізації сервісу
    // this.receiveData().subscribe(()=>console.log('SUBSCRIBED'))
  }

  createSocket() {
    // console.log('created socket')
    // this.socket$ = new WebSocketSubject({
    //   url: this.socketUrl + this.token,
    //   openObserver: {
    //     next: () => {
    //       this.onOpen();
    //     }
    //   },
    //   closeObserver: {
    //     next: (e: CloseEvent) => {
    //       this.onClose(e);
    //     }
    //   }
    // });
  }

  onOpen() {
    console.log('Connection opened')
  }

  onClose(e: any) {
    console.log('Connection closed', e)
  }

  // Метод для відправки даних через веб-сокет
  sendSingleValue(value: number) {
    if (!this.socket$ || this.socket$.closed) {
      this.createSocket();
    }
    const payload = {
      tsSubCmds: [
          {
              entityType: "DEVICE",
              entityId: 'b03bcaf0-57c0-11ee-89f7-17bf53f643f4',
              scope: "LATEST_TELEMETRY",
              cmdId: 0,
          }
      ],
    };
    console.log('New value', payload)
    this.socket$.next(value);
  }

  // Метод для прийому даних через веб-сокет
  receiveData() {
    if (!this.socket$) {
      return of(false)
    }
    return this.socket$.asObservable();
  }

  // Закриття з'єднання з веб-сокет сервером
  closeSocket() {
    console.log('Socket stopped')
    this.socket$.complete();
  }
}
