import { TestBed } from '@angular/core/testing';
import { FilterService } from './filter.service';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('filterEvents', () => {
    const events = [
      {
        title: 'Meeting',
        start_datetime: '2024-12-01T10:00:00Z',
        ticket_type: 'paid',
        event_status: 'confirmed',
        allday: false,
      },
      {
        title: 'Conference',
        start_datetime: '2024-12-01T09:00:00Z',
        ticket_type: 'free',
        event_status: 'pending',
        allday: false,
      },
      {
        title: 'Webinar',
        start_datetime: '2024-12-01T10:00:00Z',
        ticket_type: 'paid',
        event_status: 'confirmed',
        allday: true,
      },
      {
        title: 'Workshop',
        start_datetime: '2024-12-02T10:00:00Z',
        ticket_type: 'free',
        event_status: 'confirmed',
        allday: false,
      },
    ];

    it('should filter by title', () => {
      const filters = {
        title: 'Meeting',
        startDate: '',
        ticketType: '',
        eventStatus: '',
        allDay: false,
      };
      const filteredEvents = service.filterEvents(events, filters);
      expect(filteredEvents.length).toBe(1);
      expect(filteredEvents[0].title).toBe('Meeting');
    });

    it('should filter by start date', () => {
      const filters = {
        title: '',
        startDate: '2024-12-01',
        ticketType: '',
        eventStatus: '',
        allDay: false,
      };
      const filteredEvents = service.filterEvents(events, filters);
      expect(filteredEvents.length).toBe(3);
    });

    it('should filter by ticket type', () => {
      const filters = {
        title: '',
        startDate: '',
        ticketType: 'paid',
        eventStatus: '',
        allDay: false,
      };
      const filteredEvents = service.filterEvents(events, filters);
      expect(filteredEvents.length).toBe(2);
    });

    it('should filter by event status', () => {
      const filters = {
        title: '',
        startDate: '',
        ticketType: '',
        eventStatus: 'confirmed',
        allDay: false,
      };
      const filteredEvents = service.filterEvents(events, filters);
      expect(filteredEvents.length).toBe(3);
    });

    it('should filter by all day', () => {
      const filters = {
        title: '',
        startDate: '',
        ticketType: '',
        eventStatus: '',
        allDay: true,
      };
      const filteredEvents = service.filterEvents(events, filters);
      expect(filteredEvents.length).toBe(1);
    });

    it('should return all events when no filters are applied', () => {
      const filters = {
        title: '',
        startDate: '',
        ticketType: '',
        eventStatus: '',
        allDay: false,
      };
      const filteredEvents = service.filterEvents(events, filters);
      expect(filteredEvents.length).toBe(4);
    });

    it('should return an empty array when no events match the filters', () => {
      const filters = {
        title: 'Nonexistent',
        startDate: '',
        ticketType: '',
        eventStatus: '',
        allDay: false,
      };
      const filteredEvents = service.filterEvents(events, filters);
      expect(filteredEvents.length).toBe(0);
    });
  });
});
