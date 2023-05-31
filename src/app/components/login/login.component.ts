import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string= "";
  password:string = "";

  constructor(private auth:AuthService) {}

  login()
  {
    this.auth.login(this.email, this.password);
  }

  insertarUsuario(usuario:string)
  {
    switch(usuario)
    {
      case "invitado":
        this.email = "invitado@invitado.com";
        this.password = "invitado";
        break;
      case "administrador":
        this.email = "admin@admin.com";
        this.password = "administrador";
        break;
    }
  }


}
