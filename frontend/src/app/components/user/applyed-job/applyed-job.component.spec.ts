import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyedJobComponent } from './applyed-job.component';

describe('ApplyedJobComponent', () => {
  let component: ApplyedJobComponent;
  let fixture: ComponentFixture<ApplyedJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyedJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
