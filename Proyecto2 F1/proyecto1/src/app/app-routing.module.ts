import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { SillaComponent } from './components/silla/silla.component';
import { TiemporealComponent } from './components/tiemporeal/tiemporeal.component';
import { MenorUsoComponent } from './graficas/menor-uso/menor-uso.component';
import { HorarioUsoComponent } from './graficas/horario-uso/horario-uso.component';
import { TiempoUsoComponent } from './graficas/tiempo-uso/tiempo-uso.component';
import { MayorUsoComponent } from './graficas/mayor-uso/mayor-uso.component';
import { RegistroPesoComponent } from './graficas/registro-peso/registro-peso.component';

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
  // Graficas
  {
    path: 'home/menorUso',
    component: MenorUsoComponent
  },
  {
    path: 'home/mayorUso',
    component: MayorUsoComponent
  },
  {
    path: 'home/horarioUso',
    component: HorarioUsoComponent
  },
  {
    path: 'home/historialTiempoUso',
    component: TiempoUsoComponent
  },
  {
    path: 'home/mi-peso',
    component: RegistroPesoComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
