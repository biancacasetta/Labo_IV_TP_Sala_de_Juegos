import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {

  //@ts-ignore
  formEncuesta:FormGroup;
  user: any = null;
  validNewGame: string | boolean;
  resultado = "";
  imagenResultado = "";
  popup:any;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.validNewGame = false;
    this.formEncuesta = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      nuevoJuegoViborita: [true],
      nuevoJuegoBuscaminas: [false],
      nuevoJuegoPinball: [false],
      juegoFavorito: ['ahorcado'],
      recomiendaPagina: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.popup = document.getElementById("popup");
  }

  enviarEncuesta() {
    if (this.formEncuesta.valid) {
      if (this.validateNewGame()) {
        this.resultado = "¡ENCUESTA ENVIADA!";
        this.imagenResultado = "../../../../assets/check.png";
        this.popup?.classList.add("open-popup");

        this.formEncuesta.reset({
          nombre: '',
          apellido: '',
          edad: '',
          telefono: '',
          nuevoJuegoViborita: true,
          nuevoJuegoBuscaminas: false,
          nuevoJuegoPinball: false,
          juegoFavorito: 'ahorcado',
          recomiendaPagina: '',
        });
      }
    }
    else
    {
      this.resultado = "FALTAN COMPLETAR CAMPOS";
        this.imagenResultado = "../../../../assets/cross.png";
        this.popup?.classList.add("open-popup");
    }

    setTimeout(() => {
      this.popup.classList.remove("open-popup");
    }, 1500);
  }

  showNewGameValidationMessage() {
    const viborita = this.formEncuesta.value.nuevoJuegoViborita;
    const buscaminas = this.formEncuesta.value.nuevoJuegoBuscaminas;
    const pinball = this.formEncuesta.value.nuevoJuegoPinball;
    if (!viborita && !buscaminas && !pinball) {
      this.validNewGame = 'Se debe elegir al menos una opción';
    } else {
      this.validNewGame = false;
    }
  }

  validateNewGame(): boolean {
    const viborita = this.formEncuesta.value.nuevoJuegoViborita;
    const buscaminas = this.formEncuesta.value.nuevoJuegoBuscaminas;
    const pinball = this.formEncuesta.value.nuevoJuegoPinball;
    if (!viborita && !buscaminas && !pinball) {
      return false;
    } 
    return true;
  }

}
