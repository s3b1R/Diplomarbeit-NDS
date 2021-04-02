import { Component, OnInit } from '@angular/core';
import {User} from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userList: User[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe(results => {
      this.userList = results;
    });
  }

}
