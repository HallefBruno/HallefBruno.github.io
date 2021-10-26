import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username:string;
  password:string;
  errors: []=[];
  mensagemSucesso:string;
  labelCadastrando: boolean;

  constructor(
    private formsModule: FormsModule,
    private reactiveFormsModule: ReactiveFormsModule,
    private router: Router,
    private authService: AuthService) { }

  onSubmit() {
    this.authService.tentarLogar(this.username, this.password)
      .subscribe(response => {
        const accessToken = JSON.stringify(response);
        localStorage.setItem("access_token",accessToken);
        this.router.navigate(['/home'])
      }, objectError => {
        this.errors = objectError.error.errors;
      })
  }

  cadastrando($event:any) {
    $event.preventDefault();
    this.labelCadastrando = true;
  }

  cancelaCadastro() {
    this.labelCadastrando = false;
  }

  cadastrar() {
    const usuario : Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;

    this.authService.salvar(usuario)
      .subscribe(data => {
        this.labelCadastrando = false;
        this.mensagemSucesso = "Novo usuário cadastrado com sucesso!";
        this.username = "";
        this.password = "";
        this.errors = [];
      }, objectError => {
        this.errors = objectError.error.errors;
        this.mensagemSucesso = "";
        console.log(objectError);
      })
  }

}
