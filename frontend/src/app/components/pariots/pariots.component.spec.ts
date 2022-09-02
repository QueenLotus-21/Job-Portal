import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PariotsComponent } from './pariots.component';

describe('PariotsComponent', () => {
  let component: PariotsComponent;
  let fixture: ComponentFixture<PariotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PariotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PariotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
