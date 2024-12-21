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

  /**
   * Fetches calendar information.
   * @returns Observable containing calendar data.
   */

  getCalendarInfo(): Observable<any> {
    const headers = this.createHeaders();
    const params = { url: this.calendarUrl };

    return this.http.get<any>(`/api/calendars/info`, { headers, params });
  }

  /**
   * Fetches events for a specific calendar.
   * @param calendarId ID of the calendar.
   * @returns Observable containing calendar events.
   */
  getCalendarEvents(calendarId: string): Observable<any> {
    const headers = this.createHeaders();

    return this.http.get<any>(`/api/calendars/${calendarId}/events`, {
      headers,
    });
  }

  /**
   * Creates and returns the necessary headers for HTTP requests.
   * @returns An instance of HttpHeaders with the configured headers.
   */
  private createHeaders(): HttpHeaders {
    return new HttpHeaders().set('X-Api-Key', this.apiKey || '');
  }
}
