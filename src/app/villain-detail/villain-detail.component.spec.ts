import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillainDetailComponent } from './villain-detail.component';

describe('VillainDetailComponent', () => {
  let component: VillainDetailComponent;
  let fixture: ComponentFixture<VillainDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VillainDetailComponent]
    });
    fixture = TestBed.createComponent(VillainDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
