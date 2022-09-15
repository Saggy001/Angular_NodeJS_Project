import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertUserComponent } from './alert-user.component';

describe('AlertUserComponent', () => {
  let component: AlertUserComponent;
  let fixture: ComponentFixture<AlertUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
