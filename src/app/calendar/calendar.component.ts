/**
 * Component responsible for displaying and managing the calendar.
 */

import { Component, OnInit } from '@angular/core';
import { TimelyService } from '../services/timely.service';
import { ExportService } from '../services/export/export.service';
import { FilterService } from '../services/filter/filter.service';
import {
  ApiEvent,
  CalendarInfo,
  CalendarResponse,
} from '../models/calendar.model';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  calendarInfo!: CalendarInfo;
  calendarEvents: ApiEvent[] = [];
  filteredEvents: ApiEvent[] = [];
  searchTitle: string = '';
  searchStartDate: string = '';
  searchTicketType: string = '';
  searchEventStatus: string = '';
  currentPage: number = 1;
  eventsPerPage: number = 3;
  totalEvents: number = 0;
  isLoading: boolean = true;
  filterAllDay: boolean = false;

  constructor(
    private timelyService: TimelyService,
    private exportService: ExportService,
    private filterService: FilterService
  ) {}

  /**
   * Initializes the component and loads the calendar information.
   */
  ngOnInit(): void {
    this.loadCalendarInfo();
  }

  /**
   * Loads the calendar information.
   */
  loadCalendarInfo(): void {
    this.timelyService.getCalendarInfo().subscribe(
      (response: CalendarResponse) => {
        this.calendarInfo = response.data;
        this.loadCalendarEvents(this.calendarInfo.id);
      },
      (error) => {
        console.error('Error fetching calendar info:', error);
      }
    );
  }

  /**
   * Loads the calendar events based on the calendar ID.
   * @param calendarId - The ID of the calendar to load.
   */
  loadCalendarEvents(calendarId: string): void {
    this.timelyService.getCalendarEvents(calendarId).subscribe(
      (data: { data: { items: ApiEvent[] } }) => {
        this.calendarEvents = data.data.items;
        this.filteredEvents = [...this.calendarEvents];
        this.totalEvents = this.filteredEvents.length;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching calendar events:', error);
      }
    );
  }

  /**
   * Filters the events based on search criteria.
   */
  filterEvents(): void {
    const filters = {
      title: this.searchTitle,
      startDate: this.searchStartDate,
      ticketType: this.searchTicketType,
      eventStatus: this.searchEventStatus,
      allDay: this.filterAllDay,
    };
    this.filteredEvents = this.filterService.filterEvents(
      this.calendarEvents,
      filters
    );
    this.totalEvents = this.filteredEvents.length;
    this.currentPage = 1;
  }

  /**
   * Changes the current page.
   * @param page - The number of the new page.
   */
  changePage(page: number): void {
    this.currentPage = page;
  }

  /**
   * Gets the current events to be displayed on the page.
   * @returns List of events for the current page.
   */
  get currentEvents(): any[] {
    const startIndex = (this.currentPage - 1) * this.eventsPerPage;
    return this.filteredEvents.slice(
      startIndex,
      startIndex + this.eventsPerPage
    );
  }

  /**
   * Gets the total number of available pages.
   * @returns Total number of pages.
   */
  get totalPages(): number {
    return Math.ceil(this.totalEvents / this.eventsPerPage);
  }

  /*
  Handle the export type when user select a option.
  */

  handleExport(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const option = target.value;
    switch (option) {
      case 'csv':
        this.exportToCSV();
        break;
      case 'txt':
        this.exportToTXT();
        break;
      case 'pdf':
        this.exportToPDF();
        break;
      default:
        console.error('Invalid export option');
    }
  }
  /** Exports filtered events to CSV. */
  exportToCSV(): void {
    this.exportService.exportToCSV(this.filteredEvents);
  }

  /** Exports filtered events to TXT. */
  exportToTXT(): void {
    this.exportService.exportToTXT(this.filteredEvents);
  }

  /** Exports filtered events to PDF. */
  exportToPDF(): void {
    this.exportService.exportToPDF(this.filteredEvents);
  }
}
