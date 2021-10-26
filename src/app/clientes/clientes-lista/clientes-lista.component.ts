import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../clientes';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionadoDelete: Cliente;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private service : ClientesService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.service.gitListClientes().subscribe(data => {
      this.clientes = data;
    }, error => {
      console.log(error);
    });
  }

  novoCadastro() {
    this.router.navigate(['/clientes/form']);
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionadoDelete = cliente;
  }

  deletarCliente() {
    this.service.delete(this.clienteSelecionadoDelete.id)
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
