import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { ApiService} from '../shared/services/api.service';
import { UserComponent } from './user.component';
import {defer, Observable, of} from 'rxjs';
import {User} from "../shared/models/user.model";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let dialog: MatDialog;
  let apiService: ApiService;

  class MatDialogMock {
    open() {
      return {
        afterClosed: () => of(true)
      };
    }
  }

  function asyncTestHelper(runAsync): any {
    return (done) => {
      runAsync().then(done, e => { fail(e); done(); });
    };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ], imports: [HttpClientTestingModule], providers: [{provide: MatDialog, useClass: MatDialogMock}, ApiService]
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
    expect(dialog.open).toHaveBeenCalled();
    expect(component.deleteUser).toHaveBeenCalled();
  });

  it ('loadUserList() should call waitAMoment()',  () => {
    spyOn(component, 'waitAMoment').and.callThrough();
    component.loadUserList();
    expect(component.waitAMoment).toHaveBeenCalledTimes(1);
  });

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

  it('updateUser() should call loadUserList()', () => {
    component.userControl.setValue({id: 1, name: 'Hans'});
    spyOn(component, 'loadUserList').and.stub();
    spyOn(apiService, 'updateUser').and.stub();
    component.updateUser('Fitz');
    expect(component.loadUserList).toHaveBeenCalledTimes(1);
  });

  it('deleteUser() should call apiServcie', () => {
    component.userControl.setValue({id: 1, name: 'Hans'});
    spyOn(apiService, 'deleteUser').and.stub();
    component.deleteUser();
    expect(apiService.deleteUser).toHaveBeenCalledTimes(1);
  });

  it('deleteUser() should reset FormControll', () => {
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

  it('waitAMoment() should call delay()', asyncTestHelper(async () => {
    spyOn(component, 'delay').and.stub();
    await component.waitAMoment();
    expect(component.delay).toHaveBeenCalledTimes(1);
  }));

  it('delay() should return a Promise', () => {
    const test = component.delay(1);
    expect(test).toBeInstanceOf(Promise);
  });


});
