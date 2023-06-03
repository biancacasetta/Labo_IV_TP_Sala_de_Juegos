import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { MenuJuegosComponent } from '../menu-juegos/menu-juegos.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { SudokuComponent } from './sudoku/sudoku.component';


@NgModule({
  declarations: [
    MenuJuegosComponent,
    AhorcadoComponent,
    MayorOMenorComponent,
    PreguntadosComponent,
    SudokuComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
