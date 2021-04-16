import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../services/api.service';
import { WorkloadPipe } from './workload-pipe';
import {Observable} from 'rxjs';



describe('WorkloadPipe', () => {
  let pipe: WorkloadPipe;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], providers: [WorkloadPipe, { provide: ApiService }]
    });
  });

  beforeEach(inject([WorkloadPipe], p => {
    pipe = p;
  }));

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an observable', () => {

    expect(pipe.transform('Hans Muster', 2106, 1)).toBeInstanceOf(Observable);
  });
});
