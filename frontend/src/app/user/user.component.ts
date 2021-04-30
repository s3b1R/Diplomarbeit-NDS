import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { ApiService } from '../shared/services/api.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

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

  constructor(private apiService: ApiService, public dialog: MatDialog, private router: Router) { }

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
    this.apiService.getAllUsers().subscribe(results => {
      this.userList = results;
    });
  }

  saveNewUser(): void {
    this.apiService.newUser(this.newUserName).subscribe();
    this.caseControl.setValue('success');
    this.newUserName = '';
    this.navigateHome();
  }

  updateUser(editedName: string): void {
    this.apiService.updateUser(this.userControl.value?.id, editedName);
    this.userControl.reset();
    this.caseControl.setValue('success');
    this.navigateHome();
  }


  deleteUser(): void {
    const userId = this.userControl.value?.id;
    this.apiService.deleteAllCapacityForUser(userId);
    setTimeout(async () => {
      this.apiService.deleteUser(userId);
      await this.router.navigate(['']);
      }, 1500);
    this.caseControl.setValue('success');
    this.userControl.reset();
  }

  navigateHome(): void {
    setTimeout( async () => {
      await this.router.navigate(['']);
    }, 1500);
  }
}
