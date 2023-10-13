import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInboxComponent } from './home-inbox.component';

describe('HomeInboxComponent', () => {
  let component: HomeInboxComponent;
  let fixture: ComponentFixture<HomeInboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeInboxComponent]
    });
    fixture = TestBed.createComponent(HomeInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
