import { Component, OnInit } from '@angular/core';
import { PadraoService } from '../service/padrao-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray } from '@angular/forms';
import { bObservableUsuario, ObservableBlockPanel } from '../util/observable-util';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SpinnerComponent } from './spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({template:''})
export class BaseComponent implements OnInit {
	acao:string;
	controllerName:string;
	obj: any;
	afterLoad(optional1?: any, optional2?: any) { };
    dateValidation: RegExp = /(((\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2}))([+-](\d{2})\:(\d{2}))?Z?z?)/;
	

  	constructor(public service:PadraoService,public router:Router,public activatedRoute:ActivatedRoute,public obsUsuario:bObservableUsuario,public ObsBlockPanel:ObservableBlockPanel,private spinner: SpinnerComponent,private _snackBar: MatSnackBar) { }
	verificarToken() {
		const helper = new JwtHelperService();
		var tempo;
		if (localStorage.getItem("token") != null) {
			try{
				tempo = helper.isTokenExpired(localStorage.getItem("token"));
				if (tempo) {
					localStorage.removeItem('token');
					this.router.navigate(['/login'])
				} 
			}
			catch(e){
				localStorage.removeItem('token');
				this.router.navigate(['/login'])
			}
		}else{
			localStorage.removeItem('token');
			this.router.navigate(['/login'])
		}
	}
	ngOnInit() {
		this.verificarToken();
	}

	
	openSnackBar(message: string, botao: string) {
		this._snackBar.open(message, botao, {
		  duration: 10000,
		  horizontalPosition:'right',
		  verticalPosition:'top'
		});
	}
  
	touchAll(formGroup: FormGroup | FormArray, func = 'markAsDirty', opts = { onlySelf: false }): void {
		Object.keys(formGroup.controls).map((key, index) => {
			let obj = formGroup.controls[key];
			if (obj instanceof FormGroup || obj instanceof FormArray)
				this.touchAll(obj, func, opts);
			else
				obj[func](opts);
		});
	}

	editar(id){
		this.router.navigate(['./editar',id],{relativeTo:this.activatedRoute})
	}

	voltar(){
		if(this.acao == 'cadastrar'){
			this.router.navigate(['../'],{relativeTo:this.activatedRoute});
		}else{
			this.router.navigate(['../../'],{relativeTo:this.activatedRoute});
		}
	}

    carregarEditar(){
		this.ObsBlockPanel.setBlockedPanel(true);
        this.activatedRoute.params.subscribe(params => {
			var id = params['id'];
            this.service.Obter(this.controllerName, id).subscribe(obj => {
                Object.keys(obj).forEach(key => {
                    obj[key] = this.dateValidation.test(obj[key]) ? new Date(obj[key]) : obj[key];
                });
                this.obj = obj;
                this.afterLoad();
            },
            err => {this.ObsBlockPanel.setBlockedPanel(false)},() => this.ObsBlockPanel.setBlockedPanel(false));

        });
    }

	public limpaCaracterEspecial(campo: string): string {
        if (campo != null)
            return campo.replace(/[^0-9A-Za-z]/g, '');
        else return '';
    }
}
