import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clientes/clientes';
import { ClientesService } from 'src/app/clientes.service';
import { ServicoPrestado } from '../ServicoPrestado';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicoPrestadoBuscar } from '../servico-prestado-lista/ServicoPrestadoBuscar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css'],
})
export class ServicoPrestadoFormComponent implements OnInit {
  clientes: Cliente[] = [];
  servicoPrestado: ServicoPrestado;
  servicoPrestadoBuscar: ServicoPrestadoBuscar;
  alertSucesso: boolean;
  listErros: [] = [];
  id: number;

  constructor(
    private clientesService: ClientesService,
    private servicoPrestadoService: ServicoPrestadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.servicoPrestado = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if(this.id > 0) {
      this.servicoPrestadoService.getServicoPrestadoById(this.id).subscribe(
        (data) => {
          this.servicoPrestadoBuscar = data;
          this.servicoPrestado.id = this.servicoPrestadoBuscar.id;
          this.servicoPrestado.clienteId = this.servicoPrestadoBuscar.cliente.id;
          this.servicoPrestado.descricao = this.servicoPrestadoBuscar.descricao;
          this.servicoPrestado.preco = this.servicoPrestadoBuscar.valor;
          this.servicoPrestado.dataServicoPrestado = this.servicoPrestadoBuscar.dataServicoPrestado

        },
        (errors) => {
          console.error(errors);
        }
      );
    }

    this.clientesService.gitListClientes().subscribe(
      (data) => {
        this.clientes = data;
      },
      (errors) => {
        console.error(errors);
      }
    );
  }

  onSubmit() {
    if (this.id) {

      this.servicoPrestadoBuscar.id = this.servicoPrestado.id;
      this.servicoPrestadoBuscar.cliente.id = this.servicoPrestado.clienteId;
      this.servicoPrestadoBuscar.descricao = this.servicoPrestado.descricao;
      this.servicoPrestadoBuscar.valor = this.servicoPrestado.preco;
      this.servicoPrestadoBuscar.dataServicoPrestado = this.servicoPrestado.dataServicoPrestado;

      this.servicoPrestadoService.atualizar(this.servicoPrestadoBuscar).subscribe(
        (data) => {
          this.alertSucesso = true;
          this.listErros = [];
          this.servicoPrestado = new ServicoPrestado();
          console.log(data);
        },
        (error) => {
          this.listErros = error.error.errors;
          console.error(this.servicoPrestado);
        }
      );
      return;
    }

    this.servicoPrestadoService.salvar(this.servicoPrestado).subscribe(
      (data) => {
        this.alertSucesso = true;
        this.listErros = [];
        this.servicoPrestado = new ServicoPrestado();
        console.log(data);
      },
      (error) => {
        this.listErros = error.error.errors;
        console.error(this.servicoPrestado);
      }
    );
  }

  irParaListagem() {
    this.router.navigate(['/servico-prestado/lista']);
  }

  stringToDate(data: any) {
    var st = data;
    var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    var dt = new Date(st.replace(pattern, '$3-$2-$1')).toISOString();
    return dt.substring(0, dt.indexOf('T'));
  }
}
