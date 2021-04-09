import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { PiComponent } from './pi.component';

describe('PiComponent', () => {
  let component: PiComponent;
  let fixture: ComponentFixture<PiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiComponent ], imports: [HttpClientTestingModule, MatDialogModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
