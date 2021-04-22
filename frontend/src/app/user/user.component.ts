import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { ApiService } from '../shared/services/api.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  newUserName = '';
  userList: User[] = [];
  caseControl = new FormControl('new');
  userControl = new FormControl();

  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUserList();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `${this.userControl.value?.name} löschen?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser();
      }
    });
  }


  loadUserList(): void {
    this.waitAMoment().then(() => {
      this.apiService.getAllUsers().subscribe(results => {
        this.userList = results;
      });
    });
  }

  saveNewUser(): void {
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
