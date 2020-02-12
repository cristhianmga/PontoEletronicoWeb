import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from '../base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationDataTable } from '../base/pagination-data-table.component';
// the `default as` syntax.
import * as _moment from 'moment';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';

const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class MeuPerfilComponent extends BaseComponent {
	urlController = 'registroPonto';
	displayedColumns: string[] = ['Data','HoraEntrada','HoraSaida','Saldo','Acoes'];
	listaMeses:any = ['Janeiro','Fevereiro','Março','Abril','Maio',
					'Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
	dataSource:any[] = [];
	funcionario:FormGroup = new FormBuilder().group({
		cpf:[null],
		id:[null]
	});
	empresa:FormGroup = new FormBuilder().group({
		empresaId:[null,Validators.required],
		data:[moment(),Validators.required]
	});
	listaEmpresas:any[] = [];
	ngOnInit() {
		this.service.ObterEmpresas().subscribe(data => {
			this.listaEmpresas = data;
		})
		this.obsUsuario.getValue.subscribe(valor => {
			if(valor){
				this.funcionario.patchValue(valor.funcionario);
			}
		});
	}

	chosenYearHandler(normalizedYear: Moment) {
	  const ctrlValue = this.empresa.get('data').value;
	  ctrlValue.year(normalizedYear.year());
	  this.empresa.get('data').setValue(ctrlValue);
	}
  
	chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
	  const ctrlValue = this.empresa.get('data').value;
	  ctrlValue.month(normalizedMonth.month());
	  this.empresa.get('data').setValue(ctrlValue);
	  datepicker.close();
	}

	buscarPonto(){
		if(this.empresa.valid){
			var filtro = 
			{
				FuncionarioId:this.funcionario.get('id').value,
				EmpresaId:this.empresa.get('empresaId').value,
				mes:this.empresa.get('data').value._d.getMonth() + 1,
				ano:this.empresa.get('data').value._d.getFullYear()
			}
			this.service.ObterPonto(filtro).subscribe(x => this.dataSource = x);
		}else{
			this.touchAll(this.empresa);
		}
	}
}
