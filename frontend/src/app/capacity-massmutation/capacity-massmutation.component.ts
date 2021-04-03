import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { eachDayOfInterval, format, isWeekend } from 'date-fns';
import { ApiService } from '../shared/services/api.service';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capacity-massmutation',
  templateUrl: './capacity-massmutation.component.html',
  styleUrls: ['./capacity-massmutation.component.css']
})
export class CapacityMassmutationComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  massInputValues = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
    user: new FormControl(),
    capa: new FormControl()
  });
  userList: User[];

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe(results => {
      this.userList = results;
      });
  }

  onFormSubmit(): void {
    const interval = this.getInterval();
    const forUser = this.massInputValues.value.user;
    const capaValue = this.massInputValues.value.capa.replace(/\n/g, '').replace(/\s+/g, '').replace(/,/, '.');

    for (const date of interval) {
      const dateFormatted = format(date, 'yyyy-MM-dd');

      if (this.isNotWeekend(date)){
        this.apiService.getCapacityForDateAndUserid(dateFormatted, forUser)
          .subscribe( capaArray => {
            if (capaArray.length > 0) {
              this.apiService.updateCapacity(capaArray[0].id, capaValue);
            } else {
              this.apiService.newCapacity(capaValue, dateFormatted, forUser).subscribe();
            }
          });
      }
    }
    this.waitAMoment();
  }

  private getInterval(): Date[] {
    return eachDayOfInterval({
      start: this.massInputValues.value.start,
      end: this.massInputValues.value.end
    });
  }

  isNotWeekend(day): boolean {
    return !isWeekend(day);
  }

  delay(ms: number): any {
    return new Promise( resolve => setTimeout(resolve, ms));
  }

  async waitAMoment(): Promise<void> {
    await this.delay(500);
    await this.router.navigate(['capaview']);
  }

}
