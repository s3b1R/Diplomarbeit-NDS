import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../shared/services/api.service';
import { Router } from '@angular/router';
import { WorkloadComponent } from './workload.component';

describe('WorkloadComponent', () => {
  let component: WorkloadComponent;
  let fixture: ComponentFixture<WorkloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkloadComponent ], imports: [HttpClientTestingModule, RouterTestingModule], providers: [ApiService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
