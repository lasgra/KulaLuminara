import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainupperComponent } from './mainupper.component';

describe('MainupperComponent', () => {
  let component: MainupperComponent;
  let fixture: ComponentFixture<MainupperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainupperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainupperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
