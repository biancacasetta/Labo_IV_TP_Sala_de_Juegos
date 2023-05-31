import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  email:string = "";
  password:string = "";

  constructor(private auth:AuthService) {}

  registrar()
  {
    this.auth.registrar(this.email, this.password);
  }

}
