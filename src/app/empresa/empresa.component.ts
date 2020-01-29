import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent extends BaseComponent{
  urlController = 'Empresa';
  displayedColumns: string[] = ['Id','CNPJ','RazaoSocial','Acoes'];
  dataSource:MatTableDataSource<any> = new MatTableDataSource<any>();

  ngOnInit() {
  }

  
}
