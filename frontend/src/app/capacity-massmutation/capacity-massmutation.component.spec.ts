import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../shared/services/api.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';


import { CapacityMassmutationComponent } from './capacity-massmutation.component';
import {User} from '../shared/models/user.model';
import {Capacity} from '../shared/models/capacity.model';

describe('CapacityMassmutationComponent', () => {
  let component: CapacityMassmutationComponent;
  let fixture: ComponentFixture<CapacityMassmutationComponent>;
  let apiService: ApiService;
  const mockRouter = {navigate: jasmine.createSpy('navigate')};


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacityMassmutationComponent ], imports: [HttpClientTestingModule],
      providers: [ApiService, {provide: Router, useValue: mockRouter}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityMassmutationComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('ngOnInit() should call apiService', () => {
    spyOn(apiService, 'getAllUsers').and.returnValue(of([new User(), new User()]));
    component.ngOnInit();
    expect(apiService.getAllUsers).toHaveBeenCalledTimes(1);
    expect(component.userList.length).toBe(2);
  });

  it('onFormSubmit() should call getInterval() ', () => {
    component.massInputValues.patchValue({start: new Date(2021, 3, 1), end: new Date(2021, 3, 3), user: 1, capa: 0.8 });
    spyOn(component, 'getInterval').and.callThrough();
    component.onFormSubmit();
    expect(component.getInterval).toHaveBeenCalledTimes(1);
  });

  it('onFormSubmit() should call safeCapaInDB() for every date in range', () => {
    component.massInputValues.patchValue({start: new Date(2021, 3, 1), end: new Date(2021, 3, 3), user: 1, capa: 0.8 });
    spyOn(component, 'safeCapaInDB').and.stub();
    component.onFormSubmit();
    expect(component.safeCapaInDB).toHaveBeenCalledTimes(3);
  });

  it('onFormSubmit() should call safeCapaInDB() with correct values', () => {
    component.massInputValues.patchValue({start: new Date(2021, 3, 1), end: new Date(2021, 3, 1), user: 1, capa: ' 0 , 8' });
    spyOn(component, 'safeCapaInDB').and.stub();
    component.onFormSubmit();
    expect(component.safeCapaInDB).toHaveBeenCalledWith(new Date(2021, 3, 1), '2021-04-01', 1, '0.8');
  });

  it('onFormSubmit() should navigate to capaview after timeout', fakeAsync( () => {
    component.massInputValues.patchValue({start: new Date(2021, 3, 1), end: new Date(2021, 3, 3), user: 1, capa: 0.8 });
    component.onFormSubmit();
    tick(500);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['capaview']);
  }));

  it('safeCapaInDB() should create a new capacity', () => {
    spyOn(apiService, 'getCapacityForDateAndUserid').and.returnValue(of([]));
    spyOn(apiService, 'newCapacity').and.returnValue(of(new Capacity()));
    component.safeCapaInDB(new Date(2021, 3, 1), '2021-04-01', 1, '0.8');

    expect(apiService.getCapacityForDateAndUserid).toHaveBeenCalledTimes(1);
    expect(apiService.newCapacity).toHaveBeenCalledWith('0.8', '2021-04-01', 1);
  });

  it('safeCapaInDB() should update a capacity', () => {
    spyOn(apiService, 'getCapacityForDateAndUserid').and.returnValue(of([new Capacity().deserialize({id: 2, capa: 0.5, date: '2021-04-19', user: 1})]));
    spyOn(apiService, 'updateCapacity').and.stub();
    component.safeCapaInDB(new Date(2021, 3, 1), '2021-04-19', 1, 0.8);

    expect(apiService.getCapacityForDateAndUserid).toHaveBeenCalledTimes(1);
    expect(apiService.updateCapacity).toHaveBeenCalledWith(2, 0.8);
  });

  it('safeCapaInDB() should not update or create capa because of weekend', () => {
    spyOn(apiService, 'getCapacityForDateAndUserid').and.returnValue(of([new Capacity().deserialize({id: 2, capa: 0.5, date: '2021-04-19', user: 1})]));
    spyOn(apiService, 'updateCapacity').and.stub();
    spyOn(apiService, 'newCapacity').and.returnValue(of(new Capacity()));
    component.safeCapaInDB(new Date(2021, 3, 3), '2021-04-19', 1, 0.8);

    expect(apiService.getCapacityForDateAndUserid).not.toHaveBeenCalled();
    expect(apiService.updateCapacity).not.toHaveBeenCalled();
    expect(apiService.newCapacity).not.toHaveBeenCalled();
  });

  it('getIntervall() should return array of dates', () => {
    component.massInputValues.patchValue({start: new Date(2021, 3, 1), end: new Date(2021, 3, 3)});
    const result = component.getInterval();
    expect(result).toEqual([new Date(2021, 3, 1), new Date(2021, 3, 2), new Date(2021, 3, 3)]);
  });

  it('isNotWeekend() returns true on weekdays', () => {
    const result = component.isNotWeekend(new Date(2021, 3, 1));
    expect(result).toBeTrue();
  });

  it('isNotWeekend() returns false on weekends', () => {
    const result = component.isNotWeekend(new Date(2021, 3, 4));
    expect(result).toBeFalse();
  });

});
