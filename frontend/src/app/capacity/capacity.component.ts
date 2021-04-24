import { Component, OnInit } from '@angular/core';
import { eachDayOfInterval, lastDayOfMonth, startOfMonth, format, isWeekend } from 'date-fns';
import {MatDatepicker } from '@angular/material/datepicker';
import { ApiService } from '../shared/services/api.service';
import { Capacity } from '../shared/models/capacity.model';
import { User } from '../shared/models/user.model';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.css']
})
export class CapacityComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  intervalOfDates: any = [];
  userList: User[] = [];
  capacityPerUserFromDB = new Map();
  capacitiesToShow: Capacity[];
  isLoading = false;
  cellTextOnFocus: number;

  ngOnInit(): void {
    this.isLoading = true;
    this.setInterval(new Date());
    this.getCapacitiesAndUsers();
  }

  setInterval(date: Date): void{
    this.intervalOfDates = eachDayOfInterval({
      start: startOfMonth(new Date(date)),
      end: lastDayOfMonth(new Date(date))
    });
  }

  getCapacitiesAndUsers(): void {
    let capacityFromDB: Capacity[] = [];
    forkJoin([ this.apiService.getAllUsers(),
      this.apiService.getCapacitiesForMonth(format(this.intervalOfDates[0], 'yyyy-MM')) ])
      .subscribe(results => {
        this.userList = results[0];
        capacityFromDB = results[1];
        this.mapDatabaseCapacitiesPerUser(capacityFromDB);
        this.capacitiesToShow = this.addEmptyCapaToDatesWithoutEntries(this.userList);
    });
  }

  mapDatabaseCapacitiesPerUser(capacityFromDB: Capacity[]): void {
    let userMap = new Map();
    let userCapacities = [];
    for (let index = 0; index < capacityFromDB.length; index++){
      const currentEntry = capacityFromDB[index];
      const nextEntry = capacityFromDB[index + 1];
      const userName = currentEntry.user.name;

      if (nextEntry && currentEntry.user.id === nextEntry.user.id){
        userCapacities.push(currentEntry);
      } else {
        userCapacities.push(currentEntry);
        userMap.set(userName, userCapacities);
        this.capacityPerUserFromDB.set(userName, userMap);
        userCapacities = [];
        userMap = new Map();
      }
    }
  }

  addEmptyCapaToDatesWithoutEntries(userList: User[]): Capacity[]{
    const capaForUserExists = [];
    const allCapacities = [];

    userList.forEach(user => {
      const userName = user.name;

      this.intervalOfDates.forEach(day => {
        const dayOfInterval = format(day, 'yyyy-MM-dd');
        this.buildCapacityArray(userName, dayOfInterval, day, allCapacities, user, capaForUserExists);
      });
    });
    this.isLoading = false;
    return allCapacities;
  }

  buildCapacityArray(
    userName: string,
    dayOfInterval: string,
    day,
    allCapacities: any[], user: User, capaForUserExists: any[]
  ): void {
    for (const [name, capacityMap] of this.capacityPerUserFromDB.entries()) {

      if (this.capacityPerUserFromDB.has(userName)) {
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

  persistInput(capacity, cellText, user, arrayIndex): void {
    if (capacity.id !== 0) {
      this.apiService.updateCapacity(capacity.id, cellText);
    } else {
      this.apiService.newCapacity(cellText, capacity.date, user.id)
        .subscribe(data => {
          this.capacitiesToShow[arrayIndex].id = data.id;
        });
    }
  }

  capaValueHasChanged(cellText): boolean {
    return this.cellTextOnFocus !== cellText;
  }

  selectMonthToShow(event: Date, datepicker: MatDatepicker<any>): void {
    this.isLoading = true;
    datepicker.close();
    this.setInterval(event);
    this.getCapacitiesAndUsers();
  }

  compareDates(dayOfMonth: any, capaDate: any): boolean{
    const dayOutOfTable = format(dayOfMonth, 'yyyy-MM-dd');
    return dayOutOfTable === capaDate;
  }

  onFocus(cellText): void {
    this.cellTextOnFocus = cellText;
  }

  isNotWeekend(day): boolean {
    return !isWeekend(day);
  }

}
