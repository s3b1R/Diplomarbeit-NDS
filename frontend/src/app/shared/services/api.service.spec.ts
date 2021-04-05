import { TestBed, getTestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { Capacity } from '../models/capacity.model';
import { Workload } from '../models/workload.model';

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

});
