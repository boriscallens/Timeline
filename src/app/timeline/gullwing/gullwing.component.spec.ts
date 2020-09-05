import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GullwingComponent } from './gullwing.component';

describe('GullwingComponent', () => {
  let component: GullwingComponent;
  let fixture: ComponentFixture<GullwingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GullwingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GullwingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
