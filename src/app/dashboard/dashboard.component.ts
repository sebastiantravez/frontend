import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../modelos/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  usuario: User
  imagen: any

  constructor(private loginService: LoginService) {
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.imagen = "http://localhost:8080/" + this.usuario.image
  }
}
