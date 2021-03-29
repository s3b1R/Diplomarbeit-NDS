import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityMassmutationComponent } from './capacity-massmutation.component';

describe('CapacityMassmutationComponent', () => {
  let component: CapacityMassmutationComponent;
  let fixture: ComponentFixture<CapacityMassmutationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacityMassmutationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityMassmutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
