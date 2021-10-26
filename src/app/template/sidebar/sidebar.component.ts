import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  usuarioLogado:string;

  constructor(private authServce: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authServce.getUsuarioLogado();
  }

  logout() {
    this.authServce.encerrarSessao();
    this.router.navigate(['/login'])
  }

}
