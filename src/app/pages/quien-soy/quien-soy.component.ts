import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent {

  miPerfil: any = null;
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('https://api.github.com/users/biancacasetta')
      .subscribe((res: any) => {
        this.miPerfil = res;
      });
  }

}
