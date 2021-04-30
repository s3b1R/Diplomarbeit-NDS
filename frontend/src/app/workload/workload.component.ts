import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {ApiService} from '../shared/services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-workload',
  templateUrl: './workload.component.html',
  styleUrls: ['./workload.component.css']
})
export class WorkloadComponent implements OnInit {

  csvRecords: any[] = [];
  readyForUpload = 'notReady';

  constructor(private ngxCsvParser: NgxCsvParser, private apiService: ApiService, private router: Router) { }

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  ngOnInit(): void {
  }

  fileChangeListener(event: any): void {
    const file = event.target?.files;
    this.parseCSV(file);
  }

  parseCSV(csvFile): void {
    this.ngxCsvParser.parse(csvFile[0], {header: true, delimiter: ';'})
      .pipe().subscribe((result: Array<any>) => {
      this.keepLastSprint(result);
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });
  }

  keepLastSprint(result: Array<any>): void {
    for (const workload of result) {
      const lastComma = workload.Sprint.lastIndexOf(',');
      if (lastComma > 0) {
        workload.Sprint = workload.Sprint.slice(lastComma + 2);
      }
    }
    this.makeReadyForUpload(result);
  }

  makeReadyForUpload(result: Array<any>): void {
    this.csvRecords = result;
    this.readyForUpload = 'ready';
  }

  uploadWorkload(): void {
    this.apiService.clearWorkload();
    this.sendDataToDatabase();
    this.readyForUpload = 'success';
    setTimeout(async () => {
      await this.router.navigate(['']);
    }, 1500);
  }

  sendDataToDatabase(): void {
    this.csvRecords.forEach(workload => {
      this.apiService.newWorkload(workload.Assignee, workload.Sprint, workload['Story Points'], workload.Project)
        .subscribe();
    });
  }
}
