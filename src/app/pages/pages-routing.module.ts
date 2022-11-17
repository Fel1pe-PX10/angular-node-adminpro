import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';


const routes: Routes = [
  { path: 'dashboard', 
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: DashboardComponent, data: {titulo: 'dashboard'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'ajustes de cuenta'}},
      { path: 'grafica1', component: Grafica1Component, data: {titulo: 'graficas'} },
      { path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de Usuario'} },
      { path: 'progress', component: ProgressComponent, data: {titulo: 'progress'} },
      { path: 'promesas', component: PromesasComponent, data: {titulo: 'promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: {titulo: 'operadores'} },
      { path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'busquedas'} },

      // Mantenimientos
      { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimientos Hospitales'} },
      { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento Médicos'} },
      { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Mantenimiento Médico'} },
      { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimientos Usuarios'} }
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
