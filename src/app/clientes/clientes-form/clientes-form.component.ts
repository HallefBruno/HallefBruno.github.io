import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../clientes';
import { FormControl } from '@angular/forms';
import { ClientesService } from 'src/app/clientes.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  alertSucesso: boolean = false;
  errors: [] = [];
  id: number;
  constructor(
    private service : ClientesService,
    private router : Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if(this.id > 0) {
      this.service.getClienteById(this.id).subscribe(data=>{
        this.cliente = data;
      }, error => {
        console.error(error);
      });
    }
  }

  onSubmit() {
    if(this.id) {
      this.service.atualizar(this.cliente).subscribe(data=>{
        this.alertSucesso = true;
        this.errors = [];
      },
        errorResponse => {
        this.errors = errorResponse.error.errors;
        this.alertSucesso = false;
      });
      return;
    }
    this.service.salvar(this.cliente)
    .subscribe(data => {
      this.cliente = data;
      this.alertSucesso = true;
      this.errors =[];
    }, errorResponse => {
      this.errors = errorResponse.error.errors;
      this.alertSucesso = false;
    })
  }

  irParaListagem() {
    this.router.navigate(['/clientes/lista']);
  }

  getClientePorId() {
    this.service.getClienteById(1).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
