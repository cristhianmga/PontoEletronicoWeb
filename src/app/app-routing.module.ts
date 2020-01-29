import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './autenticacao/auth-guard';
import { LoginComponent } from './Login/Login.component';
import { PaginaInicialComponent } from './PaginaInicial/PaginaInicial.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { AdicionarEditarEmpresaComponent } from './empresa/crud/empresa-crud/adicionar-editar-empresa/adicionar-editar-empresa.component';
import { VisualizarEmpresaComponent } from './empresa/crud/empresa-crud/visualizar-empresa/visualizar-empresa.component';


const routes: Routes = [
	
  	{ path: '', canActivate: [AuthGuard],component: PaginaInicialComponent },
  	{ path: 'login', component: LoginComponent },
  	{ path: 'empresa', canActivate:[AuthGuard], children:[
    	{path:'',component:EmpresaComponent},
    	{path:'cadastrar',component:AdicionarEditarEmpresaComponent},
    	{path:'editar/:id',component:AdicionarEditarEmpresaComponent},
    	{path:'visualizar',component:VisualizarEmpresaComponent},
  	]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
