import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuJuegosComponent } from '../menu-juegos/menu-juegos.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';

const routes: Routes = [
  { path: '', component: MenuJuegosComponent },
  {path: 'ahorcado', component: AhorcadoComponent},
  {path: 'mayor-o-menor', component: MayorOMenorComponent},
  {path: 'preguntados', component: PreguntadosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
