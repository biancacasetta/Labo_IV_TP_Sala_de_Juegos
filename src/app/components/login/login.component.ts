import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() loginExitoso: EventEmitter<void> = new EventEmitter<void>();
 
  //@ts-ignore
  formLogin: FormGroup;
  passwordTouched: boolean = false;
  emailTouched: boolean = false;
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private auth:AuthService, private formBuilder: FormBuilder)
  {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required]]});
  }

  

  async login()
  {
    this.passwordTouched = true;
    this.emailTouched = true;

    if (this.formLogin.valid) {
      await this.auth.login(this.formLogin.value.email, this.formLogin.value.password).then( () => {

        this.loginExitoso.emit();
        this.passwordTouched = false;
        this.emailTouched = false;
      })
    }
  }

  insertarUsuario(email:string, password:string)
  {
   
    this.formLogin.patchValue({
      email: email,
      password: password
    });
      
  }

}
