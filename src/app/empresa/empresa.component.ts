import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { MatPaginator } from '@angular/material/paginator';
import { Empresa } from '../Entity/Empresa.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent extends BaseComponent {

  displayedColumns: string[] = ['Id','CNPJ','RazaoSocial'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Empresa>([]);;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
