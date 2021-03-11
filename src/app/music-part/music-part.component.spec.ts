import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPartComponent } from './music-part.component';

describe('MusicPartComponent', () => {
  let component: MusicPartComponent;
  let fixture: ComponentFixture<MusicPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
