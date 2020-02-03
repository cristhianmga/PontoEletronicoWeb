import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-minha-empresa',
  templateUrl: './minha-empresa.component.html',
  styleUrls: ['./minha-empresa.component.css']
})
export class MinhaEmpresaComponent extends BaseComponent {
  urlController = 'DadosContratacaoFuncionario';
  displayedColumns: string[] = ['Id','CPF','Nome','Acoes'];
  dataSource:MatTableDataSource<any> = new MatTableDataSource<any>();
  cadastro:FormGroup = new FormBuilder().group({
    razaoSocial:['algo'],
    cnpj:['algo cnpj']
  });
  ngOnInit() {
  }

}
