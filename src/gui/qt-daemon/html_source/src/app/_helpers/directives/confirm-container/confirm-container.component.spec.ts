import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmContainerComponent } from './confirm-container.component';

describe('ConfirmContainerComponent', () => {
  let component: ConfirmContainerComponent;
  let fixture: ComponentFixture<ConfirmContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
