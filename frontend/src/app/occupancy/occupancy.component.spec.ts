import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../shared/services/api.service';
import { OccupancyComponent } from './occupancy.component';
import { Workload } from '../shared/models/workload.model';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('OccupancyComponent', () => {
  let component: OccupancyComponent;
  let fixture: ComponentFixture<OccupancyComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupancyComponent ], imports: [ HttpClientTestingModule ], providers: [ ApiService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupancyComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should load workload list from apiService', () => {
    spyOn(apiService, 'getWorkload').and.returnValue(of([new Workload(), new Workload()]));

    component.ngOnInit();

    expect(apiService.getWorkload).toHaveBeenCalledTimes(1);
    expect(component.workloadList.length).toBe(2);
  });

});
