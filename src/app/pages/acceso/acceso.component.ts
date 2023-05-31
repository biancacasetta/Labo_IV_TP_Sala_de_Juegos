import { Component } from '@angular/core';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent {


  main: any;

  ngOnInit()
  {
    this.main = document.querySelector(".main");
  }

  slideLeft()
  {
    this.main.classList.add("right-panel-active");
  }

  slideRight()
  {
    this.main.classList.remove("right-panel-active");
  }

}
