import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './autenticacao/auth-guard';
import { LoginComponent } from './Login/Login.component';
import { PaginaInicialComponent } from './PaginaInicial/PaginaInicial.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { AdicionarEditarEmpresaComponent } from './empresa/crud/adicionar-editar-empresa/adicionar-editar-empresa.component';
import { VisualizarEmpresaComponent } from './empresa/crud/visualizar-empresa/visualizar-empresa.component';
import { MinhaEmpresaComponent } from './empresa/minha-empresa/minha-empresa.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { LocalicazaoComponent } from './empresa/localicazao/localicazao.component';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';


const routes: Routes = [
	
  	{ path: '', canActivate: [AuthGuard],component: PaginaInicialComponent },
  	{ path: 'login', component: LoginComponent },
  	{ path: 'empresa', canActivate:[AuthGuard], children:[
    	{path:'',component:EmpresaComponent},
    	{path:'cadastrar',component:AdicionarEditarEmpresaComponent},
    	{path:'editar/:id',component:AdicionarEditarEmpresaComponent},
		{path:'visualizar/:id',component:VisualizarEmpresaComponent},
		{path:'minha-empresa',component:MinhaEmpresaComponent},
		{path:'localizacao',component:LocalicazaoComponent},

  	]},
  	{ path: 'funcionario', canActivate:[AuthGuard], children:[
    	{path:'minha-empresa',component:FuncionarioComponent},
    	{path:'meu-perfil',component:MeuPerfilComponent}
  	]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
