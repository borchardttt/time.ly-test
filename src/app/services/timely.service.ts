import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimelyService {
  private readonly apiKey = environment.apiKey; // Sua chave da API
  private readonly calendarUrl = environment.calendarUrl; // URL do calendário
  private readonly baseApiUrl = '/api';

  constructor(private http: HttpClient) {
    console.log('API Key:', this.apiKey);
    console.log('Calendar URL:', this.calendarUrl);
    console.log('Base API URL:', this.baseApiUrl);
  }

  getCalendarInfo(): Observable<any> {
    const headers = new HttpHeaders().set('X-Api-Key', this.apiKey || '');

    return this.http.get(`${this.baseApiUrl}/calendars/info`, {
      headers,
      params: { url: this.calendarUrl },
    });
  }

  getCalendarEvents(calendarId: string): Observable<any> {
    const headers = new HttpHeaders().set('X-Api-Key', this.apiKey || '');

    return this.http.get(`${this.baseApiUrl}/calendars/${calendarId}/events`, {
      headers,
    });
  }
}
