import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-resultados-juegos',
  templateUrl: './resultados-juegos.component.html',
  styleUrls: ['./resultados-juegos.component.css']
})
export class ResultadosJuegosComponent {

  resultadosAhorcado:any;
  resultadosMayorMenor:any;
  resultadosPreguntados:any;
  resultadosSudoku:any;
  ahorcadosGanados:number = 0;
  ahorcadosPerdidos:number = 0;

  coleccionArray:any;

  constructor(private firestore:FirestoreService) {}

  ngOnInit()
  {
    this.firestore.obtenerResultadosJuego("ahorcado").subscribe((data: any) => {
      this.resultadosAhorcado = data;
      this.contarResultadosAhorcado();
    });

    this.firestore.obtenerResultadosJuego("mayoromenor").subscribe((data: any) => {
      this.resultadosMayorMenor = data;
      this.resultadosMayorMenor.sort(this.compararPorPuntaje);
      const resultadosAux = this.resultadosMayorMenor.slice(0, 5);
      this.resultadosMayorMenor = resultadosAux;
    });

    this.firestore.obtenerResultadosJuego("preguntados").subscribe((data: any) => {
      this.resultadosPreguntados = data;
      this.resultadosPreguntados.sort(this.compararPorPuntaje);
      const resultadosAux = this.resultadosPreguntados.slice(0, 5);
      this.resultadosPreguntados = resultadosAux;
    });

    this.firestore.obtenerResultadosJuego("sudoku").subscribe((data: any) => {
      this.resultadosSudoku = data;
      this.resultadosSudoku.sort(this.compararPorTiempo);
      const resultadosAux = this.resultadosSudoku.slice(0, 5);
      this.resultadosSudoku = resultadosAux;
    });
  }

  contarResultadosAhorcado()
  {
    for(let i = 0; i < this.resultadosAhorcado.length; i++)
    {
      if(this.resultadosAhorcado[i].ganado)
      {
        this.ahorcadosGanados++;
      }
      else
      {
        this.ahorcadosPerdidos++;
      }
    }
  }

  compararPorPuntaje(a:any, b:any) {
    return b.puntaje - a.puntaje;
  }

  compararPorTiempo(a:any, b:any) {
    return (a.tiempo).localeCompare(b.tiempo);
  }

}
