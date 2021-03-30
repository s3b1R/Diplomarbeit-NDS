import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CapacityComponent } from './capacity.component';
import { DateFnsModule } from 'ngx-date-fns';
import { ApiService } from '../services/api.service';
import {Capacity} from '../models/capacity.model';
import { User } from '../models/user.model';

describe('CapacityComponent', () => {
  let component: CapacityComponent;
  let fixture: ComponentFixture<CapacityComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacityComponent ], imports: [HttpClientTestingModule, DateFnsModule], providers: [ ApiService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('interval should be a date array', () => {
    const date = new Date(2021, 0, 8, 8, 8, 8);

    component.setInterval(date);
    expect(component.intervalOfDates.length).toBe(31);
    expect(component.intervalOfDates[1]).toBeInstanceOf(Date);
  });
});
