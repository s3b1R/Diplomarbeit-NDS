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
  header = true;

  constructor(private ngxCsvParser: NgxCsvParser, private apiService: ApiService, private router: Router) { }

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  ngOnInit(): void {
  }

  fileChangeListener($event: any): void {
    const files = $event.target.files;

    this.ngxCsvParser.parse(files[0], {header: this.header, delimiter: ';'})
      .pipe().subscribe((result: Array<any>) => {
      for (const workload of result){
        const lastComma = workload.Sprint.lastIndexOf(',');
        if (lastComma > 0){
          workload.Sprint = workload.Sprint.slice(lastComma + 2);
        }
      }
      this.csvRecords = result;

      this.apiService.clearWorkload();
      for (const workload of this.csvRecords) {
        this.apiService.newWorkload(workload.Assignee, workload.Sprint, workload['Story Points'], workload.Project)
          .subscribe();
      }
      this.waitAMoment();

    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });
  }

  private uploadWorkload(): void {
    this.apiService.clearWorkload();
    for (const workload of this.csvRecords) {
      this.apiService.newWorkload(workload.Assignee, workload.Sprint, workload['Story Points'], workload.Project)
        .subscribe();
    }
    this.waitAMoment();
  }

  delay(ms: number): any {
    return new Promise( resolve => setTimeout(resolve, ms));
  }

  async waitAMoment(): Promise<void> {
    await this.delay(500);
    await this.router.navigate(['occupancy']);
  }

}
