import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxCurrencyModule } from "ngx-currency";

import { ServicoPrestadoRoutingModule } from './servico-prestado-routing.module';
import { ServicoPrestadoListaComponent } from './servico-prestado-lista/servico-prestado-lista.component';
import { ServicoPrestadoFormComponent } from './servico-prestado-form/servico-prestado-form.component';

@NgModule({
  declarations: [
    ServicoPrestadoListaComponent,
    ServicoPrestadoFormComponent
  ],
  imports: [
    CommonModule,
    ServicoPrestadoRoutingModule,
    FormsModule,
    RouterModule,
    NgxCurrencyModule
  ],
  exports: [
    ServicoPrestadoListaComponent,
    ServicoPrestadoFormComponent
  ]
})
export class ServicoPrestadoModule { }
