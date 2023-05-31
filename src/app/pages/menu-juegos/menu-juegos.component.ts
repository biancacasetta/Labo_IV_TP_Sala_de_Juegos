import { Component, OnInit, ElementRef } from '@angular/core';
import VanillaTilt from "vanilla-tilt";

@Component({
  selector: 'app-menu-juegos',
  templateUrl: './menu-juegos.component.html',
  styleUrls: ['./menu-juegos.component.css']
})
export class MenuJuegosComponent implements OnInit{

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {

    VanillaTilt.init(
      this.elementRef.nativeElement.querySelectorAll(".card"), { max: 20, speed: 400, scale: 1.05 });
    }
}
