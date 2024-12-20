import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  /**
   * Filters the events based on the specified criteria.
   * @param events - An array of events to be filtered.
   * @param filters - An object containing the filter criteria.
   * @returns An array of events that match the filter criteria.
   */
  filterEvents(events: any[], filters: any): any[] {
    return events.filter((event) => {
      const matchesTitle = event.title
        .toLowerCase()
        .includes(filters.title.toLowerCase());
      const matchesStartDate = filters.startDate
        ? new Date(event.start_datetime).toISOString().substring(0, 10) ===
          filters.startDate
        : true;
      const matchesTicketType = filters.ticketType
        ? event.ticket_type === filters.ticketType
        : true;
      const matchesEventStatus = filters.eventStatus
        ? event.event_status === filters.eventStatus
        : true;
      const matchesAllDay = filters.allDay ? event.allday === true : true;

      return (
        matchesTitle &&
        matchesStartDate &&
        matchesTicketType &&
        matchesEventStatus &&
        matchesAllDay
      );
    });
  }
}
