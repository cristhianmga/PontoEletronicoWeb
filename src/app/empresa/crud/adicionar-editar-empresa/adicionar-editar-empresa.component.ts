import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidCpfORCnpj } from 'src/app/util/custom.validators';
import { MatStep, MatVerticalStepper } from '@angular/material/stepper';
import { Empresa } from 'src/app/Entity/Empresa.model';

@Component({
  selector: 'app-adicionar-editar-empresa',
  templateUrl: './adicionar-editar-empresa.component.html',
  styleUrls: ['./adicionar-editar-empresa.component.css']
})
export class AdicionarEditarEmpresaComponent extends BaseComponent {
	controllerName = 'Empresa';
	cadastro:FormGroup = new FormBuilder().group({
		cnpj:[null,[Validators.required,ValidCpfORCnpj]],
		razaoSocial:[null,[Validators.required]],
		id:[null]
	});
	empresa:Empresa;

  	@ViewChild('stepper',{static:true}) private myStepper: MatVerticalStepper;

	ngOnInit() {
        var listaLink = location.href.split("/");
		this.acao = listaLink[4];

		if(this.acao == 'editar'){
			this.carregarEditar();
		}
	}

	afterLoad(){
		this.cadastro.patchValue(this.obj);
	}

  	salvar(){
        this.ObsBlockPanel.setBlockedPanel(true);
		var state = true
		this.myStepper.steps.forEach(x => {
			if(!x.completed){
				state = false;
			}
		})
		if(state){
			this.empresa = new Empresa(this.limpaCaracterEspecial(this.cadastro.get('cnpj').value),this.cadastro.get('razaoSocial').value,this.cadastro.get('id').value);
			if(this.acao == 'cadastrar'){
				this.service.Adicionar('empresa',this.empresa).subscribe(x => {
					this.openSnackBar('Incluido com sucesso','Ok');
					this.router.navigate(['../'],{relativeTo:this.activatedRoute})
				},error => {this.openSnackBar('erro','Ok')},() => this.ObsBlockPanel.setBlockedPanel(false))
			}else{
				this.service.Atualizar('empresa',this.empresa).subscribe(x => {
					this.openSnackBar('Atualizado com sucesso','Ok');
					this.router.navigate(['../../'],{relativeTo:this.activatedRoute})
				},error => {this.openSnackBar('erro','Ok')},() => this.ObsBlockPanel.setBlockedPanel(false))
			}
		}else{
			this.ObsBlockPanel.setBlockedPanel(false)
			this.myStepper.next();
		}
  	}
}
