import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { SpinnerComponent } from './components/spinner/spinner.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat/'
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { SillaComponent } from './components/silla/silla.component';
import { TiemporealComponent } from './components/tiemporeal/tiemporeal.component';
import { MenorUsoComponent } from './graficas/menor-uso/menor-uso.component';
import { MayorUsoComponent } from './graficas/mayor-uso/mayor-uso.component';
import { MenuComponent } from './components/menu/menu.component';
import { ChartsModule } from 'ng2-charts';
import { HorarioUsoComponent } from './graficas/horario-uso/horario-uso.component';
import { TiempoUsoComponent } from './graficas/tiempo-uso/tiempo-uso.component';
import { RegistroPesoComponent } from './graficas/registro-peso/registro-peso.component';
import { ProductividadComponent } from './graficas/productividad/productividad.component';
import { TareaComponent } from './components/tarea/tarea.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SpinnerComponent,
    RegisterComponent,
    HomeComponent,
    ReportesComponent,
    SillaComponent,
    TiemporealComponent,
    MenorUsoComponent,
    MayorUsoComponent,
    MenuComponent,
    HorarioUsoComponent,
    TiempoUsoComponent,
    RegistroPesoComponent,
    ProductividadComponent,
    TareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    ChartsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
