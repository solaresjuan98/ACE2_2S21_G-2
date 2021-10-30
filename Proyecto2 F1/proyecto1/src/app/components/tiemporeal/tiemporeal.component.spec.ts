import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiemporealComponent } from './tiemporeal.component';

describe('TiemporealComponent', () => {
  let component: TiemporealComponent;
  let fixture: ComponentFixture<TiemporealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiemporealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiemporealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
