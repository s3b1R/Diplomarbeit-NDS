import {Component, OnInit} from '@angular/core';
import {Workload} from '../../shared/models/workload.model';
import {ApiService} from '../../shared/services/api.service';

@Component({
  selector: 'app-occupancy',
  templateUrl: './occupancy.component.html',
  styleUrls: ['./occupancy.component.css']
})
export class OccupancyComponent implements OnInit {
  workloadList: Workload[] = [];

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getWorkload().subscribe(result => {
      this.workloadList = result;
    });
  }

}
