import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinterfaceComponent } from './userinterface.component';

describe('UserinterfaceComponent', () => {
  let component: UserinterfaceComponent;
  let fixture: ComponentFixture<UserinterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserinterfaceComponent]
    });
    fixture = TestBed.createComponent(UserinterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
