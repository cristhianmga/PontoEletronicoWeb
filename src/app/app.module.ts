import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginaInicialComponent } from './PaginaInicial/PaginaInicial.component';
import { LoginComponent } from './Login/Login.component';
import { AuthGuard } from './autenticacao/auth-guard';
import { PadraoService } from './service/padrao-service';
import { bObservableUsuario } from './util/observable-util';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule ,
    FormsModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [AuthGuard,PadraoService,bObservableUsuario,
    {provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
