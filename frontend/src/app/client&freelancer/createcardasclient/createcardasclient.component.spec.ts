import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecardasclientComponent } from './createcardasclient.component';

describe('CreatecardasclientComponent', () => {
  let component: CreatecardasclientComponent;
  let fixture: ComponentFixture<CreatecardasclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatecardasclientComponent]
    });
    fixture = TestBed.createComponent(CreatecardasclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
