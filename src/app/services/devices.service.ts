import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor() { }

  getDevices() {
    return [
      {
        name: 'My termostat',
        token: 'cyBv6tkXi6rAEeu42MeE'
      },
      {
        name: 'My wow device',
        token: '66iatclrgb8snnoginmd'
      },
    ]
  }
}
