import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  @Output() registroExitoso: EventEmitter<void> = new EventEmitter<void>();

  passwordTouched: boolean = false;
  confirmPasswordTouched: boolean = false;
  emailTouched: boolean = false;
  formRegistro:FormGroup;
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private auth:AuthService, private formBuilder: FormBuilder)
  {
    this.formRegistro = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.min(6)]],
      recuperarPassword: ['', [Validators.required, Validators.min(6)]]},
      );
  }


  async registrar()
  {
    this.passwordTouched = true;
    this.confirmPasswordTouched = true;
    this.emailTouched = true;

    if(this.formRegistro.valid)
    {
      await this.auth.registrar(this.formRegistro.value.email, this.formRegistro.value.password).then( () => {
          this.auth.usuarioIngresado = true;
          this.registroExitoso.emit();
          this.passwordTouched = false;
          this.confirmPasswordTouched = false;
          this.emailTouched = false;
      });
    }
  }

}
