import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoBuscar } from './ServicoPrestadoBuscar';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

  nomeCliente:string;
  dataServicoPrestado:Date;
  listarServicoPrestado: ServicoPrestadoBuscar;
  listaServicosPrestados: any;
  spSelecionadoDelete: ServicoPrestadoBuscar;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private servicoPrestadoService: ServicoPrestadoService,
    private router : Router,
    private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.consultar();
  }

  consultar() {
    this.servicoPrestadoService.filtrarServicoPrestado(this.nomeCliente, this.dataServicoPrestado)
      .subscribe(data => {
        this.listaServicosPrestados = data;
    }, error => {
      console.error(error);
    });
  }

  novoCadastro() {
    this.router.navigate(['/servico-prestado/form']);
  }

  preparaDelecao(servicoPrestadoBuscar: ServicoPrestadoBuscar) {
    this.spSelecionadoDelete = servicoPrestadoBuscar;
  }

  deletarServico() {
    this.servicoPrestadoService.delete(this.spSelecionadoDelete.id)
    .subscribe(response => {
      this.mensagemSucesso = "Cliente excluido com sucesso!"
      this.ngOnInit();
      console.log(response);
    }, erro => {
      this.mensagemErro = "Erro ao excluir o cliente!"
      console.error(erro);
    })
  }

}
