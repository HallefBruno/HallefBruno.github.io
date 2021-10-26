import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ServicoPrestado } from './servico-prestado/ServicoPrestado';
import { Observable } from 'rxjs';
import { ServicoPrestadoBuscar } from './servico-prestado/servico-prestado-lista/ServicoPrestadoBuscar';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  httpApiUrl: string = environment.apiUrl;

  constructor(private method:HttpClient) { }

  salvar(servicoPrestado:ServicoPrestado) : Observable<ServicoPrestado> {
    return this.method.post<ServicoPrestado>(`${this.httpApiUrl}/servicos-prestados`,servicoPrestado);
  }

  atualizar(servicoPrestado:ServicoPrestadoBuscar) : Observable<any> {
    return this.method.put<any>(`${this.httpApiUrl}/servicos-prestados/${servicoPrestado.id}`,servicoPrestado);
  }

  filtrarServicoPrestado(nomeCliente: string, dataServicoPrestado: any) : Observable<ServicoPrestadoBuscar[]> {
    let params = new HttpParams();
    if(nomeCliente) {
      params = params.set('nomeCliente', nomeCliente);
    }
    if(dataServicoPrestado) {
      params = params.set('dataServicoPrestado', dataServicoPrestado);
    }
    return this.method.get<ServicoPrestadoBuscar[]>(`${this.httpApiUrl}/servicos-prestados/buscarPorNomeData`,{params: params});
  }

  getServicoPrestadoById(id:number) : Observable<ServicoPrestadoBuscar> {
    return this.method.get<ServicoPrestadoBuscar>(`${this.httpApiUrl}/servicos-prestados/buscarPorId/${id}`);
  }

  delete(id: number) : Observable<any> {
    return this.method.delete<any>(`${this.httpApiUrl}/servicos-prestados/excluir/${id}`);
  }
}
