import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Capacity} from '../models/capacity.model';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { Workload } from '../models/workload.model';
import { Pi } from '../models/pi.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly baseUrl = 'http://localhost:3000/';

  constructor(private httpService: HttpClient){
  }

  public getAllUsers(): Observable<User[]> {
    return this.httpService.get<User[]>(`${this.baseUrl}users`).pipe(
      map(data => data.map(data => new User().deserialize(data)))
    );
  }

  public newUser(userName: string): Observable<User> {
    return this.httpService.post(`${this.baseUrl}users/create`, {name: userName},
      {headers: {'Content-Type': 'application/json'}, observe: 'body', responseType: 'json'})
      .pipe(map(data => new User().deserialize(data)));
  }

  public updateUser(userId: number, userName: string): void {
    this.httpService.put(`${this.baseUrl}users/${userId}/update`, {name: userName},
      {headers: {'Content-Type': 'application/json'}, observe: 'body', responseType: 'json'}).subscribe();
  }

  public deleteUser(userId: number): void {
    this.httpService.delete(`${this.baseUrl}users/${userId}/delete`).subscribe();
  }

  public getCapacitiesForMonth(month: string): Observable<Capacity[]> {
    return this.httpService.get<Capacity[]>(`${this.baseUrl}capacity/month/${month}`)
      .pipe(map(data => data.map(data => new Capacity().deserialize(data))));
  }

  public getCapacityForDateAndUserid(date: string, id: number): Observable<Capacity[]>{
    return this.httpService.get<Capacity[]>(`${this.baseUrl}capacity/${date}/${id}`)
      .pipe(map(data => data.map(data => new Capacity().deserialize(data))));
  }

  public updateCapacity(capaId: number, newValue: number): void {
    this.httpService.put(`${this.baseUrl}capacity/${capaId}/update`, {capa: newValue},
      {headers: {'Content-Type': 'application/json'}, observe: 'body', responseType: 'json'})
  .subscribe(response => response );
  }

  public newCapacity(capaValue: string, onDate: string, forUser: number): Observable<Capacity> {
    return  this.httpService.post(`${this.baseUrl}capacity/create`, {
      capa: capaValue,
      date: onDate,
      user: forUser
    }, {headers: {'Content-Type': 'application/json'}, observe: 'body', responseType: 'json'})
      .pipe(map(data => new Capacity().deserialize(data)));
  }

  public newWorkload(newAssigne: string, newSprint: string, newStoryPoints: number, newProject: string): Observable<Workload> {
    return this.httpService.post(`${this.baseUrl}workload/create`, {
      assignee: newAssigne,
      sprint: newSprint,
      storyPoints: newStoryPoints || 0,
      project: newProject
    }, {headers: {'Content-Type': 'application/json'}, observe: 'body', responseType: 'json'})
      .pipe(map(data => new Workload().deserialize(data)));
  }

  public getWorkload(): Observable<Workload[]> {
    return this.httpService.get<Workload[]>(`${this.baseUrl}workload`).pipe(
      map(data => data.map(data => new Workload().deserialize(data)))
    );
  }

  public clearWorkload(): void {
    this.httpService.delete(`${this.baseUrl}workload/delete`).subscribe();
  }

  public newPi(piName: string, startDate: string, endDate: string, amountOfSprints: number): Observable<Pi> {
    return this.httpService.post(`${this.baseUrl}pi/create`, {
      piShortname: piName,
      piStart: startDate,
      pieEnd: endDate,
      sprintCounts: amountOfSprints
    }, {headers: {'Content-Type': 'application/json'}, observe: 'body', responseType: 'json'})
      .pipe(map(data => new Pi().deserialize(data)));
  }

  public getPiData(): Observable<Pi[]> {
    return this.httpService.get<Pi[]>(`${this.baseUrl}pi`).pipe(
      map(data => data.map(data => new Pi().deserialize(data)))
    );
  }

  public updatePi(piId: number, piName: string, startDate: string, endDate: string, amountOfSprints: number): void {
    this.httpService.put(`${this.baseUrl}pi/${piId}/update`, {
        piShortname: piName,
        piStart: startDate,
        pieEnd: endDate,
        sprintCounts: amountOfSprints
      },
      {headers: {'Content-Type': 'application/json'}, observe: 'body', responseType: 'json'})
      .subscribe(response => response );
  }

  public deletePi(piId: number): void {
    this.httpService.delete(`${this.baseUrl}pi/${piId}/delete`).subscribe();
  }
}
