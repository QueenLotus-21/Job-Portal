import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanynavComponent } from './companynav.component';

describe('CompanynavComponent', () => {
  let component: CompanynavComponent;
  let fixture: ComponentFixture<CompanynavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanynavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanynavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
