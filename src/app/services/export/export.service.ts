import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  exportToCSV(data: any[]): void {
    const csvContent = this.convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, 'events.csv');
  }

  exportToTXT(data: any[]): void {
    const txtContent = this.convertToTXT(data);
    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, 'events.txt');
  }

  exportToPDF(data: any[]): void {
    const doc = new jsPDF();
    doc.text('Events List', 14, 16);
    let y = 30;
    data.forEach((event) => {
      doc.text(`${event.title} - ${event.start_datetime}`, 14, y);
      y += 10;
    });
    doc.save('events.pdf');
  }

  private convertToCSV(data: any[]): string {
    const header = 'Title;Start Date;End Date;Description\n';
    const rows = data.map((event) =>
      [
        event.title,
        event.start_datetime,
        event.end_datetime,
        event.description_short,
      ]
        .map((item) => `"${item}"`)
        .join(';')
    );
    return header + rows.join('\n');
  }

  private convertToTXT(data: any[]): string {
    return data
      .map(
        (event) =>
          `${event.title} - ${event.start_datetime} - ${event.description_short}`
      )
      .join('\n');
  }

  private downloadFile(url: string, fileName: string): void {
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
