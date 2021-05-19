import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerecDialogComponent } from './generec-dialog.component';

describe('GenerecDialogComponent', () => {
  let component: GenerecDialogComponent;
  let fixture: ComponentFixture<GenerecDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerecDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerecDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
