import { Component, OnInit } from '@angular/core';
import { eachDayOfInterval, lastDayOfMonth, startOfMonth, format } from 'date-fns';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ApiService } from '../services/api.service';
import { Capacity } from '../models/capacity.model';
import { User } from '../models/user.model';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.css']
})
export class CapacityComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  intervalOfDates: any = [];
  userList: User[];
  capacityFromDB: Capacity[];
  capacityPerUserFromDB = new Map();
  capacitiesToShow: Capacity[];
  isLoading = false;
  cellTextOnFocus: number;

  ngOnInit(): void {
    this.isLoading = true;
    this.setInterval(new Date());
    this.getCapacitiesAndUsers();
  }

  getCapacitiesAndUsers(): void {
    forkJoin([ this.apiService.getAllUsers(),
      this.apiService.getCapacitiesForMonth(format(this.intervalOfDates[0], 'yyyy-MM')) ])
      .subscribe(results => {
        this.userList = results[0];
        this.capacityFromDB = results[1];
        this.mapDatabaseCapacitiesPerUser(this.capacityFromDB);
        this.capacitiesToShow = this.addEmptyCapaToDatesWithoutEntries(this.capacityPerUserFromDB, this.userList);
    });
  }

  setInterval(date: Date): void{
    this.intervalOfDates = eachDayOfInterval({
      start: startOfMonth(new Date(date)),
      end: lastDayOfMonth(new Date(date))
    });
  }

  private mapDatabaseCapacitiesPerUser(capacityFromDB: Capacity[]): void {
    let userMap = new Map();

    for (let index = 0; index < capacityFromDB.length; index++){
      const currentEntry = capacityFromDB[index];
      const nextEntry = capacityFromDB[index + 1];

      if (nextEntry && currentEntry.user.id === nextEntry.user.id){
        this.mapCapaToUser(currentEntry, userMap);
      } else {
        this.mapCapaToUser(currentEntry, userMap);
        this.capacityPerUserFromDB.set(currentEntry.user.name, userMap);
        userMap = new Map();
      }
    }
  }

  private mapCapaToUser(currentEntry: Capacity, userMap: Map<any, any>): void {
    const userName = currentEntry.user.name;
    let userCapacities = userMap.get(userName);

    if (!userCapacities) {
      userCapacities = [];
    }
    userCapacities.push(currentEntry);
    userMap.set(userName, userCapacities);
  }

  private addEmptyCapaToDatesWithoutEntries(rawCapacityMap: Map<string, Map<string, Array<Capacity>>>, userList: User[]): Capacity[]{
    const capaForUserExists = [];
    const allCapacities = [];

    userList.forEach(user => {
      const userName = user.name;

      this.intervalOfDates.forEach(day => {
        const dayOfInterval = format(day, 'yyyy-MM-dd');
        this.buildCapacityArray(rawCapacityMap, userName, dayOfInterval, day, allCapacities, user, capaForUserExists);
      });
    });
    this.isLoading = false;
    return allCapacities;
  }

  private buildCapacityArray(
    rawCapacityMap: Map<string, Map<string, Array<Capacity>>>,
    userName: string,
    dayOfInterval: string,
    day,
    allCapacities: any[], user: User, capaForUserExists: any[]
  ): void {
    for (const [name, capacityMap] of rawCapacityMap.entries()) {

      if (rawCapacityMap.has(userName)) {
        if (name === userName) {
          const capaArray = capacityMap.get(userName);
          const dateArray = [];
          capaArray.forEach((singleCapacity) => {
            dateArray.push(singleCapacity.date);
          });
          if (dateArray.includes(dayOfInterval)) {
            for (const capa of capaArray) {

              if (format(day, 'yyyy-MM-dd') === capa.date) {

                allCapacities.push(capa);
              }
            }
          } else {
            allCapacities.push({id: 0, capa: '0', date: dayOfInterval, user: {id: user.id, name: userName}});
          }
        }
      } else {

        if (!capaForUserExists.includes(userName + dayOfInterval)) {
          capaForUserExists.push(userName + dayOfInterval);
          allCapacities.push({id: 0, capa: '0', date: dayOfInterval, user: {id: user.id, name: userName}});
        }
      }
    }
  }

  onBlur(cellText, user, capacity, arrayIndex): void {
    if (this.capaValueHasChanged(cellText)) {
      const capaValue = cellText.replace(/\n/g, '').replace(/\s+/g, '').replace(/,/, '.');
      this.persistInput(capacity, capaValue, user, arrayIndex);
    }
  }

  private persistInput(capacity, cellText, user, arrayIndex): void {
    if (capacity.id !== 0) {
      this.apiService.updateCapacity(capacity.id, cellText);
    } else {
      this.apiService.newCapacity(cellText, capacity.date, user.id)
        .subscribe(data => {
          this.capacitiesToShow[arrayIndex].id = data.id;
        });
    }
  }

  private capaValueHasChanged(cellText): boolean {
    return this.cellTextOnFocus !== cellText;
  }

  dateChangeHandler(event: MatDatepickerInputEvent<any>): void {
    this.isLoading = true;
    this.setInterval(event.value);
    this.getCapacitiesAndUsers();
  }

  compareDates(dayOfMonth: any, capaDate: any): boolean{
    const dayOutOfTable = format(dayOfMonth, 'yyyy-MM-dd');
    return dayOutOfTable === capaDate;
  }

  onFocus(cellText): void {
    this.cellTextOnFocus = cellText;
  }
}
