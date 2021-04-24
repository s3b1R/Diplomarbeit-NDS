import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../shared/services/api.service';
import { ComparisonComponent } from './comparison.component';
import { of } from 'rxjs';
import { Pi } from '../shared/models/pi.model';
import { User } from '../shared/models/user.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ComparisonComponent', () => {
  let component: ComparisonComponent;
  let fixture: ComponentFixture<ComparisonComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonComponent ], imports: [HttpClientTestingModule], providers: [ApiService],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should call apiService for Pi list', () => {
    spyOn(apiService, 'getPiData').and.returnValue(of([new Pi(), new Pi()]));
    spyOn(component, 'setPiToCompare').and.stub();
    component.ngOnInit();
    expect(apiService.getPiData).toHaveBeenCalledTimes(1);
    expect(component.piList.length).toBe(2);
  });

  it('ngOnInit() should call setPiToCompare()', () => {
    const mockedPI = new Pi().deserialize({
      id: 10,
      piShortname: 2106,
      piStart: '2021-04-01',
      piEnd: '2021-06-09',
      sprintCounts: 5,
      sprint1Start: '2021-04-01',
      sprint1End: '2021-04-13',
      sprint2Start: '2021-04-14',
      sprint2End: '2021-04-27',
      sprint3Start: '2021-04-28',
      sprint3End: '2021-05-11',
      sprint4Start: '2021-05-12',
      sprint4End: '2021-05-25',
      sprint5Start: '2021-05-26',
      sprint5End: '2021-06-09',
      sprint6Start: null,
      sprint6End: null
    });
    spyOn(apiService, 'getPiData').and.returnValue(of([mockedPI, new Pi()]));
    spyOn(component, 'setPiToCompare').and.stub();
    component.ngOnInit();
    expect(component.setPiToCompare).toHaveBeenCalledWith(mockedPI);
  });

  it('ngOnInit() should call apiService for user list', () => {
    spyOn(apiService, 'getAllUsers').and.returnValue(of([new User(), new User()]));
    component.ngOnInit();
    expect(apiService.getAllUsers).toHaveBeenCalledTimes(1);
    expect(component.userList.length).toBe(2);
  });

  it('setPiToCompare should set variables', () => {
    const mockedPI = new Pi().deserialize({
      id: 10,
      piShortname: 2106,
      piStart: '2021-04-01',
      piEnd: '2021-06-09',
      sprintCounts: 5,
      sprint1Start: '2021-04-01',
      sprint1End: '2021-04-13',
      sprint2Start: '2021-04-14',
      sprint2End: '2021-04-27',
      sprint3Start: '2021-04-28',
      sprint3End: '2021-05-11',
      sprint4Start: '2021-05-12',
      sprint4End: '2021-05-25',
      sprint5Start: '2021-05-26',
      sprint5End: '2021-06-09',
      sprint6Start: null,
      sprint6End: null
    });
    component.setPiToCompare(mockedPI);
    expect(component.shownPi).toBe(mockedPI);
    expect(component.sprints).toEqual([1, 2, 3, 4, 5]);
    expect(component.piName).toBe(2106);
  });

  it('setPiToCompare should call getSprintStartAndEndDates()', () => {
    const mockedPI = new Pi().deserialize({
      id: 10,
      piShortname: 2106,
      piStart: '2021-04-01',
      piEnd: '2021-06-09',
      sprintCounts: 5,
      sprint1Start: '2021-04-01',
      sprint1End: '2021-04-13',
      sprint2Start: '2021-04-14',
      sprint2End: '2021-04-27',
      sprint3Start: '2021-04-28',
      sprint3End: '2021-05-11',
      sprint4Start: '2021-05-12',
      sprint4End: '2021-05-25',
      sprint5Start: '2021-05-26',
      sprint5End: '2021-06-09',
      sprint6Start: null,
      sprint6End: null
    });
    spyOn(component, 'getSprintStartAndEndDates').and.stub();
    component.setPiToCompare(mockedPI);
    expect(component.getSprintStartAndEndDates).toHaveBeenCalledTimes(1);
  });

  it('getSprintStartAndEndDates() fills start and end date arrays', () => {
    const mockedPI = new Pi().deserialize({
      id: 10,
      piShortname: 2106,
      piStart: '2021-04-01',
      piEnd: '2021-06-09',
      sprintCounts: 5,
      sprint1Start: '2021-04-01',
      sprint1End: '2021-04-13',
      sprint2Start: '2021-04-14',
      sprint2End: '2021-04-27',
      sprint3Start: '2021-04-28',
      sprint3End: '2021-05-11',
      sprint4Start: '2021-05-12',
      sprint4End: '2021-05-25',
      sprint5Start: '2021-05-26',
      sprint5End: '2021-06-09',
      sprint6Start: null,
      sprint6End: null
    });
    component.getSprintStartAndEndDates(mockedPI);
    expect(component.sprintStarts).toEqual(['2021-04-01', '2021-04-14', '2021-04-28', '2021-05-12', '2021-05-26', null]);
    expect(component.sprintEnds.length).toBe(6);
  });

  it('changePi() should call setPiToCompare()', () => {
    const mockedPI = new Pi().deserialize({
      id: 10,
      piShortname: 2106,
      piStart: '2021-04-01',
      piEnd: '2021-06-09',
      sprintCounts: 5,
      sprint1Start: '2021-04-01',
      sprint1End: '2021-04-13',
      sprint2Start: '2021-04-14',
      sprint2End: '2021-04-27',
      sprint3Start: '2021-04-28',
      sprint3End: '2021-05-11',
      sprint4Start: '2021-05-12',
      sprint4End: '2021-05-25',
      sprint5Start: '2021-05-26',
      sprint5End: '2021-06-09',
      sprint6Start: null,
      sprint6End: null
    });
    spyOn(component, 'setPiToCompare').and.stub();
    component.changePi(mockedPI);
    expect(component.setPiToCompare).toHaveBeenCalledWith(mockedPI);
  });

});
