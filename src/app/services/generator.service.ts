import { Injectable } from '@angular/core';
import { TemperatureService } from './temperature.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor(private tempService: TemperatureService,
              private socketService: SocketService,) { }

  generateRandomNumber() {
    const min = 20;
    const max = 40;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log('NUM', randomNumber);
    return randomNumber;
  }

}
