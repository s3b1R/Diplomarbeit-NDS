import { Component, OnInit } from '@angular/core';
import {eachDayOfInterval, lastDayOfMonth, startOfMonth, format} from 'date-fns';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ApiService} from '../services/api.service';
import { Capacity } from '../models/capacity.model';
import { User } from '../models/user.model';


@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.css']
})
export class CapacityComponent implements OnInit {

  constructor(private capacityService: ApiService) { }
  dayOutOfTable: any;
  interval: any = [];
  users: User[];
  capacity: Capacity[];
  capaView = new Map();

  ngOnInit(): void {
    this.updateInterval(new Date());
    this.getAllCapacities();
    this.getAllUsers();
  }

  getAllCapacities(): void {
   this.capacityService.getAllCapacities().subscribe(capacities => {
     this.capacity = capacities;
     this.createCapaView(this.capacity);
   });
  }

  getAllUsers(): void {
    this.capacityService.getAllUsers().subscribe( users => this.users = users);
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
    this.dayOutOfTable = format(dayOfMonth, 'yyyy-MM-dd');
    return this.dayOutOfTable === capaDate;
  }

  logCapacity(): void {
    console.log(this.capaView);
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
        this.capaView.set(currentEntry.user.name, userMap);
        userMap = new Map();
      }
    }


  }

}
