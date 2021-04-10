import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pi } from '../shared/models/pi.model';
import { format, parse } from 'date-fns';
import { ApiService } from '../shared/services/api.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pi',
  templateUrl: './pi.component.html',
  styleUrls: ['./pi.component.css']
})
export class PiComponent implements OnInit {

  piList: Pi[];
  newPi = new FormGroup({
    shortName: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    sprintCounts: new FormControl()
  });
  piControl = new FormControl();
  caseControl = new FormControl();


  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadPiList();
  }

  submitNewPi(): void {
    this.apiService.newPi(
      this.newPi.value.shortName,
      format(this.newPi.value.startDate, 'yyyy-MM-dd'),
      format(this.newPi.value.endDate, 'yyyy-MM-dd'),
      this.newPi.value.sprintCounts).subscribe();
    this.newPi.reset();
    this.caseControl.reset();
    this.loadPiList();
  }

  updatePi(newPiShortName: string, newStartDate: string, newEndDate: string, newSprintCount: string): void {
    this.apiService.updatePi(
      this.piControl.value.id,
      newPiShortName,
      format(parse(newStartDate, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd'),
      format(parse(newEndDate, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd'),
      Number(newSprintCount)
    );
    this.piControl.reset();
    this.caseControl.reset();
    this.loadPiList();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `PI ${this.piControl.value.piShortname} löschen?`
    });

    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.deletePi();
      }
    });
  }

  deletePi(): void {
    this.apiService.deletePi(this.piControl.value.id);
    this.piControl.reset();
    this.caseControl.reset();
    this.loadPiList();
  }

  private loadPiList(): void {
    this.waitAMoment().then(() => {
      this.apiService.getPiData().subscribe(results => {
        this.piList = results;
      });
    });
  }

  async waitAMoment(): Promise<void> {
    await this.delay(500);
  }

  delay(ms: number): any {
    return new Promise( resolve => setTimeout(resolve, ms));
  }
}
