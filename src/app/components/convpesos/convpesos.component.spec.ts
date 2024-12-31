import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvpesosComponent } from './convpesos.component';

describe('ConvpesosComponent', () => {
  let component: ConvpesosComponent;
  let fixture: ComponentFixture<ConvpesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvpesosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConvpesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
