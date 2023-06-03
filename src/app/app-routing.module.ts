import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccesoComponent } from './pages/acceso/acceso.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { ChatComponent } from './pages/chat/chat.component';

const routes: Routes = [
  { path: "", component: BienvenidaComponent },
  { path: "bienvenida", component: BienvenidaComponent },
  { path: "acceso", component: AccesoComponent },
  { path: "juegos", loadChildren: () => import('./pages/juegos/juegos.module').then(m => m.JuegosModule) },
  { path: "quien-soy", component: QuienSoyComponent},
  { path: "chat", component: ChatComponent}
  //{path: "**"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
