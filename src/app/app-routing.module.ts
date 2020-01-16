import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './autenticacao/auth-guard';
import { LoginComponent } from './Login/Login.component';
import { PaginaInicialComponent } from './PaginaInicial/PaginaInicial.component';


const routes: Routes = [

  
  { path: '', canActivate: [AuthGuard],component: PaginaInicialComponent },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
