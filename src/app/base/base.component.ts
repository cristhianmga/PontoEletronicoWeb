import { Component, OnInit } from '@angular/core';
import { PadraoService } from '../service/padrao-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray } from '@angular/forms';
import { bObservableUsuario } from '../util/observable-util';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Md5} from 'ts-md5/dist/md5';

@Component({template:''})
export class BaseComponent implements OnInit {

  	constructor(public service:PadraoService,public router:Router,public activatedRoute:ActivatedRoute,public obsUsuario:bObservableUsuario) { }
	verificarToken() {
		const helper = new JwtHelperService();
		if (localStorage.getItem("token") != null) {
			if (helper.isTokenExpired(localStorage.getItem("token"))) {
			localStorage.removeItem('token');
			this.router.navigate(['/login'])
			} 
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

	hashMd5(msg:string){
		return Md5.hashStr(msg);
	}
}
