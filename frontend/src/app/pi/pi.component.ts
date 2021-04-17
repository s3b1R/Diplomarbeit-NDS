import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  shortName = new FormControl();
  startDate = new FormControl();
  endDate = new FormControl();
  sprintCounts = new FormControl();
  sprint1Start = new FormControl(null);
  sprint1End = new FormControl(null);
  sprint2Start = new FormControl(null);
  sprint2End = new FormControl(null);
  sprint3Start = new FormControl(null);
  sprint3End = new FormControl(null);
  sprint4Start = new FormControl(null);
  sprint4End = new FormControl(null);
  sprint5Start = new FormControl(null);
  sprint5End = new FormControl(null);
  sprint6Start = new FormControl(null);
  sprint6End = new FormControl(null);
  piControl = new FormControl(null);
  caseControl = new FormControl('new');


  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadPiList();
  }

  submitNewPi(): void {
    this.formatNewSprintDates();
    this.apiService.newPi(
      this.shortName.value,
      format(this.startDate.value, 'yyyy-MM-dd'),
      format(this.endDate.value, 'yyyy-MM-dd'),
      this.sprintCounts.value,
      this.sprint1Start.value,
      this.sprint1End.value,
      this.sprint2Start.value,
      this.sprint2End.value,
      this.sprint3Start.value,
      this.sprint3End.value,
      this.sprint4Start.value,
      this.sprint4End.value,
      this.sprint5Start.value,
      this.sprint5End.value,
      this.sprint6Start.value,
      this.sprint6End.value).subscribe();
    this.caseControl.reset();
    this.controlFieldsReset();
    this.loadPiList();
  }

  updatePi(newPiShortName: string, newStartDate: string, newEndDate: string, newSprintCount: string,
           newSprint1Start, newSprint1End, newSprint2Start, newSprint2End, newSprint3Start, newSprint3End,
           newSprint4Start, newSprint4End, newSprint5Start, newSprint5End, newSprint6Start, newSprint6End): void {

    const sprintArray = [newSprint1Start, newSprint1End, newSprint2Start, newSprint2End, newSprint3Start, newSprint3End,
      newSprint4Start, newSprint4End, newSprint5Start, newSprint5End, newSprint6Start, newSprint6End];

    const formattedSprints = this.formatUpdatedSprints(sprintArray);

    console.log(sprintArray);
    console.log(formattedSprints);

    this.apiService.updatePi(
      this.piControl.value.id,
      newPiShortName,
      format(parse(newStartDate, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd'),
      format(parse(newEndDate, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd'),
      Number(newSprintCount),
      formattedSprints[0],
      formattedSprints[1],
      formattedSprints[2],
      formattedSprints[3],
      formattedSprints[4],
      formattedSprints[5],
      formattedSprints[6],
      formattedSprints[7],
      formattedSprints[8],
      formattedSprints[9],
      formattedSprints[10],
      formattedSprints[11]
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

  formatNewSprintDates(): void {
    if (this.sprint1Start.value != null){
      this.sprint1Start.setValue(format(this.sprint1Start.value, 'yyyy-MM-dd'));
      }
    if (this.sprint1End.value != null){
      this.sprint1End.setValue(format(this.sprint1End.value, 'yyyy-MM-dd'));
    }
    if (this.sprint2Start.value != null){
      this.sprint2Start.setValue(format(this.sprint2Start.value, 'yyyy-MM-dd'));
    }
    if (this.sprint2End.value != null){
      this.sprint2End.setValue(format(this.sprint2End.value, 'yyyy-MM-dd'));
    }
    if (this.sprint3Start.value != null){
      this.sprint3Start.setValue(format(this.sprint3Start.value, 'yyyy-MM-dd'));
    }
    if (this.sprint3End.value != null){
      this.sprint3End.setValue(format(this.sprint3End.value, 'yyyy-MM-dd'));
    }
    if (this.sprint4Start.value != null){
      this.sprint4Start.setValue(format(this.sprint4Start.value, 'yyyy-MM-dd'));
    }
    if (this.sprint4End.value != null){
      this.sprint4End.setValue(format(this.sprint4End.value, 'yyyy-MM-dd'));
    }
    if (this.sprint5Start.value != null){
      this.sprint5Start.setValue(format(this.sprint5Start.value, 'yyyy-MM-dd'));
    }
    if (this.sprint5End.value != null){
      this.sprint5End.setValue(format(this.sprint5End.value, 'yyyy-MM-dd'));
    }
    if (this.sprint6Start.value != null){
      this.sprint6Start.setValue(format(this.sprint6Start.value, 'yyyy-MM-dd'));
    }
    if (this.sprint6End.value != null){
      this.sprint6End.setValue(format(this.sprint6End.value, 'yyyy-MM-dd'));
    }
  }

  formatUpdatedSprints(sprintList: any[]): any[]{
    const tempArray = [];
    for (const sprint of sprintList){
      if (sprint === ''){
        tempArray.push(null);
      } else {
        tempArray.push(format(parse(sprint, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd'));
      }
    }
    return tempArray;
  }

  controlFieldsReset(): void {
    this.shortName.reset();
    this.startDate.reset();
    this.endDate.reset();
    this.sprintCounts.reset();
    this.sprint1Start.reset();
    this.sprint1End.reset();
    this.sprint2Start.reset();
    this.sprint2End.reset();
    this.sprint3Start.reset();
    this.sprint3End.reset();
    this.sprint4Start.reset();
    this.sprint4End.reset();
    this.sprint5Start.reset();
    this.sprint5End.reset();
    this.sprint6Start.reset();
    this.sprint6End.reset();
  }

}
