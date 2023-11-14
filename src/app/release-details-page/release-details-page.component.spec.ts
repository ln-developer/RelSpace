import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseDetailsPageComponent } from './release-details-page.component';

describe('ReleaseDetailsPageComponent', () => {
  let component: ReleaseDetailsPageComponent;
  let fixture: ComponentFixture<ReleaseDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReleaseDetailsPageComponent]
    });
    fixture = TestBed.createComponent(ReleaseDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
