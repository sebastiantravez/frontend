import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../modelos/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuario: User
  imagen: any

  constructor(private loginService: LoginService) {
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.imagen = "http://localhost:8080/" + this.usuario.image
  }
  
  ngOnInit(): void {
    this.loginService.imagen(this.usuario.image).subscribe(data => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagen = reader.result;
      };
      reader.readAsDataURL(data);
    }, error => {
      console.error('Error al obtener la imagen', error);
    })
  }

  closeSession() {

  }
}
