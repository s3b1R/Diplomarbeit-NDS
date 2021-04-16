import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from '../services/api.service';

@Pipe({
  name: 'capaPipe'
})
export class CapacityPipe implements PipeTransform {

  constructor(private apiService: ApiService) {
  }

 transform(userId: number, sprintStart: string, sprintEnd: string): any {
    return this.apiService.getCapacityForUserInSprint(userId, sprintStart, sprintEnd);
  }

}
