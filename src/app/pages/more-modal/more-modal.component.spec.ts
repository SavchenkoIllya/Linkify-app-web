import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreModalComponent } from './more-modal.component';

describe('MoreModalComponent', () => {
  let component: MoreModalComponent;
  let fixture: ComponentFixture<MoreModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
