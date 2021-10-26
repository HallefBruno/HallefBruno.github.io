import { Injectable } from '@angular/core';
import { Cliente } from './clientes/clientes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  httpApiUrl: string = environment.apiUrl;

  constructor(private method: HttpClient) { }

  salvar(cliente:Cliente) : Observable<Cliente> {
    return this.method.post<Cliente>(`${this.httpApiUrl}/clientes`,cliente);
  }

  atualizar(cliente:Cliente) : Observable<any> {
    return this.method.put<any>(`${this.httpApiUrl}/clientes/${cliente.id}`,cliente);
  }

  getCliente() : Cliente {
    let cliente: Cliente = new Cliente();
    return cliente;
  }

  gitListClientes() : Observable<Cliente[]> {
    return this.method.get<Cliente[]>(`${this.httpApiUrl}/clientes/todos`);
  }

  getClienteById(id:number) : Observable<Cliente> {
    return this.method.get<Cliente>(`${this.httpApiUrl}/clientes/porId/${id}`);
  }

  delete(id: number) : Observable<any> {
    return this.method.delete<any>(`${this.httpApiUrl}/clientes/excluir/${id}`);
  }


}
