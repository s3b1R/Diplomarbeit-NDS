import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Capacity} from '../models/capacity.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CapacityService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private httpService: HttpClient){
  }

  public getAllCapacities(): Observable<Capacity[]> {
    return this.httpService.get<Capacity[]>(`${this.baseUrl}capacity`).pipe(
      map(data => data.map(data => new Capacity().deserialize(data)))
    );
  }
}
