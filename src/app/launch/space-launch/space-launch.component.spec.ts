import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceLaunchComponent } from './space-launch.component';

describe('SpaceLaunchComponent', () => {
  let component: SpaceLaunchComponent;
  let fixture: ComponentFixture<SpaceLaunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceLaunchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
