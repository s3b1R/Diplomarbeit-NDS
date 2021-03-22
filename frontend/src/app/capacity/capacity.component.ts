import { Component, OnInit } from '@angular/core';
import {eachDayOfInterval, lastDayOfMonth, startOfMonth, format} from 'date-fns';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ApiService} from '../services/api.service';
import { Capacity } from '../models/capacity.model';
import { User } from '../models/user.model';
import {forkJoin} from 'rxjs';


@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.css']
})
export class CapacityComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  interval: any = [];
  userList: User[];
  capacityFromDatabase: Capacity[];
  capacityMapPerUserFromDatabase = new Map();
  capacitiesForView: Capacity[];
  loading = false;
  cellTextOnFocus: number;

  ngOnInit(): void {
    this.loading = true;
    this.setInterval(new Date());
    this.getCapacitiesAndUsers();
  }

  getCapacitiesAndUsers(): void {
    forkJoin([ this.apiService.getAllUsers(),
      this.apiService.getCapacitiesForMonth(format(this.interval[0], 'yyyy-MM')) ])
      .subscribe(results => {
        this.userList = results[0];
        this.capacityFromDatabase = results[1];
        this.mapDatabaseCapacitiesPerUser(this.capacityFromDatabase);
        this.capacitiesForView = this.addCapacityToDatesWithoutEntries(this.capacityMapPerUserFromDatabase, this.userList);
    });
  }

  dateChangeHandler(event: MatDatepickerInputEvent<any>): void {
    this.loading = true;
    this.setInterval(event.value);
    this.getCapacitiesAndUsers();
  }

  setInterval(date: Date): void{
    this.interval = eachDayOfInterval({
      start: startOfMonth(new Date(date)),
      end: lastDayOfMonth(new Date(date))
    });
  }

  compareDates(dayOfMonth: any, capaDate: any): boolean{
    const dayOutOfTable = format(dayOfMonth, 'yyyy-MM-dd');
    return dayOutOfTable === capaDate;
  }

  onFocus(cellText): void {
    this.cellTextOnFocus = cellText;
  }

  onBlur(cellText, user, capacity): void {
    if (this.capaValueHasChanged(cellText)) {
      if (capacity.id !== 0){
        console.log('send capa update');
        this.apiService.updateCapacity(capacity.id, cellText);
      } else {
        console.log('send new capa for ');
        this.apiService.newCapacity(cellText, capacity.date, user.id);
      }
    } else {
      console.log('do nothing');
    }
  }

  private capaValueHasChanged(cellText): boolean {
    return this.cellTextOnFocus !== cellText;
  }

  mapDatabaseCapacitiesPerUser(givenCapa: Capacity[]): void {
    let userMap = new Map();

    for (let index = 0; index < givenCapa.length; index++){
      const currentEntry = givenCapa[index];
      const nextEntry = givenCapa[index + 1];

      if (nextEntry && currentEntry.user.id === nextEntry.user.id){
        const userName = currentEntry.user.name;
        let userCapacities = userMap.get(userName);

        if (!userCapacities){
          userCapacities = [];
        }

        userCapacities.push(currentEntry);
        userMap.set(userName, userCapacities);
      } else {
        const userName = currentEntry.user.name;
        let userCapacities = userMap.get(userName);

        if (!userCapacities){
          userCapacities = [];
        }

        userCapacities.push(currentEntry);
        userMap.set(userName, userCapacities);
        this.capacityMapPerUserFromDatabase.set(currentEntry.user.name, userMap);
        userMap = new Map();
      }
    }
  }

  addCapacityToDatesWithoutEntries(rawCapacityMap: Map<string, Map<string, Array<Capacity>>>, userList: User[]): Capacity[]{
    const capaForUserExists = [];
    const allCapacities = [];

    for (let userIndex = 0; userIndex < userList.length; userIndex++){
      const userName = userList[userIndex].name;


      for (let intervalIndex = 0; intervalIndex < this.interval.length; intervalIndex++) {
        const date = format(this.interval[intervalIndex], 'yyyy-MM-dd');


        for (const [key, capacityMap] of rawCapacityMap.entries()){

          if (rawCapacityMap.has(userName)){
            if (key === userName){
              const capaArray = capacityMap.get(userName);
              const dateArray = [];
              capaArray.forEach( (capacity) => {
                dateArray.push(capacity.date);
              });
              if (dateArray.includes(date)){
              for (let capaIndex = 0; capaIndex < capaArray.length; capaIndex++){


                if (format(this.interval[intervalIndex], 'yyyy-MM-dd') === capaArray[capaIndex].date){

                  allCapacities.push(capaArray[capaIndex]);
                }
              }
              } else {
              allCapacities.push({id: 0, capa: '0', date, user: {id: userList[userIndex].id, name: userName} });
              }
            }
          } else {

            if (!capaForUserExists.includes(userName + date)){
              capaForUserExists.push(userName + date);
              allCapacities.push({id: 0, capa: '0', date, user: {id: userList[userIndex].id, name: userName} });
            }
          }
        }
      }
    }
    this.loading = false;
    return allCapacities;
  }
}
