import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../services/api.service';
import { CapacityPipe } from './capacity-pipe';
import {Observable} from 'rxjs';

describe('CapacityPipe', () => {
  let pipe: CapacityPipe;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], providers: [CapacityPipe, { provide: ApiService }]
    });
  });

  beforeEach(inject([CapacityPipe], p => {
    pipe = p;
  }));


  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should retunr an observable', () => {

    expect(pipe.transform(1, 'start', 'end')).toBeInstanceOf(Observable);
  });
});
