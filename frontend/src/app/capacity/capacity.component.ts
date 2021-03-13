import { Component, OnInit } from '@angular/core';
import {eachDayOfInterval, lastDayOfMonth, startOfMonth, format} from 'date-fns';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.css']
})
export class CapacityComponent implements OnInit {

  constructor() { }
  dayOutOfTable: any;
  interval: any = [];
  users: any = [{id: 1, name: 'Hans Muster'}, {id: 2, name: 'Sebastian Rüegg'}, {id: 3, name: 'Peter Lustig'},
    {id: 4, name: 'Peter Müller'}, {id: 7, name: 'Greg Müller'}];
  capacity: any = [
    {id: 1, capa: '0.8', date: '2021-03-14', user: {id: 1, name: 'Hans Muster'}},
    {id: 2, capa: '0.9', date: '2021-03-15', user: {id: 2, name: 'Sebastian Rüegg'}},
    {id: 3, capa: '1.0', date: '2021-03-16', user: {id: 2, name: 'Sebastian Rüegg'}},
    {id: 4, capa: '1.0', date: '2021-03-14', user: {id: 2, name: 'Peter Müller'}}
    ];

  ngOnInit(): void {
    this.updateInterval(new Date());
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
