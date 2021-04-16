import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { Pi } from '../shared/models/pi.model';
import { ApiService } from '../shared/services/api.service';


@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {
  piList: Pi[];
  userList: User[];
  shownPi: Pi;
  sprints: number[];
  piName: number;
  sprintStarts = [];
  sprintEnds = [];


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getPiData().subscribe(result => {
      this.piList = result;
      this.shownPi = result[0];
      this.sprints = Array(this.shownPi.sprintCounts).fill(1).map((x, i) => i + 1);
      this.piName = this.shownPi.piShortname;
      this.getSprintStartandEndDates(this.shownPi);

    });

    this.apiService.getAllUsers().subscribe(result => {
      this.userList = result;
    });
  }

  getSprintCapa(userId: number, sprintStart: string, sprintEnd: string): number {
    let capa = 0;
    this.apiService.getCapacityForUserInSprint(userId, sprintStart, sprintEnd)
      .subscribe(data => capa = data);
    return capa;
  }

  getSprintWorkload(name: string, sprint: string): number {
    let workload = 0;
    this.apiService.getWorkloadForUserInSprint(name, sprint)
      .subscribe(data => workload = data);
    return workload;
  }

  getSprintStartandEndDates(pi): void {
    Object.keys(pi).map(key => {

      if (key.includes('sprint') && key.includes('Start')){
        this.sprintStarts.push(pi[key]);
      }
      if (key.includes('sprint') && key.includes('End')){
        this.sprintEnds.push(pi[key]);
      }
    });
  }





}
