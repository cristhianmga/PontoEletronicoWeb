import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BaseComponent } from '../base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationDataTable } from '../base/pagination-data-table.component';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent extends PaginationDataTable {
  urlController = 'registroPonto';
  displayedColumns: string[] = ['Data','HoraEntrada','HoraSaida','Acoes'];
  filtro:any = null;
  carregarInicio = false;
  dataSource:MatTableDataSource<any> = new MatTableDataSource<any>();
  funcionario:FormGroup = new FormBuilder().group({
    cpf:[null]
  });
  empresa:FormGroup = new FormBuilder().group({
    empresaId:[null]
  });
  listaEmpresas:any[] = [];
  ngOnInit() {
    this.service.ObterEmpresas().subscribe(data => {
      this.listaEmpresas = data;
    })
    this.empresa.get('empresaId').valueChanges.subscribe(valor => {
      this.filtro = {empresaId:valor};
      this.recarregarPage(this.urlController,this.filtro);
    })
  }



}
