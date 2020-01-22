import { Component, OnInit } from '@angular/core';
import { PadraoService } from '../service/padrao-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray } from '@angular/forms';
import { bObservableUsuario } from '../util/observable-util';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({template:''})
export class BaseComponent implements OnInit {

  	constructor(public service:PadraoService,public router:Router,public activatedRoute:ActivatedRoute,public obsUsuario:bObservableUsuario) { }
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

  
	touchAll(formGroup: FormGroup | FormArray, func = 'markAsDirty', opts = { onlySelf: false }): void {
		Object.keys(formGroup.controls).map((key, index) => {
			let obj = formGroup.controls[key];
			if (obj instanceof FormGroup || obj instanceof FormArray)
				this.touchAll(obj, func, opts);
			else
				obj[func](opts);
		});
	}

	public limpaCaracterEspecial(campo: string): string {
        if (campo != null)
            return campo.replace(/[^0-9A-Za-z]/g, '');
        else return '';
    }
}
