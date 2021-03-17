import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Capacity} from '../models/capacity.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CapacityService {

  constructor(private httpService: HttpClient){
  }

  public getAllCapacities(): Observable<Capacity[]> {
    return this.httpService.get<Capacity[]>('http://localhost:3000/capacity').pipe(
      map(data => data.map(data => new Capacity().deserialize(data)))
    );
  }
}
