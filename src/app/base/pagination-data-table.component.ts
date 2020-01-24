import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BaseComponent } from './base.component';
import { Observable } from 'rxjs';
import { Empresa } from '../Entity/Empresa.model';
import { Paginacao } from '../Entity/Paginacao.model';

@Component({
    selector: 'pagination-data-table',
    template:'<mat-paginator [pageSizeOptions]="[5, 10, 20]" (page)="trocaPage()" [length]="maxitens" showFirstLastButtons></mat-paginator>'})
export class PaginationDataTable extends BaseComponent{
    maxitens:number = 0;
    @Input() url:string;
    dataSource = new MatTableDataSource<any>();;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    ngOnInit(){
        this.primeiraConexao();
    }

    primeiraConexao(){
        this.service.ObterTodosPaginado(this.url,new Paginacao(this.paginator.pageIndex,10,"","")).subscribe(x => {
            this.dataSource = new MatTableDataSource(x.content);
            this.paginator.length = x.totalElements;
        });
        this.dataSource.paginator = this.paginator;
    }

    trocaPage(){
        console.log(this.paginator.pageIndex);
    }
}