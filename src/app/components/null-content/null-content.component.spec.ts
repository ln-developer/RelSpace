import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NullContentComponent } from './null-content.component';

describe('NullContentComponent', () => {
  let component: NullContentComponent;
  let fixture: ComponentFixture<NullContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NullContentComponent]
    });
    fixture = TestBed.createComponent(NullContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
