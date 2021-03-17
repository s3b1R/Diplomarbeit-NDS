import { Component, OnInit } from '@angular/core';
import {eachDayOfInterval, lastDayOfMonth, startOfMonth, format} from 'date-fns';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {CapacityService} from '../services/capacity.service';
import { Capacity } from '../models/capacity.model';


@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.css']
})
export class CapacityComponent implements OnInit {

  constructor(private capacityService: CapacityService) { }
  dayOutOfTable: any;
  interval: any = [];
  users: any = [{id: 1, name: 'Hans Muster'}, {id: 2, name: 'Sebastian Rüegg'}, {id: 3, name: 'Peter Lustig'},
    {id: 4, name: 'Peter Müller'}, {id: 7, name: 'Greg Müller'}];
  capacity: Capacity[];

  ngOnInit(): void {
    this.updateInterval(new Date());
    this.getAllCapacities();
    console.log(this.capacity);
  }

  getAllCapacities(): void {
   this.capacityService.getAllCapacities().subscribe(capacities => this.capacity = capacities);
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


}
