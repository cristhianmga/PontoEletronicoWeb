import { Component, OnInit, ViewChild, Input, Output, EventEmitter, Inject } from '@angular/core';
import { BaseComponent } from './base.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'dialog-confirmation',
    template:`
    <h1 mat-dialog-title>{{titulo | titlecase}}</h1>
    <div mat-dialog-content>
      <p>Deseja realmente {{acao}} esse item?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Não</button>
      <button mat-button (click)="onOkClick()" cdkFocusInitial>Sim</button>
    </div>
    `})
export class DialogConfirmation{
    constructor(
      public dialogRef: MatDialogRef<DialogConfirmation>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
    @Input() titulo:string = 'excluir';
    @Input() acao:string = 'excluir';

    onNoClick(){
        this.dialogRef.close('no');
    }
    onOkClick(){
        this.dialogRef.close('ok');
    }
}