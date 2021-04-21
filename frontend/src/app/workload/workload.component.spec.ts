import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../shared/services/api.service';
import { NgxCsvParser } from 'ngx-csv-parser';
import { Router } from '@angular/router';
import { WorkloadComponent } from './workload.component';
import { File } from '@angular/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system';
import { Observable } from 'rxjs';
import { Workload } from '../shared/models/workload.model';

describe('WorkloadComponent', () => {
  let component: WorkloadComponent;
  let fixture: ComponentFixture<WorkloadComponent>;
  let parser: NgxCsvParser;
  let apiService: ApiService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkloadComponent ], imports: [HttpClientTestingModule, RouterTestingModule], providers: [ApiService, NgxCsvParser]
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('parseCSV() should call the NgcCsvParser', () => {
    const mockedFile = new File([], 'test.csv', {type: 'text/csv'});

    spyOn(parser, 'parse').and.callThrough();
    component.parseCSV(mockedFile);
    expect(parser.parse).toHaveBeenCalledTimes(1);
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

    spyOn(component, 'makeReadyForUpload');

    component.keepLastSprint(mockedInput);
    expect(mockedInput).toEqual(mockedResult);
    expect(component.makeReadyForUpload).toHaveBeenCalled();

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

  it('uploadWorkload() should seed database with imported workload', () => {
    spyOn(apiService, 'clearWorkload').and.stub();
    spyOn(apiService, 'newWorkload').and.returnValue(new Observable<Workload>());
    spyOn(component, 'waitAMomentAndShowWorkload').and.stub();
    component.csvRecords = [
      {Assignee: 'Haris Besic', Sprint: 'Lucky 2106-2 (14.-27.4.)', 'Story Points': 1, Project: 'Go4 100 SME&Mila'},
      {Assignee: 'Haris Besic', Sprint: 'Lucky 2106-5 (26.5.-9.6.)', 'Story Points': 1, Project: 'Go4 100 SME&Mila'},
      {Assignee: 'Jan Troeltsch', Sprint: 'Dagobert 2103-5 (17.-31.3.)', 'Story Points': 1, Project: 'Go4 100 Mio'}
    ];

    component.uploadWorkload();

    expect(apiService.clearWorkload).toHaveBeenCalled();
    expect(apiService.newWorkload).toHaveBeenCalledTimes(3);
    expect(component.waitAMomentAndShowWorkload).toHaveBeenCalled();
  });

  it('should waita moment', () => {

    component.waitAMomentAndShowWorkload();

    expect(component.readyForUpload).toBe(false);
  })

});
