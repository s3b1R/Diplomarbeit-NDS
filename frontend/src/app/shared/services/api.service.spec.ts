import { TestBed, getTestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { Capacity } from '../models/capacity.model';
import { Workload } from '../models/workload.model';
import { Pi } from '../models/pi.model';

describe('ApiService', () => {
  let injector: TestBed;
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ HttpClientTestingModule], providers: [ApiService]});
    injector = getTestBed();
    service = injector.get(ApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new user', () => {
    const dummyUser = new User().deserialize({
      id: 1,
      name: 'Hans Muster',
    });

    service.newUser('Hans Muster').subscribe( user => {
      expect(user).toEqual(dummyUser);
      expect(user).toBeInstanceOf(User);
    });

    const newUserRequest = httpMock.expectOne(`${service.baseUrl}users/create`);
    expect(newUserRequest.request.method).toBe('POST');
    newUserRequest.flush(dummyUser);
  });

  it('should update an user', () => {
    expect((service.updateUser(88, 'Hans Musterli'))).toBeUndefined();

    const updateUserRequest = httpMock.expectOne(`${service.baseUrl}users/88/update`);
    expect(updateUserRequest.request.method).toBe('PUT');
  });

  it('should delete an user', () => {
    expect((service.deleteUser(88))).toBeUndefined();

    const deleteUserRequest = httpMock.expectOne(`${service.baseUrl}users/88/delete`);
    expect(deleteUserRequest.request.method).toBe('DELETE');
  });

  it('should get all users', () => {
    const dummyUsers = [ new User().deserialize(
      {id: 1, name: 'Hans Muster'}), new User().deserialize({id: 2, name: 'Peter Müller'})
    ];

    service.getAllUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const usersRequest = httpMock.expectOne(`${service.baseUrl}users`);
    expect(usersRequest.request.method).toBe('GET');
    usersRequest.flush(dummyUsers);
  });

  it('should get capacity for month', () => {
    const dummyCapacities = [new Capacity().deserialize({
      id: 1,
      capa: '0.8',
      date: '2021-04-12',
      user: { id: 1, name: 'Hans Muster' },
    }),
      new Capacity().deserialize({
        id: 2,
        capa: '0.8',
        date: '2021-04-13',
        user: { id: 2, name: 'Sebastian Rüegg' },
      }),
      new Capacity().deserialize({
        id: 3,
        capa: '1.0',
        date: '2021-04-13',
        user: { id: 3, name: 'Peter Lustig' },
      })];

    service.getCapacitiesForMonth('2021-04').subscribe(capa => {
      expect(capa.length).toBe(3);
      expect(capa).toEqual(dummyCapacities);
    });

    const capaRequest = httpMock.expectOne(`${service.baseUrl}capacity/month/2021-04`);
    expect(capaRequest.request.method).toBe('GET');
    capaRequest.flush(dummyCapacities);
  });

  it('should get capacity for date from a specific user', () => {
    const dummyCapacity = [new Capacity().deserialize({
      id: 2,
      capa: '0.8',
      date: '2021-04-13',
      user: { id: 1, name: 'Hans Muster' }
    })];

    service.getCapacityForDateAndUserid('2021-04-13', 1).subscribe(capa => {
      expect(capa.length).toBe(1);
    });

    const dayAndIdRequest = httpMock.expectOne(`${service.baseUrl}capacity/2021-04-13/1`);
    expect(dayAndIdRequest.request.method).toBe('GET');
    dayAndIdRequest.flush(dummyCapacity);
  });

  it('should update a capacity', () => {
    expect((service.updateCapacity(99, 1))).toBeUndefined();

    const updateRequest = httpMock.expectOne(`${service.baseUrl}capacity/99/update`);
    expect(updateRequest.request.method).toBe('PUT');
  });

  it('should create a new capacity', () => {
    const dummyCapacity = new Capacity().deserialize({
      id: 1,
      capa: '0.8',
      date: '2021-04-12',
      user: { id: 1, name: 'Hans Muster' },
    });

    service.newCapacity('0.8', '2021-04-12', 1).subscribe( capacity => {
      expect(capacity).toEqual(dummyCapacity);
      expect(capacity).toBeInstanceOf(Capacity);
    });

    const newCapacityRequest = httpMock.expectOne(`${service.baseUrl}capacity/create`);
    expect(newCapacityRequest.request.method).toBe('POST');
    newCapacityRequest.flush(dummyCapacity);
  });

  it('should create a new workload', () => {
    const dummyWorkload = new Workload().deserialize({
      id: 1,
      assignee: 'Hans Muster',
      sprint: 'dummySprint',
      storyPoints: 0.8,
      project: 'dummyProject',
    });

    service.newWorkload('Hans Muster', 'dummySprint', 0.8, 'dummyProject').subscribe( workload => {
      expect(workload).toEqual(dummyWorkload);
      expect(workload).toBeInstanceOf(Workload);
    });

    const newWorkloadRequest = httpMock.expectOne(`${service.baseUrl}workload/create`);
    expect(newWorkloadRequest.request.method).toBe('POST');
    newWorkloadRequest.flush(dummyWorkload);
  });

  it('should get all workloads', () => {
    const dummyWorkloads = [ new Workload().deserialize(
      {
        id: 1,
        assignee: 'Hans Muster',
        sprint: 'dummySprint',
        storyPoints: 0.8,
        project: 'dummyProject',
      }), new Workload().deserialize({
      id: 2,
      assignee: 'Hans Musterli',
      sprint: 'dummySprint',
      storyPoints: 0.5,
      project: 'dummyProject',
    })
    ];

    service.getWorkload().subscribe(workload => {
      expect(workload.length).toBe(2);
      expect(workload).toEqual(dummyWorkloads);
    });

    const workloadRequest = httpMock.expectOne(`${service.baseUrl}workload`);
    expect(workloadRequest.request.method).toBe('GET');
    workloadRequest.flush(dummyWorkloads);
  });

  it('should clear all workloads', () => {
    expect((service.clearWorkload())).toBeUndefined();

    const clearWorkloadRequest = httpMock.expectOne(`${service.baseUrl}workload/delete`);
    expect(clearWorkloadRequest.request.method).toBe('DELETE');
  });

  it('should create a new pi', () => {
    const dummyPi = new Pi().deserialize({
      id: 1,
      piShortname: '2106',
      piStart: '2021-04-01',
      pieEnd: '2021-06-09',
      sprintCounts: 5
    });

    service.newPi('2106', '2021-04-01', '2021-06-09', 5)
      .subscribe( pi => {
      expect(pi).toEqual(dummyPi);
      expect(pi).toBeInstanceOf(Pi);
    });

    const newPiRequest = httpMock.expectOne(`${service.baseUrl}pi/create`);
    expect(newPiRequest.request.method).toBe('POST');
    newPiRequest.flush(dummyPi);
  });

  it('should get all pi', () => {
    const dummyPis = [ new Pi().deserialize(
      {
        id: 1,
        piShortname: '2106',
        piStart: '2021-04-01',
        pieEnd: '2021-06-09',
        sprintCounts: 5
      }), new Pi().deserialize({
      id: 2,
      piShortname: '2103',
      piStart: '2021-01-13',
      pieEnd: '2021-03-30',
      sprintCounts: 5
    })
    ];

    service.getPiData().subscribe(pi => {
      expect(pi.length).toBe(2);
      expect(pi).toEqual(dummyPis);
    });

    const piRequest = httpMock.expectOne(`${service.baseUrl}pi`);
    expect(piRequest.request.method).toBe('GET');
    piRequest.flush(dummyPis);
  });

  it('should update a pi', () => {
    expect((service.updatePi(1, '2106', '2021-04-01', '2021-06-19', 6))).toBeUndefined();

    const updateRequest = httpMock.expectOne(`${service.baseUrl}pi/1/update`);
    expect(updateRequest.request.method).toBe('PUT');
  });

  it('should delete a pi', () => {
    expect((service.deletePi(1))).toBeUndefined();

    const deleteUserRequest = httpMock.expectOne(`${service.baseUrl}pi/1/delete`);
    expect(deleteUserRequest.request.method).toBe('DELETE');
  });

});
