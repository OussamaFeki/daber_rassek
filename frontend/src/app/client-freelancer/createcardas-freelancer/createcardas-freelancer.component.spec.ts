import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecardasFreelancerComponent } from './createcardas-freelancer.component';

describe('CreatecardasFreelancerComponent', () => {
  let component: CreatecardasFreelancerComponent;
  let fixture: ComponentFixture<CreatecardasFreelancerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatecardasFreelancerComponent]
    });
    fixture = TestBed.createComponent(CreatecardasFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
