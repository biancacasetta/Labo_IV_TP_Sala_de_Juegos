import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosJuegosComponent } from './resultados-juegos.component';

describe('ResultadosJuegosComponent', () => {
  let component: ResultadosJuegosComponent;
  let fixture: ComponentFixture<ResultadosJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadosJuegosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
