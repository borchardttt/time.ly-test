import { TestBed } from '@angular/core/testing';
import { ExportService } from './export.service';
import { jsPDF } from 'jspdf';

describe('ExportService', () => {
  let service: ExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('exportToCSV', () => {
    it('should convert data to CSV format and trigger download', () => {
      const mockData = [
        {
          title: 'Event 1',
          start_datetime: '2024-12-01',
          end_datetime: '2024-12-02',
          description_short: 'Description 1',
        },
      ];
      const spyDownload = spyOn<any>(service, 'downloadFile');

      service.exportToCSV(mockData);

      expect(spyDownload).toHaveBeenCalled();
      const csvContent = service['convertToCSV'](mockData);
      expect(csvContent).toContain('Title;Start Date;End Date;Description');
      expect(csvContent).toContain(
        '"Event 1";"2024-12-01";"2024-12-02";"Description 1"'
      );
    });
  });

  describe('exportToTXT', () => {
    it('should convert data to TXT format and trigger download', () => {
      const mockData = [
        {
          title: 'Event 1',
          start_datetime: '2024-12-01',
          end_datetime: '2024-12-02',
          description_short: 'Description 1',
        },
      ];
      const spyDownload = spyOn<any>(service, 'downloadFile');

      service.exportToTXT(mockData);

      expect(spyDownload).toHaveBeenCalled();
      const txtContent = service['convertToTXT'](mockData);
      expect(txtContent).toContain('Event 1 - 2024-12-01 - Description 1');
    });
  });

  describe('convertToCSV', () => {
    it('should correctly convert data to CSV format', () => {
      const mockData = [
        {
          title: 'Event 1',
          start_datetime: '2024-12-01',
          end_datetime: '2024-12-02',
          description_short: 'Description 1',
        },
      ];

      const csv = service['convertToCSV'](mockData);

      expect(csv).toContain('Title;Start Date;End Date;Description');
      expect(csv).toContain(
        '"Event 1";"2024-12-01";"2024-12-02";"Description 1"'
      );
    });
  });

  describe('convertToTXT', () => {
    it('should correctly convert data to TXT format', () => {
      const mockData = [
        {
          title: 'Event 1',
          start_datetime: '2024-12-01',
          end_datetime: '2024-12-02',
          description_short: 'Description 1',
        },
      ];

      const txt = service['convertToTXT'](mockData);

      expect(txt).toBe('Event 1 - 2024-12-01 - Description 1');
    });
  });

  describe('downloadFile', () => {
    it('should create a link and trigger a download', () => {
      const spyCreateElement = spyOn(
        document,
        'createElement'
      ).and.callThrough();
      const spyAppendChild = spyOn(
        document.body,
        'appendChild'
      ).and.callThrough();
      const spyRemoveChild = spyOn(
        document.body,
        'removeChild'
      ).and.callThrough();

      const url = 'blob:http://localhost/file';
      service['downloadFile'](url, 'test.csv');

      expect(spyCreateElement).toHaveBeenCalledWith('a');
      expect(spyAppendChild).toHaveBeenCalled();
      expect(spyRemoveChild).toHaveBeenCalled();
    });
  });
});
