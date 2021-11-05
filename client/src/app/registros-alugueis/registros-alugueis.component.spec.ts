import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosAlugueisComponent } from './registros-alugueis.component';

describe('RegistrosAlugueisComponent', () => {
  let component: RegistrosAlugueisComponent;
  let fixture: ComponentFixture<RegistrosAlugueisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrosAlugueisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrosAlugueisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
