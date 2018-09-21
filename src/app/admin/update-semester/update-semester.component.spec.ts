import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSemesterComponent } from './update-semester.component';

describe('UpdateSemesterComponent', () => {
  let component: UpdateSemesterComponent;
  let fixture: ComponentFixture<UpdateSemesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSemesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
