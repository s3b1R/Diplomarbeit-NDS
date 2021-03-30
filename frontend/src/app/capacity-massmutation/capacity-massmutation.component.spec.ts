import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { DateFnsModule } from 'ngx-date-fns';

import { CapacityMassmutationComponent } from './capacity-massmutation.component';

describe('CapacityMassmutationComponent', () => {
  let component: CapacityMassmutationComponent;
  let fixture: ComponentFixture<CapacityMassmutationComponent>;
  let apiService: ApiService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacityMassmutationComponent ], imports: [HttpClientTestingModule, RouterTestingModule], providers: [ApiService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityMassmutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
