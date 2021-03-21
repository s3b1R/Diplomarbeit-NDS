import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Capacity} from '../models/capacity.model';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private httpService: HttpClient){
  }

  public getAllCapacities(): Observable<Capacity[]> {
    return this.httpService.get<Capacity[]>(`${this.baseUrl}capacity`).pipe(
      map(data => data.map(data => new Capacity().deserialize(data)))
    );
  }

  public getAllUsers(): Observable<User[]> {
    return this.httpService.get<User[]>(`${this.baseUrl}users`).pipe(
      map(data => data.map(data => new User().deserialize(data)))
    );
  }

  public updateCapacity(capaId: number, newValue: number): void {
    this.httpService.put(`${this.baseUrl}capacity/${capaId}/update`, {capa: newValue},
      {headers: {'Content-Type': 'application/json'}, observe: 'body', responseType: 'json'})
  .subscribe(response => console.log(response));
  }

  public newCapacity(capaValue: string, onDate: string, forUser: number): void {
    this.httpService.post(`${this.baseUrl}capacity/create`, {
      capa: capaValue,
      date: onDate,
      user: forUser
    }, {headers: {'Content-Type': 'application/json'}, observe: 'body', responseType: 'json'})
      .subscribe(response => console.log(response));
  }
}
