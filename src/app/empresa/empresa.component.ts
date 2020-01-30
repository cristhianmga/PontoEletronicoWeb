import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationDataTable } from '../base/pagination-data-table.component';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent extends PaginationDataTable{
  urlController = 'Empresa';
  displayedColumns: string[] = ['Id','CNPJ','RazaoSocial','Acoes'];
  dataSource:MatTableDataSource<any> = new MatTableDataSource<any>();

  ngOnInit() {
  }

  
}
