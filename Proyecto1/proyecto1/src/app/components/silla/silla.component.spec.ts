import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SillaComponent } from './silla.component';

describe('SillaComponent', () => {
  let component: SillaComponent;
  let fixture: ComponentFixture<SillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
