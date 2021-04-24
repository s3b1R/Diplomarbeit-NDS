import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { ApiService} from '../shared/services/api.service';
import { UserComponent } from './user.component';
import { of } from 'rxjs';
import { User } from '../shared/models/user.model';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let dialog: MatDialog;
  let apiService: ApiService;

  class MatDialogMock {
    open(): any {
      return {
        afterClosed: () => of(true)
      };
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [HttpClientTestingModule],
      providers: [{provide: MatDialog, useClass: MatDialogMock}, ApiService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should call loadUserList()', () => {
    spyOn(component, 'loadUserList').and.stub();
    component.ngOnInit();
    expect(component.loadUserList).toHaveBeenCalled();
  });

  it('openDialog() opens confirmation dialog', () => {
    spyOn(dialog, 'open').and.callThrough();
    component.openDialog();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('confirmation dialog should call deleteUser() when true returns', () => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'deleteUser').and.stub();
    component.openDialog();
    expect(component.deleteUser).toHaveBeenCalled();
  });

  it ('loadUserList() should call apiService and fill user list after timeout', fakeAsync( () => {
    spyOn(apiService, 'getAllUsers').and.returnValue(of([new User(), new User(), new User()]));
    component.userList = [];
    component.loadUserList();
    tick(500);
    expect(component.userList.length).toEqual(3);
    expect(apiService.getAllUsers).toHaveBeenCalledTimes(1);
  }));

  it ('loadUserList() should not call apiService and fill user list before timeout', fakeAsync( () => {
    spyOn(apiService, 'getAllUsers').and.returnValue(of([new User(), new User(), new User()]));
    component.userList = [];
    component.loadUserList();
    expect(component.userList.length).not.toEqual(3);
    expect(apiService.getAllUsers).not.toHaveBeenCalledTimes(1);
    tick(500);
  }));

  it('saveNewUser() should call apiService', () => {
    component.newUserName = 'User Name';
    spyOn(apiService, 'newUser').and.returnValue(of(new User()));
    component.saveNewUser();
    expect(apiService.newUser).toHaveBeenCalledWith('User Name');
  });

  it('saveNewUser() should change newUserName value', () => {
    component.newUserName = 'User Name';
    spyOn(apiService, 'newUser').and.returnValue(of(new User()));
    component.saveNewUser();
    expect(component.newUserName).toEqual('');
  });

  it('saveNewUser() should call loadUserList()', () => {
    spyOn(component, 'loadUserList').and.stub();
    spyOn(apiService, 'newUser').and.returnValue(of(new User()));
    component.saveNewUser();
    expect(component.loadUserList).toHaveBeenCalledTimes(1);
  });

  it('updateUser() should call apiService', () => {
    component.userControl.setValue({id: 1, name: 'Hans'});
    spyOn(apiService, 'updateUser').and.stub();
    component.updateUser('Fritz');
    expect(apiService.updateUser).toHaveBeenCalledWith(1, 'Fritz');
  });

  it('updateUser() should reset FormControl', () => {
    component.userControl.setValue({id: 1, name: 'Hans'});
    spyOn(apiService, 'updateUser').and.stub();
    component.updateUser('Fritz');
    expect(component.userControl.value).toBe(null);
  });

  it('updateUser() should set CaseControl value', () => {
    component.caseControl.setValue('dummy');
    spyOn(apiService, 'updateUser').and.stub();
    component.updateUser('Fritz');
    expect(component.caseControl.value).toBe('new');
  });

  it('updateUser() should call loadUserList()', () => {
    component.userControl.setValue({id: 1, name: 'Hans'});
    spyOn(component, 'loadUserList').and.stub();
    spyOn(apiService, 'updateUser').and.stub();
    component.updateUser('Fitz');
    expect(component.loadUserList).toHaveBeenCalledTimes(1);
  });

  it('deleteUser() should call apiService', () => {
    component.userControl.setValue({id: 1, name: 'Hans'});
    spyOn(apiService, 'deleteUser').and.stub();
    component.deleteUser();
    expect(apiService.deleteUser).toHaveBeenCalledWith(1);
  });

  it('deleteUser() should reset FormControl', () => {
    component.userControl.setValue({id: 1, name: 'Hans'});
    spyOn(apiService, 'deleteUser').and.stub();
    component.deleteUser();
    expect(component.userControl.value).toBe(null);
  });

  it('deleteUser() should call loadUserList()', () => {
    component.userControl.setValue({id: 1, name: 'Hans'});
    spyOn(component, 'loadUserList').and.stub();
    spyOn(apiService, 'deleteUser').and.stub();
    component.deleteUser();
    expect(component.loadUserList).toHaveBeenCalledTimes(1);
  });

});
