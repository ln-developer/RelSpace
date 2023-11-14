import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowWithInputComponent } from './window-with-input.component';

describe('WindowWithInputComponent', () => {
  let component: WindowWithInputComponent;
  let fixture: ComponentFixture<WindowWithInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WindowWithInputComponent]
    });
    fixture = TestBed.createComponent(WindowWithInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
