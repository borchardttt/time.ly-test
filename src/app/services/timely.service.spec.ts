import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TimelyService } from './timely.service';
import { environment } from 'src/environments/environment';

describe('TimelyService', () => {
  let service: TimelyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TimelyService],
    });
    service = TestBed.inject(TimelyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCalendarInfo', () => {
    it('should call the API with the correct headers and parameters', () => {
      const mockResponse = { id: '123', name: 'Test Calendar' };

      service.getCalendarInfo().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === '/api/calendars/info' &&
          request.params.get('url') === environment.calendarUrl
      );

      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('X-Api-Key')).toBe(environment.apiKey);

      req.flush(mockResponse);
    });
  });

  describe('getCalendarEvents', () => {
    it('should call the API with the correct calendar ID and headers', () => {
      const calendarId = '123';
      const mockResponse = [
        { id: 'event1', title: 'Event 1' },
        { id: 'event2', title: 'Event 2' },
      ];

      service.getCalendarEvents(calendarId).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`/api/calendars/${calendarId}/events`);

      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('X-Api-Key')).toBe(environment.apiKey);

      req.flush(mockResponse);
    });
  });
});
