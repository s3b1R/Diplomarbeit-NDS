import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  newUserName: string;
  userList: User[];
  caseControl = new FormControl();
  userControl = new FormControl();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadUserList();
  }


  private loadUserList(): void {
    this.waitAMoment().then(() => {
      this.apiService.getAllUsers().subscribe(results => {
        this.userList = results;
      });
    });
  }

  safeNewUser(): void {
    this.apiService.newUser(this.newUserName).subscribe();
    this.newUserName = '';
    this.loadUserList();
  }

  updateUser(editedName: string): void {
    this.apiService.updateUser(this.userControl.value.id, editedName);
    this.userControl.reset();
    this.loadUserList();
  }


  deleteUser(): void {
    this.apiService.deleteUser(this.userControl.value.id);
    this.userControl.reset();
    this.loadUserList();
  }

  async waitAMoment(): Promise<void> {
    await this.delay(500);
  }

  delay(ms: number): any {
    return new Promise( resolve => setTimeout(resolve, ms));
  }

}
