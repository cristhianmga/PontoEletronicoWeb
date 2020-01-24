import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { MatPaginator } from '@angular/material/paginator';
import { Empresa } from '../Entity/Empresa.model';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationDataTable } from '../base/pagination-data-table.component';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent extends PaginationDataTable implements AfterViewInit{
  urlController = 'Empresa';
  displayedColumns: string[] = ['Id','CNPJ','RazaoSocial'];
  @ViewChild(PaginationDataTable,{static:false}) pagination;

  ngOnInit() {
      
  }
  ngAfterViewInit(){
    this.dataSource = this.pagination.dataSource;
  }

}
