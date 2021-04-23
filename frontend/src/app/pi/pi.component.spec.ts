import { ComponentFixture, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../shared/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { PiComponent } from './pi.component';
import { of } from 'rxjs';
import { Pi } from '../shared/models/pi.model';
import { DateFnsModule } from 'ngx-date-fns';

describe('PiComponent', () => {
  let component: PiComponent;
  let fixture: ComponentFixture<PiComponent>;
  let apiService: ApiService;
  let dialog: MatDialog;

  class MatDialogMock {
    open(): any {
      return {
        afterClosed: () => of(true)
      };
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiComponent ], imports: [HttpClientTestingModule, DateFnsModule],
      providers: [{provide: MatDialog, useClass: MatDialogMock}, ApiService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    apiService = TestBed.inject(ApiService);
    component.startDate.setValue(new Date());
    component.endDate.setValue(new Date());
    component.sprintCounts.setValue(5);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load Pi list on init', () => {
    spyOn(component, 'loadPiList').and.stub();
    component.ngOnInit();
    expect(component.loadPiList).toHaveBeenCalledTimes(1);
  });

  it('submitNewPi() should call formatNewSprintDates()', () => {
    spyOn(component, 'formatNewSprintDates').and.callThrough();
    component.submitNewPi();
    expect(component.formatNewSprintDates).toHaveBeenCalledTimes(1);
  });

  it('submitNewPi() should call apiService', () => {
    spyOn(apiService, 'newPi').and.returnValue(of(new Pi()));
    component.submitNewPi();
    expect(apiService.newPi).toHaveBeenCalledTimes(1);
  });

  it('submitNewPi() should call controlFieldsReset()', () => {
    spyOn(component, 'controlFieldsReset').and.stub();
    component.submitNewPi();
    expect(component.controlFieldsReset).toHaveBeenCalledTimes(1);
  });

  it('submitNewPi() should call loadPiList()', () => {
    spyOn(component, 'loadPiList').and.stub();
    component.submitNewPi();
    expect(component.loadPiList).toHaveBeenCalledTimes(1);
  });

  it('updatePI() should call formatUpdatedSprints()', () => {
    component.piControl.patchValue({pi: 1});
    spyOn(apiService, 'updatePi').and.stub();
    spyOn(component, 'formatUpdatedSprints').and.callThrough();
    component.updatePi('2104', '01/04/2021', '30/04/2021', '1', '01/04/2021', '30/04/2021', '', '', '', '', '', '', '', '', '', '');
    expect(component.formatUpdatedSprints).toHaveBeenCalledTimes(1);
  });

  it('updatePI() should call apiService for updating Pi in DB', () => {
    component.piControl.patchValue({id: 1});
    spyOn(apiService, 'updatePi').and.stub();
    component.updatePi('2104', '01/04/2021', '30/04/2021', '1', '', '', '', '', '', '', '', '', '', '', '', '');
    expect(apiService.updatePi).toHaveBeenCalledWith(1 , '2104', '2021-04-01', '2021-04-30', 1, null, null, null, null, null, null, null, null, null, null, null, null);
  })

  it('updatePI() should reset FormControl', () => {
    component.piControl.patchValue({id: 1});
    spyOn(apiService, 'updatePi').and.stub();
    component.updatePi('2104', '01/04/2021', '30/04/2021', '1', '', '', '', '', '', '', '', '', '', '', '', '');
    expect(component.piControl.value).toEqual(null);
  });

  it('updatePI() should set FormControl value', () => {
    component.caseControl.setValue('dummy');
    component.piControl.patchValue({id: 1});
    spyOn(apiService, 'updatePi').and.stub();
    component.updatePi('2104', '01/04/2021', '30/04/2021', '1', '', '', '', '', '', '', '', '', '', '', '', '');
    expect(component.caseControl.value).toEqual('new');
  });

  it('updatePI() should call loadPiList()', () => {
    component.caseControl.setValue('dummy');
    component.piControl.patchValue({id: 1});
    spyOn(component, 'loadPiList').and.stub();
    spyOn(apiService, 'updatePi').and.stub();
    component.updatePi('2104', '01/04/2021', '30/04/2021', '1', '', '', '', '', '', '', '', '', '', '', '', '');
    expect(component.loadPiList).toHaveBeenCalledTimes(1);
  });

  it('openDialog() opens confirmation dialog', () => {
    component.piControl.patchValue({piShortname: '2103'});
    spyOn(dialog, 'open').and.callThrough();
    component.openDialog();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('confirmation dialog should call deletePi() when true returns', () => {
    component.piControl.patchValue({piShortname: '2103'});
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'deletePi').and.stub();
    component.openDialog();
    expect(component.deletePi).toHaveBeenCalled();
  });

  it('deletePi() should call apiService to delete Pi in db', ()=> {
    component.piControl.patchValue({id: 3});
    spyOn(apiService, 'deletePi').and.stub();
    component.deletePi();
    expect(apiService.deletePi).toHaveBeenCalledWith(3);
  });

  it('deletePi() should reset FormControls', ()=> {
    component.piControl.patchValue({id: 3});
    spyOn(apiService, 'deletePi').and.stub();
    component.deletePi();
    expect(component.piControl.value).toBe(null);
    expect(component.caseControl.value).toEqual('new');
  });

  it('loadPiList() should not reload Pi list before timeout', fakeAsync(() => {
    spyOn(apiService, 'getPiData').and.returnValue(of([new Pi(), new Pi()]));
    component.loadPiList();
    expect(component.piList).toEqual([]);
    expect(apiService.getPiData).not.toHaveBeenCalled();
    tick(500);
  }));

  it('loadPiList() should reload Pi list after timeout', fakeAsync(() => {
     spyOn(apiService, 'getPiData').and.returnValue(of([new Pi(), new Pi()]));
     component.loadPiList();
     tick(500);
     expect(apiService.getPiData).toHaveBeenCalledTimes(1);
     expect(component.piList.length).toEqual(2);
  }));

  it('formatNewSprintDates() should format sprint dates', () => {
    component.sprint1Start.setValue(new Date(2021, 3, 19));
    component.sprint3End.setValue(null);
    component.formatNewSprintDates();
    expect(component.sprint1Start.value).toBe('2021-04-19');
    expect(component.sprint3End.value).toBe(null);
  });

  it('formatUpdatedSprints() should format updated sprint dates', () => {
    expect(component.formatUpdatedSprints(['19/04/2021', '', '01/12/2021']))
      .toEqual(['2021-04-19', null, '2021-12-01']);
  });

  it('controlFieldsReset() should reset FormControls', () => {
    component.shortName.setValue('2106');
    component.sprintCounts.setValue(4);
    component.sprint2End.setValue(new Date());

    component.controlFieldsReset();
    expect(component.shortName.value).toBe(null);
    expect(component.sprintCounts.value).toBe(null);
    expect(component.sprint2End.value).toBe(null);
  });

});
