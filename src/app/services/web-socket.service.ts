import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket | null = null;
  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIiwidXNlcklkIjoiMmQ0OWM1NjAtNTZkYi0xMWVlLWIyYjctNDU4YzM3ZDA0ODg3Iiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJzZXNzaW9uSWQiOiIyNzYyM2NlOS03YzljLTQ2YzItYjdjMy1jZDJmODczZmVlY2EiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTY5NTI3NzMwMSwiZXhwIjoxNjk1Mjg2MzAxLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiMmQxZmNmMzAtNTZkYi0xMWVlLWIyYjctNDU4YzM3ZDA0ODg3IiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.93JYI4isjD2oAyOwijECNixPRjZZPDKI-3TfD8477tvhDgQQWWLk3l_LB7CjdrC8rHmVqmRcTeGPgJZtYNzXFw';

  constructor() {
    this.createWebSocket('90880340-577f-11ee-b677-a99877bb87e1');
  }

  createWebSocket(entityId: string) {
    console.log('Web Socket CREATING')
    if (!this.socket) {
      this.socket = new WebSocket(`ws://127.0.0.1:8080/api/ws/plugins/telemetry?token=${this.token}`);

      this.socket.onopen = () => {
        console.log('OPen connection')
        const object = {
          tsSubCmds: [
              {
                  entityType: "DEVICE",
                  entityId: "90880340-577f-11ee-b677-a99877bb87e1",
                  scope: "LATEST_TELEMETRY",
                  cmdId: 0
              }
          ]
      };
        const data = JSON.stringify(object);
        this.socket!.send(data);
        console.log("WebSocket: Message is sent:", data);
      };

      this.socket.onmessage = (event) => {
        const receivedMsg = event.data;
        console.log("WebSocket: Message is received:", receivedMsg);
      };

      this.socket.onclose = () => {
        console.log("WebSocket: Connection is closed!");
      };

      this.socket.onerror = (e) => {
        console.log("WebSocket: On ERROR!", e);
      }
    }
  }

  closeWebSocket() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  sendWebSocketData(data: any) {
    console.log('sendWebSocketData CALLED', data)
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
      console.log("WebSocket: Data is sent:", data);
    } else {
      console.error("WebSocket: Connection is not open. Data not sent.");
    }
  }
}
