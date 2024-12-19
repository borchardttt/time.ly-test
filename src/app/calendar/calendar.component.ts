import { Component, OnInit } from '@angular/core';
import { TimelyService } from '../services/timely.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  calendarInfo: any;
  calendarEvents: any;

  constructor(private timelyService: TimelyService) {}

  ngOnInit(): void {
    this.loadCalendarInfo();
  }

  // Carrega as informações do calendário
  loadCalendarInfo(): void {
    this.timelyService.getCalendarInfo().subscribe(
      (data) => {
        this.calendarInfo = data;
        console.log('Calendar Info:', this.calendarInfo);
        // Chame o método para carregar os eventos após obter as informações do calendário
        this.loadCalendarEvents(this.calendarInfo.data.id); // Supondo que o ID do calendário esteja disponível
      },
      (error) => {
        console.error('Error fetching calendar info:', error);
      }
    );
  }

  loadCalendarEvents(calendarId: string): void {
    this.timelyService.getCalendarEvents(calendarId).subscribe(
      (data) => {
        this.calendarEvents = data;
        console.log('Calendar Events:', this.calendarEvents);
      },
      (error) => {
        console.error('Error fetching calendar events:', error);
      }
    );
  }
}
