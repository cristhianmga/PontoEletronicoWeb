import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BaseComponent } from './base.component';
import { Observable } from 'rxjs';
import { Empresa } from '../Entity/Empresa.model';
import { Paginacao } from '../Entity/Paginacao.model';

@Component({
    selector: 'pagination-data-table',
    template:'<mat-paginator [pageSizeOptions]="[5, 10, 20]" (page)="trocaPage($event)" [length]="maxitens" showFirstLastButtons></mat-paginator>'})
export class PaginationDataTable extends BaseComponent{
    maxitens:number = 0;
    @Input() dataSource:MatTableDataSource<any> = new MatTableDataSource<any>();
    @Input() url:string;
    @Output() dataSourceChange: EventEmitter<any> = new EventEmitter<MatTableDataSource<any>>(false)
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


    ngOnInit(){
        this.paginator.pageSize = 5;
        this.primeiraConexao();
    }

    primeiraConexao(){
        this.service.ObterTodosPaginado(this.url,new Paginacao(this.paginator.pageIndex,this.paginator.pageSize,"","")).subscribe(x => {
            this.dataSource = new MatTableDataSource(x.content);
            this.maxitens = x.totalElements;
            
            this.dataSourceChange.emit(this.dataSource);
        });
    }

    trocaPage(event){
        this.service.ObterTodosPaginado(this.url,new Paginacao(event.pageIndex,event.pageSize,"","")).subscribe(x => {
            this.dataSource = new MatTableDataSource(x.content);
            this.maxitens = x.totalElements;
            
            this.dataSourceChange.emit(this.dataSource);
        });
    }
}