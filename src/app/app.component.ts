import { Component, OnInit } from '@angular/core';
import { TemperatureService } from './services/temperature.service';
import { DevicesService } from './services/devices.service';
import { GeneratorService } from './services/generator.service';
import { SocketService } from './services/socket.service';
import { WebSocketService } from './services/web-socket.service';
import { Subscription } from 'rxjs';

export interface Device {
  name: string,
  token: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'tests';
  temperature: number = 25;
  devices: Device[] = [];
  currentDevice!: Device;
  interval: any;
  subscription!: Subscription | null;
  subscriptionId: number = 0;

  constructor(private temperatureService: TemperatureService,
              private devicesService: DevicesService,
              private socketService: SocketService,
              private webSocketService: WebSocketService,
              private genServic: GeneratorService) {}

  ngOnInit(): void {
    this.devices = this.devicesService.getDevices();
  }

  sendTemperature() {
    if(!this.currentDevice || !this.temperature) return;
    this.temperatureService.sendSingleValue(this.temperature,this.currentDevice.token).subscribe({
        next: (response) => {
            console.log('Дані було успішно відправлено:', response);
        },
        error: (error) => {
            console.error('Сталася помилка під час відправлення:', error);
        }
    });
  }

  setCurrentDevice(device: Device): void {
    this.currentDevice = device;
  }

  genNumAfterInterval() {
    console.log('genNumAfterInterval CALLED')
    // this.socketService.sendSingleValue(25);
    const randomNumber = this.genServic.generateRandomNumber();
    const data = {
      "subscriptionId": this.subscriptionId,
      "data": {
        "temperature": [
          [
            new Date().getTime(), JSON.stringify(randomNumber)
          ]
        ]
      },
      "latestValues": {
        "temperature": new Date().getTime()
      }
    };
    
    this.webSocketService.sendWebSocketData(data);
    if (!this.subscription) {
      // this.subscription = this.webSocketService.receiveData().subscribe();
    }
  }

  stopSocket() {
    this.webSocketService.closeWebSocket();
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
      this.subscriptionId = 0;
    }
  }

}
