import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Empresa } from 'src/app/Entity/Empresa.model';

@Component({
  selector: 'app-minha-empresa',
  templateUrl: './minha-empresa.component.html',
  styleUrls: ['./minha-empresa.component.css']
})
export class MinhaEmpresaComponent extends BaseComponent {
  urlController = 'DadosContratacaoFuncionario';
  displayedColumns: string[] = ['Id','CPF','Nome','Acoes'];
  dataSource:MatTableDataSource<any> = new MatTableDataSource<any>();
  empresa: Empresa;
  ngOnInit() {
		this.obsUsuario.getValue.forEach(usuario => {
			if(usuario && usuario != ""){
				this.empresa = new Empresa(usuario.empresa.cnpj,usuario.empresa.razaoSocial,usuario.empresa.id);
			}
		});
  }

  IrParaAdicionarFuncionario(){
    this.router.navigate(['./funcionario/minha-empresa']);
  }
  IrParaAdicionarLocalizacao(){
    this.router.navigate(['./empresa/localizacao']);
  }

}
