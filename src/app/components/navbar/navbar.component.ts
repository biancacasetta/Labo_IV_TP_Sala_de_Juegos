import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  usuario:any;
  
  constructor(public auth: AuthService) {}

  ngOnInit()
  {
    this.auth.getLoggedUser().subscribe((usuario)=>{
      //@ts-ignore
      this.usuario = usuario.email.split('@')[0];
    })
  }

}
