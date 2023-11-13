import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseListComponent } from './release-list.component';

describe('ReleaseListComponent', () => {
  let component: ReleaseListComponent;
  let fixture: ComponentFixture<ReleaseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReleaseListComponent]
    });
    fixture = TestBed.createComponent(ReleaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
