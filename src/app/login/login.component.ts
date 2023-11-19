import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../modelos/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLogin = true;
  loginForm: FormGroup;
  personaForm: FormGroup;
  selectedFile: File | undefined;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });

    this.personaForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      image: ['', Validators.required]
    });
  }

  regresar() {
    this.isLogin = true;
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginService.login(this.loginForm.value.username.toString(), this.loginForm.value.password.toString())
      .subscribe(
        (data: User) => {
          this.loginService.usuario = new User(data.id, data.username, data.image)
          localStorage.setItem("usuario", JSON.stringify(this.loginService.usuario))
          this.loginService.isLogged = true
          this.router.navigateByUrl("/dashboard");
        }, (response: HttpErrorResponse) => {
          alert("Las credenciales ingresadas son incorrectas")
        },
      );
  }

  registrar() {
    this.isLogin = false;
  }

  guardar() {
    if (this.personaForm.invalid) {
      return;
    }

    if (this.selectedFile) {

      const formData = new FormData();

      formData.append('file', this.selectedFile);

      this.loginService.guardarPersona(this.personaForm.value.username.toString(),
        this.personaForm.value.email.toString(),
        this.personaForm.value.password.toString(),
        formData)
        .subscribe(
          (data: any) => {
            alert("Registro creado")
            this.isLogin = true
          }, (response: HttpErrorResponse) => {
            alert("error ")
          },
        );
    }
  }

  subirArchivo(event: any) {
    this.selectedFile = event.target.files[0];
  }
}

