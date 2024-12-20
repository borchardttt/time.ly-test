import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimelyService {
  private readonly apiKey = environment.apiKey;
  private readonly calendarUrl = environment.calendarUrl;

  constructor(private http: HttpClient) {}

  getCalendarInfo(): Observable<any> {
    const headers = new HttpHeaders().set('X-Api-Key', this.apiKey || '');

    return this.http.get(`/api/calendars/info`, {
      headers,
      params: { url: this.calendarUrl },
    });
  }

  getCalendarEvents(calendarId: string): Observable<any> {
    const headers = new HttpHeaders().set('X-Api-Key', this.apiKey || '');

    return this.http.get(`/api/calendars/${calendarId}/events`, {
      headers,
    });
  }
}
