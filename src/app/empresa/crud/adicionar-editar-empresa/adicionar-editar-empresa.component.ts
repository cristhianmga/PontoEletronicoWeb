import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidCpfORCnpj } from 'src/app/util/custom.validators';
import { MatStep, MatVerticalStepper } from '@angular/material/stepper';
import { Empresa } from 'src/app/Entity/Empresa.model';
import { DadosContratacaoFuncionario } from 'src/app/Entity/dados-contratacao-funcionario.model';
import { Funcionario } from 'src/app/Entity/funcionario.model';
import { sha256 } from 'js-sha256';
import { environment } from 'src/environments/environment';

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
	dono:FormGroup = new FormBuilder().group({
		id:[0],
		nome:[null],
		cpf:[null],
		email:[null]
	});
	dados:DadosContratacaoFuncionario;

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
			var empresa = new Empresa(this.limpaCaracterEspecial(this.cadastro.get('cnpj').value),this.cadastro.get('razaoSocial').value,this.cadastro.get('id').value);
			if(this.acao == 'cadastrar'){
				var funcionario = new Funcionario(this.dono.get('id').value,this.dono.get('nome').value,this.limpaCaracterEspecial(this.dono.get('cpf').value),this.dono.get('email').value,environment.senhaPadrao);
				this.dados = new DadosContratacaoFuncionario(0,empresa,funcionario);
				this.service.Adicionar('empresa',this.dados).subscribe(x => {
					this.openSnackBar('Incluido com sucesso','Ok');
					this.router.navigate(['../'],{relativeTo:this.activatedRoute})
				},error => {this.openSnackBar('erro','Ok');this.ObsBlockPanel.setBlockedPanel(false)},() => this.ObsBlockPanel.setBlockedPanel(false))
			}else{
				this.service.Atualizar('empresa',empresa).subscribe(x => {
					this.openSnackBar('Atualizado com sucesso','Ok');
					this.router.navigate(['../../'],{relativeTo:this.activatedRoute})
				},error => {this.openSnackBar('erro','Ok');this.ObsBlockPanel.setBlockedPanel(false)},() => this.ObsBlockPanel.setBlockedPanel(false))
			}
		}else{
			this.ObsBlockPanel.setBlockedPanel(false)
			this.myStepper.next();
		}
  	}
}
