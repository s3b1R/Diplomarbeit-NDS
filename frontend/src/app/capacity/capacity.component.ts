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

  constructor(private capacityService: ApiService) { }
  interval: any = [];
  userList: User[];
  rawCapacity: Capacity[];
  rawCapacityPerUser = new Map();
  allCapacities: Capacity[];

  ngOnInit(): void {
    this.updateInterval(new Date());
    this.getCapacitiesAndUsers();
  }

  getCapacitiesAndUsers(): void {
    forkJoin([ this.capacityService.getAllUsers(),
      this.capacityService.getAllCapacities() ])
      .subscribe(results => {
        this.userList = results[0];
        this.rawCapacity = results[1];
        this.createCapaView(this.rawCapacity);
        this.allCapacities = this.fillCapa(this.rawCapacityPerUser, this.userList);
    });
  }

  dateChange(event: MatDatepickerInputEvent<any>): void {
    this.updateInterval(event.value);
  }

  updateInterval(date: Date): void{
    this.interval = eachDayOfInterval({
      start: startOfMonth(new Date(date)),
      end: lastDayOfMonth(new Date(date))
    });
  }

  checkDate(dayOfMonth: any, capaDate: any): boolean{
    const dayOutOfTable = format(dayOfMonth, 'yyyy-MM-dd');
    return dayOutOfTable === capaDate;
  }

  sayHello(capa): void {
    alert(capa.date + ' ' + capa.id);
  }

  createCapaView(givenCapa: Capacity[]): void {
    let userMap = new Map();

    for (let index = 0; index < givenCapa.length; index++){
      const currentEntry = givenCapa[index];
      const nextEntry = givenCapa[index + 1];

      if (nextEntry && currentEntry.user.id === nextEntry.user.id){
        const user = currentEntry.user.name;
        let userCapas = userMap.get(user);

        if (!userCapas){
          userCapas = [];
        }

        userCapas.push(currentEntry);
        userMap.set(user, userCapas);
      } else {
        const user = currentEntry.user.name;
        let userCapas = userMap.get(user);

        if (!userCapas){
          userCapas = [];
        }

        userCapas.push(currentEntry);
        userMap.set(user, userCapas);
        this.rawCapacityPerUser.set(currentEntry.user.name, userMap);
        userMap = new Map();
      }
    }
  }

  fillCapa(rawCapacityMap: Map<string, Map<string, Array<Capacity>>>, userList: User[]): Capacity[]{
    const userMap = new Map();
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

                allCapacities.push({id: 0, capa: '0', date: date, user: {id: userList[userIndex].id, name: userName} });

              }


            }
          }
          else {

            if (!capaForUserExists.includes(userName + date)){
              capaForUserExists.push(userName + date);
              allCapacities.push({id: 0, capa: '0', date: date, user: {id: userList[userIndex].id, name: userName} });
            }

          }
        }

      }

    }
    return allCapacities;
  }

}
