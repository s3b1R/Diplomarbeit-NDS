import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../shared/services/api.service';
import { NgxCsvParser } from 'ngx-csv-parser';
import { Router } from '@angular/router';
import { WorkloadComponent } from './workload.component';
import { File } from '@angular/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system';
import {Observable, of } from 'rxjs';
import { Workload } from '../shared/models/workload.model';


describe('WorkloadComponent', () => {
  let component: WorkloadComponent;
  let fixture: ComponentFixture<WorkloadComponent>;
  let parser: NgxCsvParser;
  let apiService: ApiService;
  const mockRouter = {navigate: jasmine.createSpy('navigate')};


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkloadComponent ], imports: [HttpClientTestingModule],
      providers: [ApiService, NgxCsvParser, {provide: Router, useValue: mockRouter}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkloadComponent);
    component = fixture.componentInstance;
    parser = TestBed.inject(NgxCsvParser);
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('fileChangeListener() should call parseCSV()', () => {
    spyOn(component, 'parseCSV').and.stub();
    component.fileChangeListener('dummy');
    expect(component.parseCSV).toHaveBeenCalledTimes(1);
  });

  it('parseCSV() should call the NgcCsvParser', () => {
    const mockedFile = new File([], 'test.csv', {type: 'text/csv'});
    spyOn(parser, 'parse').and.callThrough();
    component.parseCSV(mockedFile);
    expect(parser.parse).toHaveBeenCalledTimes(1);
  });

  it('parseCSV() should call keepLastSprint()', () => {
    const mockedParseResult = [
      {Assignee: 'Haris Besic', Sprint: 'Lucky 2106-2 (14.-27.4.)', 'Story Points': 1, Project: 'Go4 100 SME&Mila'},
      {Assignee: 'Haris Besic', Sprint: 'Lucky 2106-5 (26.5.-9.6.)', 'Story Points': 1, Project: 'Go4 100 SME&Mila'},
      {Assignee: 'Jan Troeltsch', Sprint: 'Dagobert 2101-3 (25.11.-8.12.), Dagobert 2103-5 (17.-31.3.)', 'Story Points': 1, Project: 'Go4 100 Mio'}
    ];
    const mockedFile = new File([], 'test.csv', {type: 'text/csv'});
    spyOn(parser, 'parse').and.returnValue(of(mockedParseResult));
    spyOn(component, 'keepLastSprint').and.stub();
    component.parseCSV(mockedFile);
    expect(component.keepLastSprint).toHaveBeenCalledWith(mockedParseResult);
  });

  it('keepLastSprint() should keep the newest sprint if more as one in one workload ', () => {
    const mockedInput = [
      {Assignee: 'Haris Besic', Sprint: 'Lucky 2106-2 (14.-27.4.)', 'Story Points': 1, Project: 'Go4 100 SME&Mila'},
      {Assignee: 'Haris Besic', Sprint: 'Lucky 2106-5 (26.5.-9.6.)', 'Story Points': 1, Project: 'Go4 100 SME&Mila'},
      {Assignee: 'Jan Troeltsch', Sprint: 'Dagobert 2101-3 (25.11.-8.12.), Dagobert 2103-5 (17.-31.3.)', 'Story Points': 1, Project: 'Go4 100 Mio'}
    ];
    const mockedResult = [
      {Assignee: 'Haris Besic', Sprint: 'Lucky 2106-2 (14.-27.4.)', 'Story Points': 1, Project: 'Go4 100 SME&Mila'},
      {Assignee: 'Haris Besic', Sprint: 'Lucky 2106-5 (26.5.-9.6.)', 'Story Points': 1, Project: 'Go4 100 SME&Mila'},
      {Assignee: 'Jan Troeltsch', Sprint: 'Dagobert 2103-5 (17.-31.3.)', 'Story Points': 1, Project: 'Go4 100 Mio'}
    ];
    component.keepLastSprint(mockedInput);
    expect(mockedInput).toEqual(mockedResult);
  });

  it('keepLastSprint() should call function makeReadyForUpload() ', () => {
    const mockedInput = [
      {Assignee: 'Haris Besic', Sprint: 'Lucky 2106-2 (14.-27.4.)', 'Story Points': 1, Project: 'Go4 100 SME&Mila'},
      {Assignee: 'Haris Besic', Sprint: 'Lucky 2106-5 (26.5.-9.6.)', 'Story Points': 1, Project: 'Go4 100 SME&Mila'},
      {Assignee: 'Jan Troeltsch', Sprint: 'Dagobert 2101-3 (25.11.-8.12.), Dagobert 2103-5 (17.-31.3.)', 'Story Points': 1, Project: 'Go4 100 Mio'}
    ];
    const mockedResult = [
      {Assignee: 'Haris Besic', Sprint: 'Lucky 2106-2 (14.-27.4.)', 'Story Points': 1, Project: 'Go4 100 SME&Mila'},
      {Assignee: 'Haris Besic', Sprint: 'Lucky 2106-5 (26.5.-9.6.)', 'Story Points': 1, Project: 'Go4 100 SME&Mila'},
      {Assignee: 'Jan Troeltsch', Sprint: 'Dagobert 2103-5 (17.-31.3.)', 'Story Points': 1, Project: 'Go4 100 Mio'}
    ];
    spyOn(component, 'makeReadyForUpload');
    component.keepLastSprint(mockedInput);
    expect(component.makeReadyForUpload).toHaveBeenCalledWith(mockedResult);
  });

  it ('makeReadyForUpload() should set variables', () => {
    const mockedInput = [
      {Assignee: 'Haris Besic', Sprint: 'Lucky 2106-2 (14.-27.4.)', 'Story Points': 1, Project: 'Go4 100 SME&Mila'},
      {Assignee: 'Haris Besic', Sprint: 'Lucky 2106-5 (26.5.-9.6.)', 'Story Points': 1, Project: 'Go4 100 SME&Mila'},
      {Assignee: 'Jan Troeltsch', Sprint: 'Dagobert 2103-5 (17.-31.3.)', 'Story Points': 1, Project: 'Go4 100 Mio'}
    ];
    component.makeReadyForUpload(mockedInput);
    expect(component.csvRecords).toEqual(mockedInput);
    expect(component.readyForUpload).toEqual(true);
  });

  it('uploadWorkload() should delete all workload in database', () => {
    spyOn(apiService, 'clearWorkload').and.stub();
    component.uploadWorkload();
    expect(apiService.clearWorkload).toHaveBeenCalledTimes(1);
  });

  it('uploadWorkload() should call sendDataToDatabase', () => {
    spyOn(component, 'sendDataToDatabase').and.stub();
    component.uploadWorkload();
    expect(component.sendDataToDatabase).toHaveBeenCalledTimes(1);
  });

  it('uploadWorkload() should set readyForUpload to false after timout', fakeAsync( () => {
    component.readyForUpload = true;
    component.uploadWorkload();
    tick(500);
    expect(component.readyForUpload).toBeFalse();
  }));

  it('uploadWorkload() should set navigate to occupancy after timout', fakeAsync( () => {
    component.uploadWorkload();
    tick(500);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['occupancy']);
  }));

  it('sendDataToDatabase() should call apiService and send data to the database', () => {
    component.csvRecords = [
      {Assignee: 'Haris Besic', Sprint: 'Lucky 2106-2 (14.-27.4.)', 'Story Points': 1, Project: 'Go4 100 SME&Mila'},
      {Assignee: 'Haris Besic', Sprint: 'Lucky 2106-5 (26.5.-9.6.)', 'Story Points': 1, Project: 'Go4 100 SME&Mila'},
      {Assignee: 'Jan Troeltsch', Sprint: 'Dagobert 2103-5 (17.-31.3.)', 'Story Points': 1, Project: 'Go4 100 Mio'}
    ];
    spyOn(apiService, 'newWorkload').and.returnValue(new Observable<Workload>());
    component.sendDataToDatabase();
    expect(apiService.newWorkload).toHaveBeenCalledTimes(3);
  });

});
