import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './login/Usuario';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpApiUrl: string = environment.apiUrl;
  tokenUrl: string = environment.apiAuthTk + environment.urlToken;
  appId: string = environment.clienteId;
  csk: string = environment.secret;
  jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(private method: HttpClient) { }

  obterToken() {
    const tokenString = localStorage.getItem("access_token");
    if(tokenString) {
      const token = JSON.parse(tokenString).access_token;
      return token
    }
    return null;
  }

  isAuthenticated():boolean {
    const token = this.obterToken();
    if(token) {
      const expired = this.jwtHelperService.isTokenExpired(token);
      return !expired;
    }
    return false;
  }

  encerrarSessao() {
    localStorage.removeItem("access_token");
  }

  getUsuarioLogado() {
    const token = this.obterToken();
    if(token) {
      const nomeUsuario = this.jwtHelperService.decodeToken(token).user_name;
      return nomeUsuario;
    }
    return null;
  }

  salvar(usuario : Usuario) : Observable<any> {
    return this.method.post<any>(`${this.httpApiUrl}/usuarios`,usuario);
  }
  tentarLogar(username: string, password: string) : Observable<any> {
    let params = new HttpParams();
      params = params.set('username', username);
      params = params.set('password', password);
      params = params.set('grant_type', 'password');
      const headers = {
        'Authorization': 'Basic ' + btoa(`${this.appId}:${this.csk}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    return this.method.post<any>(this.tokenUrl,params.toString(),{headers});
  }
}
