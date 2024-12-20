import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  /**
   * Exports the provided data to a CSV file and triggers the download.
   * @param data - An array of event objects to be exported.
   */
  exportToCSV(data: any[]): void {
    const csvContent = this.convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, 'events.csv');
  }

  /**
   * Exports the provided data to a TXT file and triggers the download.
   * @param data - An array of event objects to be exported.
   */
  exportToTXT(data: any[]): void {
    const txtContent = this.convertToTXT(data);
    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, 'events.txt');
  }

  /**
   * Exports the provided data to a PDF file and triggers the download.
   * @param data - An array of event objects to be exported.
   */
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

  /**
   * Converts the provided data into a CSV-formatted string.
   * @param data - An array of event objects to be converted.
   * @returns A string in CSV format.
   */
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

  /**
   * Converts the provided data into a TXT-formatted string.
   * @param data - An array of event objects to be converted.
   * @returns A string in plain text format.
   */
  private convertToTXT(data: any[]): string {
    return data
      .map(
        (event) =>
          `${event.title} - ${event.start_datetime} - ${event.description_short}`
      )
      .join('\n');
  }

  /**
   * Triggers the download of a file by creating a temporary link element.
   * @param url - The URL object pointing to the file to be downloaded.
   * @param fileName - The desired name for the downloaded file.
   */
  private downloadFile(url: string, fileName: string): void {
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
