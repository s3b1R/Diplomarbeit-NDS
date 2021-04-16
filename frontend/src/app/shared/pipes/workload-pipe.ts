import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from '../services/api.service';

@Pipe({
  name: 'workloadPipe'
})

export class WorkloadPipe implements PipeTransform {

  constructor(private apiService: ApiService) {
  }

  transform(name: string, pi: number, sprint: number): any {
    const sprintInPi = pi + '-' + sprint;
    return this.apiService.getWorkloadForUserInSprint(name, sprintInPi);
  }
}
