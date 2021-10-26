import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';

const routes: Routes = [
  {
    path: 'clientes',component: LayoutComponent,
    children: [
      { path: 'form', component: ClientesFormComponent, canActivate : [AuthGuard] },
      { path: 'form/:id', component: ClientesFormComponent, canActivate : [AuthGuard]},
      { path: 'lista', component: ClientesListaComponent, canActivate : [AuthGuard]},
      { path: '', redirectTo: '/clientes/lista', pathMatch: 'full'}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
