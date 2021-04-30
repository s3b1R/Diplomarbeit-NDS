import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/user.model';
import {Pi} from '../shared/models/pi.model';
import {ApiService} from '../shared/services/api.service';


@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {
  piList: Pi[] = [];
  userList: User[] = [];
  shownPi: Pi;
  sprints: number[];
  piName: number;
  sprintStarts = [];
  sprintEnds = [];


  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getPiData().subscribe(result => {
      this.piList = result;
      this.setPiToCompare(result[0]);
    });

    this.apiService.getAllUsers().subscribe(result => {
      this.userList = result;
    });
  }

  setPiToCompare(result: Pi): void {
    if (result != null) {
      this.shownPi = result;
      this.sprints = Array(this.shownPi.sprintCounts).fill(1).map((x, i) => i + 1);
      this.piName = this.shownPi.piShortname;
      this.getSprintStartAndEndDates(this.shownPi);
    }
  }

  getSprintStartAndEndDates(pi): void {
    this.sprintStarts = [];
    this.sprintEnds = [];

    Object.keys(pi).forEach(key => {

      if (key.includes('sprint') && key.includes('Start')) {
        this.sprintStarts.push(pi[key]);
      }
      if (key.includes('sprint') && key.includes('End')) {
        this.sprintEnds.push(pi[key]);
      }
    });
  }

  changePi(selectedPi: Pi): void {
    this.setPiToCompare(selectedPi);
  }
}
