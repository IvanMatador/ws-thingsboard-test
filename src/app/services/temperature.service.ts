import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  private apiUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

  sendSingleValue(value: number, token: string): Observable<any> {
    const payload = { temperature: value };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}${token}/telemetry`, payload, { headers });
  }

}


