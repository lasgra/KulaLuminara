import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuypageComponent } from './buypage.component';

describe('BuypageComponent', () => {
  let component: BuypageComponent;
  let fixture: ComponentFixture<BuypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuypageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
