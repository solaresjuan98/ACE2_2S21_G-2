import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { SillaComponent } from './components/silla/silla.component';
import { TiemporealComponent } from './components/tiemporeal/tiemporeal.component';
import { MenorUsoComponent } from './graficas/menor-uso/menor-uso.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HorarioUsoComponent } from './graficas/horario-uso/horario-uso.component';
import { TiempoUsoComponent } from './graficas/tiempo-uso/tiempo-uso.component';
import { MayorUsoComponent } from './graficas/mayor-uso/mayor-uso.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'home/reportes',
    component: ReportesComponent
  },
  {
    path:'home/registroSilla',
    component: SillaComponent
  },
  {
    path:'home/tiempoReal',
    component: TiemporealComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  // Graficas
  {
    path: 'menorUso',
    component: MenorUsoComponent
  },
  {
    path: 'mayorUso',
    component: MayorUsoComponent
  },
  {
    path: 'horarioUso',
    component: HorarioUsoComponent
  },
  {
    path: 'historialTiempoUso',
    component: TiempoUsoComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
