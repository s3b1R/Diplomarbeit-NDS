import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {eachDayOfInterval, format, isWeekend} from 'date-fns';
import {ApiService} from '../../shared/services/api.service';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-capacity-massmutation',
  templateUrl: './capacity-massmutation.component.html',
  styleUrls: ['./capacity-massmutation.component.css']
})
export class CapacityMassmutationComponent implements OnInit {

  massInputValues = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
    user: new FormControl(),
    capa: new FormControl()
  });
  userList: User[];
  entryStatus = 'ready';

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe(results => {
      this.userList = results;
    });
  }

  onFormSubmit(): void {
    const interval = this.getInterval();
    const forUser = this.massInputValues.value.user;
    const capaValue = this.massInputValues.value.capa.toString().replace(/\n/g, '').replace(/\s+/g, '').replace(/,/, '.');

    for (const date of interval) {
      const dateFormatted = format(date, 'yyyy-MM-dd');
      this.safeCapaInDB(date, dateFormatted, forUser, capaValue);
    }
    this.entryStatus = 'success';
    setTimeout(async () => {
      await this.router.navigate(['capaview']);
    }, 1500);
  }

  safeCapaInDB(date: Date, dateFormatted: string, forUser, capaValue): void {
    if (this.isNotWeekend(date)) {
      this.apiService.getCapacityForDateAndUserid(dateFormatted, forUser)
        .subscribe(capaArray => {
          if (capaArray.length > 0) {
            this.apiService.updateCapacity(capaArray[0].id, capaValue);
          } else {
            this.apiService.newCapacity(capaValue, dateFormatted, forUser).subscribe();
          }
        });
    }
  }

  getInterval(): Date[] {
    return eachDayOfInterval({
      start: this.massInputValues.value.start,
      end: this.massInputValues.value.end
    });
  }

  isNotWeekend(day): boolean {
    return !isWeekend(day);
  }

}
