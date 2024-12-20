/**
 * Interface representing the structure of an event.
 */
export interface ApiEvent {
  title: string;
  startDate: string;
  description: string;
  image?: string;
  ticketType: string;
  eventStatus: string;
  allDay: boolean;
}

/**
 * Interface representing the structure of calendar information.
 */
export interface CalendarInfo {
  id: string;
  name: string;
  title: string;
  description_short: string;
}

/**
 * Interface representing the structure of the calendar response.
 */
export interface CalendarResponse {
  data: CalendarInfo; // A propriedade `data` contém as informações do calendário
}
