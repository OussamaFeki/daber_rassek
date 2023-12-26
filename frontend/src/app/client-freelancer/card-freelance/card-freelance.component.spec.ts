import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFreelanceComponent } from './card-freelance.component';

describe('CardFreelanceComponent', () => {
  let component: CardFreelanceComponent;
  let fixture: ComponentFixture<CardFreelanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardFreelanceComponent]
    });
    fixture = TestBed.createComponent(CardFreelanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
