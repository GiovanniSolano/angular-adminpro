import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { Router, RouterModule, Routes } from '@angular/router';


const childRoutes: Routes = [
    {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
    {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
    {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Gráficas'}},
    {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Account-Settings'}},
    {path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Busquedas'}},
    {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
    {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
    {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'}},
    // {path: '', redirectTo: '/dashboard', pathMatch: 'full'},


    // Mantenimientos
    {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios de la aplicación'}, canActivate: [AdminGuard]},
    {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Hospitales de la aplicación'}},
    {path: 'medicos', component: MedicosComponent, data: {titulo: 'Médicos de la aplicación'}},
    {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Editar médico'}},

]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
