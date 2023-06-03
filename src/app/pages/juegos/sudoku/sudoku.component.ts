import { Component, Renderer2 } from '@angular/core';
import { getSudoku } from 'sudoku-gen';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent {

  sudoku:any;
  matrizSudoku: string[][] = [];
  matrizSolucion: string[][] = [];
  numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  botonPresionado:string = "";
  celdaInicialOcupada:boolean = true;
  celdas:any;
  resultado:string = "";
  imagenResultado:string = "";
  popup:any;
  startTime?: Date;
  elapsedTime?: string;
  timerId: any;
  isPaused: boolean = false;
  tiempoFinal:string = "";

  constructor(private renderer:Renderer2) {}
  
  ngOnInit()
  {
    this.sudoku = getSudoku("easy");
    console.log(this.sudoku);
    this.matrizSudoku = this.generarMatrizSudoku(this.sudoku.puzzle);
    this.matrizSolucion = this.generarMatrizSudoku(this.sudoku.solution);
    console.log(this.matrizSolucion);
    this.startTime = new Date();
    this.startTimer();
  }

  ngAfterViewInit()
  {
    this.popup = document.getElementById("popup");
    this.celdas = document.getElementsByTagName("td");

    for (const celda of this.celdas)
    {
      if(celda.innerText != "")
      {
        celda.classList.add("celda-bloqueada");
      }
    }
  }

  generarMatrizSudoku(puzzle: string)
  {
    const tablero: string[][] = [];

    for (let i = 0; i < puzzle.length; i += 9)
    {
      const fila = puzzle.slice(i, i + 9).split('');
      tablero.push(fila);
    }

    return tablero;
  }

  insertarNumeroEnMatriz(fila:number, columna:number)
  {
    if(this.botonPresionado != "")
    {
      this.matrizSudoku[fila][columna] = this.botonPresionado;
      this.verificarSudokuCompleto();
    }
    else
    {
      console.log("Primero tenés que presionar un botón");
    }
  }

  obtenerBoton(boton:HTMLElement)
  {
    console.log(boton.innerText);
    if(this.numeros.includes(parseInt(boton.innerText)))
    {
      this.botonPresionado = boton.innerText;
    }
    else if(boton.hasChildNodes())
    {
      this.botonPresionado = " ";
    }
  }

  verificarGuion(matriz: string[][])
  {
    for (let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz[i].length; j++) {
        if (matriz[i][j] === '-' || matriz[i][j] === " ")
        {
          return true; // Se encontró un guion "-"
        }
      }
    }
    return false; // No se encontró ningún guion "-"
  }

  verificarSudokuCompleto()
  {
    if(!this.verificarGuion(this.matrizSudoku))
    {
      this.togglePause();
      if(this.compararMatrices(this.matrizSudoku, this.matrizSolucion))
      {
        //GANASTE
        console.log("sudoku completo correctamente");
        this.resultado = "¡Sudoku completo!";
        this.imagenResultado = "../../../../assets/trophy.png";
        this.tiempoFinal = "Tu tiempo final es de " + this.elapsedTime;
        if(this.popup)
        {
          this.popup.classList.add("open-popup");
        }
      }
      else
      {
        //ALGUN NUMERO ESTA MAL
        console.log("algun numero esta mal puesto");
        this.resultado = "¡Algún número te quedó mal!";
        this.imagenResultado = "../../../../assets/game-over.png";
        this.tiempoFinal = "";
        if(this.popup)
        {
          this.popup.classList.add("open-popup");
        }
      }
    }
  }

  compararMatrices(matriz1: any[][], matriz2: any[][])
  {
    if (matriz1.length !== matriz2.length) {
      return false;
    }
  
    for (let i = 0; i < matriz1.length; i++) {
      if (matriz1[i].length !== matriz2[i].length) {
        return false;
      }
  
      for (let j = 0; j < matriz1[i].length; j++) {
        if (matriz1[i][j] !== matriz2[i][j]) {
          return false;
        }
      }
    }
  
    return true;
  }

  async reiniciarJuego()
  {
    this.popup?.classList.remove("open-popup");
    this.sudoku = getSudoku("easy");
    this.matrizSudoku = this.generarMatrizSudoku(this.sudoku.puzzle);
    this.matrizSolucion = this.generarMatrizSudoku(this.sudoku.solution);
    clearInterval(this.timerId);
    this.isPaused = false;
    this.startTime = new Date();
    this.startTimer();
  }

  startTimer() {
    this.timerId = setInterval(() => {
      if (!this.isPaused) {
        const currentTime = new Date();
        const timeDiff = currentTime.getTime() - this.startTime!.getTime();
        this.elapsedTime = this.formatTime(timeDiff);
      }
    }, 1000);
  }

  formatTime(ms: number): string {
    const seconds = Math.floor((ms / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((ms / (1000 * 60)) % 60).toString().padStart(2, '0');
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }

}
