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
  readyForUpload = false;

  constructor(private ngxCsvParser: NgxCsvParser, private apiService: ApiService, private router: Router) { }

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  ngOnInit(): void {
  }

  fileChangeListener($event: any): void {
    const file = $event.target.files;
    this.parseCSV(file);
  }

  private parseCSV(csvFile): void {
    this.ngxCsvParser.parse(csvFile[0], {header: true, delimiter: ';'})
      .pipe().subscribe((result: Array<any>) => {
      this.keepLastSprint(result);
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });
  }

  private keepLastSprint(result: Array<any>): void {
    for (const workload of result) {
      const lastComma = workload.Sprint.lastIndexOf(',');
      if (lastComma > 0) {
        workload.Sprint = workload.Sprint.slice(lastComma + 2);
      }
    }
    this.makeReadyForUpload(result);
  }

  private makeReadyForUpload(result: Array<any>): void {
    this.csvRecords = result;
    this.readyForUpload = true;
  }

  async uploadWorkload(): Promise<void> {
    this.apiService.clearWorkload();
    this.csvRecords.forEach(workload => {
      this.apiService.newWorkload(workload.Assignee, workload.Sprint, workload['Story Points'], workload.Project)
        .subscribe();
    });
    await this.waitAMomentAndShowWorkload();
  }

  async waitAMomentAndShowWorkload(): Promise<void> {
    await this.delay(500);
    this.readyForUpload = false;
    await this.router.navigate(['occupancy']);
  }

  delay(ms: number): any {
    return new Promise( resolve => setTimeout(resolve, ms));
  }
}
