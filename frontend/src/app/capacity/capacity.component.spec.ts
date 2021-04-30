import {ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CapacityComponent} from './capacity.component';
import {DateFnsModule} from 'ngx-date-fns';
import {ApiService} from '../shared/services/api.service';
import {of} from 'rxjs';
import {User} from '../shared/models/user.model';
import {Capacity} from '../shared/models/capacity.model';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';


describe('CapacityComponent', () => {
  let component: CapacityComponent;
  let fixture: ComponentFixture<CapacityComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapacityComponent], imports: [HttpClientTestingModule, DateFnsModule], providers: [ApiService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('ngOnInit() should set isLoading true', () => {
    component.isLoading = false;
    component.ngOnInit();
    expect(component.isLoading).toBeTrue();
  });

  it('ngOnInit() should call setIntervall() with date of today', () => {
    spyOn(component, 'setInterval');
    component.ngOnInit();
    expect(component.setInterval).toHaveBeenCalledTimes(1);
  });

  it('ngOnInit() should call getCapacitiesAndUsers', () => {
    spyOn(component, 'getCapacitiesAndUsers');
    component.ngOnInit();
    expect(component.getCapacitiesAndUsers).toHaveBeenCalledTimes(1);
  });

  it('setInterval() should get an array for the month of given date', () => {
    const dateInJanuary = new Date(2021, 0, 8);
    component.setInterval(dateInJanuary);
    expect(component.intervalOfDates.length).toBe(31);
    expect(component.intervalOfDates[1]).toBeInstanceOf(Date);
  });

  it('getCapacitiesAndUsers() get all users from apiServices', fakeAsync(() => {
    spyOn(apiService, 'getAllUsers').and.returnValue(of([new User(), new User()]));
    component.ngOnInit();
    flushMicrotasks();
    expect(apiService.getAllUsers).toHaveBeenCalledTimes(1);
  }));

  it('getCapacitiesAndUsers() get workloads for a month from apiServices', fakeAsync(() => {
    spyOn(apiService, 'getCapacitiesForMonth').and.returnValue(of([new Capacity(), new Capacity()]));
    component.ngOnInit();
    flushMicrotasks();
    expect(apiService.getCapacitiesForMonth).toHaveBeenCalledTimes(1);
  }));

  it('getCapacitiesAndUsers() assign value to userList', () => {
    component.userList = [];
    spyOn(apiService, 'getAllUsers').and.returnValue(of([new User(), new User()]));
    spyOn(apiService, 'getCapacitiesForMonth').and.returnValue(of([new Capacity(), new Capacity()]));
    expect(component.userList.length).toBe(0);
    component.ngOnInit();
    expect(component.userList.length).toBe(2);
  });

  it('getCapacitiesAndUsers() should call mapDatabaseCapacitiesPerUser()', () => {
    const capacityArray = [new Capacity(), new Capacity()];
    spyOn(component, 'mapDatabaseCapacitiesPerUser').and.stub();
    spyOn(apiService, 'getAllUsers').and.returnValue(of([new User(), new User()]));
    spyOn(apiService, 'getCapacitiesForMonth').and.returnValue(of(capacityArray));
    component.ngOnInit();
    expect(component.mapDatabaseCapacitiesPerUser).toHaveBeenCalledWith(capacityArray);
  });

  it('getCapacitiesAndUsers() should call addEmptyCapaToDatesWithoutEntries()', fakeAsync(() => {
    spyOn(component, 'mapDatabaseCapacitiesPerUser').and.stub();
    spyOn(component, 'generateCapacityArrayToShow').and.stub();
    spyOn(apiService, 'getAllUsers').and.returnValue(of([new User(), new User()]));
    spyOn(apiService, 'getCapacitiesForMonth').and.returnValue(of([new Capacity(), new Capacity()]));
    component.ngOnInit();
    tick(500);
    expect(component.generateCapacityArrayToShow).toHaveBeenCalledTimes(1);
  }));

  it('mapDatabaseCapacitiesPerUser() should assign value to capacityPerUserFromDB', () => {
    const dummyCapacities = [new Capacity().deserialize({
      id: 1,
      capa: '0.8',
      date: '2021-04-12',
      user: {id: 1, name: 'Hans Muster'},
    }),
      new Capacity().deserialize({
        id: 2,
        capa: '0.8',
        date: '2021-04-13',
        user: {id: 1, name: 'Hans Muster'},
      }),
      new Capacity().deserialize({
        id: 3,
        capa: '1.0',
        date: '2021-04-13',
        user: {id: 3, name: 'Peter Lustig'},
      }),
      new Capacity().deserialize({
        id: 4,
        capa: '0.8',
        date: '2021-04-13',
        user: {id: 2, name: 'Hanna Muster'},
      })];
    expect(component.capacityMapFromDbPerUser.size).toBe(0);
    component.mapDatabaseCapacitiesPerUser(dummyCapacities);
    expect(component.capacityMapFromDbPerUser.size).toBe(3);
  });

  it('generateCapacityArrayToShow() should generate an array in length of given month', () => {
    const dummyCapacities = [new Capacity().deserialize({
      id: 1,
      capa: '0.8',
      date: '2021-04-01',
      user: {id: 1, name: 'Hans Muster'},
    }),
      new Capacity().deserialize({
        id: 2,
        capa: '0.8',
        date: '2021-04-30',
        user: {id: 1, name: 'Hans Muster'},
      })];
    component.userList = [new User().deserialize({id: 1, name: 'Hans Muster'})];
    component.setInterval(new Date(2021, 3, 1));
    component.mapDatabaseCapacitiesPerUser(dummyCapacities);
    let testArray = [];

    expect(testArray.length).toBe(0);
    testArray = component.generateCapacityArrayToShow();
    expect(testArray.length).toBe(30);
  });

  it('generateCapacityArrayToShow() should generate empty capacity for days without capacity', () => {
    const dummyCapacities = [new Capacity().deserialize({
      id: 1,
      capa: '0.8',
      date: '2021-04-01',
      user: {id: 1, name: 'Hans Muster'},
    }),
      new Capacity().deserialize({
        id: 2,
        capa: '0.8',
        date: '2021-04-30',
        user: {id: 1, name: 'Hans Muster'},
      })];
    component.userList = [new User().deserialize({id: 1, name: 'Hans Muster'})];
    component.setInterval(new Date(2021, 3, 1));
    component.mapDatabaseCapacitiesPerUser(dummyCapacities);
    let testArray = [];

    testArray = component.generateCapacityArrayToShow();
    expect(testArray[0]).toEqual(dummyCapacities[0]);
    expect(testArray[29]).toEqual(dummyCapacities[1]);
    expect(testArray[18]).toEqual(new Capacity().deserialize({
      id: 0,
      capa: '0',
      date: '2021-04-19',
      user: {id: 1, name: 'Hans Muster'},
    }));
  });

  it('generateCapacityArrayToShow() should generate empty capacity for user without capacity', () => {
    const dummyCapacities = [new Capacity().deserialize({
      id: 1,
      capa: '0.8',
      date: '2021-04-01',
      user: {id: 1, name: 'Hans Muster'},
    }),
      new Capacity().deserialize({
        id: 2,
        capa: '0.8',
        date: '2021-04-30',
        user: {id: 1, name: 'Hans Muster'},
      })];
    component.userList = [new User().deserialize({id: 2, name: 'Fritz Müller'})];
    component.setInterval(new Date(2021, 3, 1));
    component.mapDatabaseCapacitiesPerUser(dummyCapacities);
    let testArray = [];

    testArray = component.generateCapacityArrayToShow();
    expect(testArray.length).toBe(30);
    expect(testArray[0]).toEqual(new Capacity().deserialize({
      id: 0,
      capa: '0',
      date: '2021-04-01',
      user: {id: 2, name: 'Fritz Müller'},
    }));
    expect(testArray[29]).toEqual(new Capacity().deserialize({
      id: 0,
      capa: '0',
      date: '2021-04-30',
      user: {id: 2, name: 'Fritz Müller'},
    }));
    expect(testArray[18]).toEqual(new Capacity().deserialize({
      id: 0,
      capa: '0',
      date: '2021-04-19',
      user: {id: 2, name: 'Fritz Müller'},
    }));
  });

  it('generateCapacityArrayToShow() should generate empty capacities if no workload is given at all', () => {
    component.userList = [new User().deserialize({id: 2, name: 'Fritz Müller'})];
    component.setInterval(new Date(2021, 3, 1));
    component.capacityMapFromDbPerUser = new Map();

    let testArray = [];

    testArray = component.generateCapacityArrayToShow();
    expect(testArray.length).toBe(30);
    expect(testArray[0]).toEqual(new Capacity().deserialize({
      id: 0,
      capa: '0',
      date: '2021-04-01',
      user: {id: 2, name: 'Fritz Müller'},
    }));
    expect(testArray[29]).toEqual(new Capacity().deserialize({
      id: 0,
      capa: '0',
      date: '2021-04-30',
      user: {id: 2, name: 'Fritz Müller'},
    }));
    expect(testArray[18]).toEqual(new Capacity().deserialize({
      id: 0,
      capa: '0',
      date: '2021-04-19',
      user: {id: 2, name: 'Fritz Müller'},
    }));
  });

  it('generateCapacityArrayToShow() should set isLoading to false', () => {
    const dummyCapacities = [new Capacity().deserialize({
      id: 1,
      capa: '0.8',
      date: '2021-04-01',
      user: {id: 1, name: 'Hans Muster'},
    }),
      new Capacity().deserialize({
        id: 2,
        capa: '0.8',
        date: '2021-04-30',
        user: {id: 1, name: 'Hans Muster'},
      })];
    component.isLoading = true;
    component.userList = [new User().deserialize({id: 1, name: 'Hans Muster'})];
    component.setInterval(new Date(2021, 3, 1));
    component.mapDatabaseCapacitiesPerUser(dummyCapacities);

    expect(component.isLoading).toBeTrue();
    component.generateCapacityArrayToShow();
    expect(component.isLoading).toBeFalse();
  });

  it('onBlur() should call capaValueHasChanged()', () => {
    spyOn(component, 'capaValueHasChanged').and.stub();
    component.onBlur('0.1', new User(), new Capacity(), 1);
    expect(component.capaValueHasChanged).toHaveBeenCalledTimes(1);
  });

  it('onBlur() should call saveInputToDB() if capaValueHasChanged', () => {
    spyOn(component, 'capaValueHasChanged').and.returnValue(true);
    spyOn(component, 'saveInputToDB').and.stub();
    component.onBlur('0.1', new User(), new Capacity(), 1);
    expect(component.saveInputToDB).toHaveBeenCalledTimes(1);
  });

  it('onBlur() should do nothing if capaValueHasChanged is false', () => {
    spyOn(component, 'capaValueHasChanged').and.returnValue(false);
    spyOn(component, 'saveInputToDB').and.stub();
    component.onBlur('0.1', new User(), new Capacity(), 1);
    expect(component.saveInputToDB).not.toHaveBeenCalled();
  });

  it('onBlur() should change comma to period and remove newlines and whitespace from input before calling saveInputToDB', () => {
    spyOn(component, 'capaValueHasChanged').and.returnValue(true);
    spyOn(component, 'saveInputToDB').and.stub();
    component.onBlur('0 , 1 \n', new User(), new Capacity(), 1);
    expect(component.saveInputToDB).toHaveBeenCalledWith(new Capacity(), '0.1', new User(), 1);
  });

  it('capaValueHasChanged() should return false if cellText has not changed', () => {
    component.cellTextOnFocus = 0.8;
    expect(component.capaValueHasChanged(0.8)).toBeFalse();
  });

  it('capaValueHasChanged() should return true if cellText has changed', () => {
    component.cellTextOnFocus = 0.5;
    expect(component.capaValueHasChanged(0.8)).toBeTrue();
  });

  it('saveInputToDB() should call apiService updateCapacity() if workload has changed', () => {
    const mockedCapacity = new Capacity().deserialize({
      id: 2,
      capa: '0.8',
      date: '2021-04-30',
      user: {id: 1, name: 'Hans Muster'},
    });
    const mockedUser = new User().deserialize({id: 1, name: 'Hans Muster'});
    spyOn(apiService, 'updateCapacity').and.stub();

    component.saveInputToDB(mockedCapacity, 0.5, mockedUser, 1);
    expect(apiService.updateCapacity).toHaveBeenCalledWith(mockedCapacity.id, 0.5);
  });

  it('saveInputToDB() should call apiService newCapacity() if workload is new', () => {
    const mockedCapacity = new Capacity().deserialize({
      id: 0,
      capa: '0.8',
      date: '2021-04-30',
      user: {id: 1, name: 'Hans Muster'},
    });
    const mockedReturnedCapacity = new Capacity().deserialize({
      id: 44,
      capa: '0.8',
      date: '2021-04-30',
      user: {id: 1, name: 'Hans Muster'},
    });
    const mockedUser = new User().deserialize({id: 1, name: 'Hans Muster'});
    spyOn(apiService, 'newCapacity').and.returnValue(of(mockedReturnedCapacity));

    component.saveInputToDB(mockedCapacity, '0.5', mockedUser, 1);
    expect(apiService.newCapacity).toHaveBeenCalledWith('0.5', mockedCapacity.date, mockedUser.id);
  });

  it('saveInputToDB() should replace the capacity in capacitiesToShow id after create new capacity', fakeAsync(() => {
    const mockedCapacity = new Capacity().deserialize({
      id: 0,
      capa: '0.8',
      date: '2021-04-30',
      user: {id: 1, name: 'Hans Muster'},
    });
    const mockedNewCapacity = new Capacity().deserialize({
      id: 666,
      capa: '0.8',
      date: '2021-04-30',
      user: {id: 1, name: 'Hans Muster'},
    });
    const mockedUser = new User().deserialize({id: 1, name: 'Hans Muster'});
    component.capacitiesToShow = [new Capacity(), mockedCapacity];
    spyOn(apiService, 'newCapacity').and.returnValue(of(mockedNewCapacity));

    expect(component.capacitiesToShow[1].id).toBe(0);
    component.saveInputToDB(mockedCapacity, '0.5', mockedUser, 1);
    tick(100);
    expect(component.capacitiesToShow[1].id).toBe(666);
  }));

  it('compareDates() should return true if two dates are the same', () => {
    const date = new Date(2021, 3, 19);
    const capaDate = '2021-04-19';
    expect(component.compareDates(date, capaDate)).toBeTrue();
  });

  it('compareDates() should return false if two dates are different', () => {
    const date = new Date(2021, 3, 19);
    const capaDate = '2021-05-19';
    expect(component.compareDates(date, capaDate)).toBeFalse();
  });

  it('onFocus() should set variable cellTextOnFocus', () => {
    component.cellTextOnFocus = null;

    expect(component.cellTextOnFocus).toBe(null);
    component.onFocus(0.5);
    expect(component.cellTextOnFocus).toBe(0.5);
  });

  it('isNotWeekend() should return true if given day is not saturday or sunday', () => {
    expect(component.isNotWeekend(new Date(2021, 3, 1))).toBeTrue();
  });

  it('isNotWeekend() should return false if given day is not saturday or sunday', () => {
    expect(component.isNotWeekend(new Date(2021, 3, 4))).toBeFalse();
  });

});
