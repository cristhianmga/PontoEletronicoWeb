import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BaseComponent } from './base.component';
import { Paginacao } from '../Entity/Paginacao.model';
import { DialogConfirmation } from './dialog-confirmation.component';

@Component({
    selector: 'pagination-data-table',
    template:'<mat-paginator [pageSizeOptions]="[5, 10, 20]" (page)="trocaPage($event)" [length]="maxitens" showFirstLastButtons></mat-paginator>'})
export class PaginationDataTable extends BaseComponent{
    maxitens:number = 0;
    @Input() dataSource:MatTableDataSource<any> = new MatTableDataSource<any>();
    @Input() url:string;
    @Output() dataSourceChange: EventEmitter<any> = new EventEmitter<MatTableDataSource<any>>(false)
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @Input() filtro:any = null;
    @Input() carregarInicio:boolean = true;


    ngOnInit(){
        this.paginator.pageSize = 5;
        if(this.carregarInicio){
            this.primeiraConexao();
        }
    }

    primeiraConexao(filtro:any = null){
        this.ObsBlockPanel.setBlockedPanel(true);
        this.service.ObterTodosPaginado(this.url,new Paginacao(this.paginator.pageIndex,this.paginator.pageSize,"",""),this.filtro != null ? this.filtro : filtro).subscribe(x => {
            this.dataSource = new MatTableDataSource(x.content);
            this.maxitens = x.totalElements;
            this.dataSourceChange.emit(this.dataSource);
        },error => this.ObsBlockPanel.setBlockedPanel(false),() => this.ObsBlockPanel.setBlockedPanel(false));
    }

    trocaPage(event){
        this.ObsBlockPanel.setBlockedPanel(true);
        this.service.ObterTodosPaginado(this.url,new Paginacao(event.pageIndex,event.pageSize,"",""),this.filtro).subscribe(x => {
            this.dataSource = new MatTableDataSource(x.content);
            this.maxitens = x.totalElements;
            this.dataSourceChange.emit(this.dataSource);
        },error => this.ObsBlockPanel.setBlockedPanel(false),() => this.ObsBlockPanel.setBlockedPanel(false));
    }

    recarregarPage(url,filtro:any = null){
        this.service.ObterTodosPaginado(url,new Paginacao(0,5,"",""),this.filtro).subscribe(x => {
            this.dataSource = new MatTableDataSource(x.content);
            this.maxitens = x.totalElements;
            this.dataSourceChange.emit(this.dataSource);
        },error => this.ObsBlockPanel.setBlockedPanel(false),() => this.ObsBlockPanel.setBlockedPanel(false));
    }

    openDialog(id,url): void {
        const dialogRef = this.dialog.open(DialogConfirmation, {
          width: '350px'
        });
        dialogRef.afterClosed().subscribe(x => {
            if(x == 'ok'){
                this.deletar(id,url);
            }
        });
      }

    deletar(id,url){
        this.ObsBlockPanel.setBlockedPanel(true);
        this.service.Deletar('empresa',id).subscribe(x => this.recarregarPage(url));
    }
    

	editar(id){
		this.router.navigate(['./editar',id],{relativeTo:this.activatedRoute})
    }
    
}