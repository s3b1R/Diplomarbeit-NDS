import { TestBed, getTestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { Capacity } from '../models/capacity.model';

describe('CapacityService', () => {
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

  it('should get users', () => {
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

  it('should update capacity', () => {
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

});
