import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CalendarComponent } from './calendar.component';
import { TimelyService } from '../services/timely.service';
import { ExportService } from '../services/export/export.service';
import { FilterService } from '../services/filter/filter.service';
import { ApiEvent } from '../models/calendar.model';
describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let mockTimelyService: jasmine.SpyObj<TimelyService>;
  let mockExportService: jasmine.SpyObj<ExportService>;
  let mockFilterService: jasmine.SpyObj<FilterService>;

  beforeEach(() => {
    mockTimelyService = jasmine.createSpyObj('TimelyService', [
      'getCalendarInfo',
      'getCalendarEvents',
    ]);
    mockExportService = jasmine.createSpyObj('ExportService', [
      'exportToCSV',
      'exportToTXT',
      'exportToPDF',
    ]);
    mockFilterService = jasmine.createSpyObj('FilterService', ['filterEvents']);

    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [
        { provide: TimelyService, useValue: mockTimelyService },
        { provide: ExportService, useValue: mockExportService },
        { provide: FilterService, useValue: mockFilterService },
      ],
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call loadCalendarInfo on initialization', () => {
      spyOn(component, 'loadCalendarInfo');
      component.ngOnInit();
      expect(component.loadCalendarInfo).toHaveBeenCalled();
    });
  });

  describe('loadCalendarInfo', () => {
    it('should load calendar info and events successfully', () => {
      const mockCalendarInfo = {
        data: {
          id: 'test-calendar-id',
          name: 'Test Calendar',
          title: 'Test Title',
          description_short: 'This is a short description.',
        },
      };
      const mockCalendarEvents = {
        data: {
          items: [
            {
              title: 'Event 1',
              startDate: '2024-12-20T10:00:00Z',
              description: 'Description for Event 1',
              ticketType: 'Free',
              eventStatus: 'Upcoming',
              allDay: false,
            },
            {
              title: 'Event 2',
              startDate: '2024-12-21T12:00:00Z',
              description: 'Description for Event 2',
              ticketType: 'Paid',
              eventStatus: 'Upcoming',
              allDay: false,
            },
          ],
        },
      };

      mockTimelyService.getCalendarInfo.and.returnValue(of(mockCalendarInfo));
      mockTimelyService.getCalendarEvents.and.returnValue(
        of(mockCalendarEvents)
      );

      component.loadCalendarInfo();

      expect(mockTimelyService.getCalendarInfo).toHaveBeenCalled();
      expect(mockTimelyService.getCalendarEvents).toHaveBeenCalledWith(
        'test-calendar-id'
      );
      expect(component.calendarInfo).toEqual(mockCalendarInfo.data);
      expect(component.calendarEvents).toEqual(mockCalendarEvents.data.items);
      expect(component.filteredEvents).toEqual(mockCalendarEvents.data.items);
      expect(component.totalEvents).toBe(2);
      expect(component.isLoading).toBeFalse();
    });
  });

  describe('filterEvents', () => {
    it('should filter events based on search criteria', () => {
      const mockFilteredEvents: ApiEvent[] = [
        {
          title: 'Filtered Event',
          startDate: '2024-12-20T10:00:00Z',
          description: 'This is a filtered event description',
          ticketType: 'Free',
          eventStatus: 'Upcoming',
          allDay: false,
        },
      ];

      const filters = {
        title: component.searchTitle,
        startDate: component.searchStartDate,
        ticketType: component.searchTicketType,
        eventStatus: component.searchEventStatus,
        allDay: component.filterAllDay,
      };

      mockFilterService.filterEvents.and.returnValue(mockFilteredEvents);

      component.filterEvents();

      expect(mockFilterService.filterEvents).toHaveBeenCalledWith(
        component.calendarEvents,
        filters
      );
      expect(component.filteredEvents).toEqual(mockFilteredEvents);
      expect(component.totalEvents).toBe(1);
      expect(component.currentPage).toBe(1);
    });
  });

  describe('handleExport', () => {
    it('should export filtered events to CSV', () => {
      const event = { target: { value: 'csv' } } as any;
      component.handleExport(event);
      expect(mockExportService.exportToCSV).toHaveBeenCalledWith(
        component.filteredEvents
      );
    });

    it('should export filtered events to TXT', () => {
      const event = { target: { value: 'txt' } } as any;
      component.handleExport(event);
      expect(mockExportService.exportToTXT).toHaveBeenCalledWith(
        component.filteredEvents
      );
    });

    it('should export filtered events to PDF', () => {
      const event = { target: { value: 'pdf' } } as any;
      component.handleExport(event);
      expect(mockExportService.exportToPDF).toHaveBeenCalledWith(
        component.filteredEvents
      );
    });

    it('should log an error for invalid export option', () => {
      spyOn(console, 'error');
      const event = { target: { value: 'invalid' } } as any;
      component.handleExport(event);
      expect(console.error).toHaveBeenCalledWith('Invalid export option');
    });
  });
});
