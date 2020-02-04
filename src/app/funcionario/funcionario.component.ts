import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidCpfORCnpj } from '../util/custom.validators';
import { DadosContratacaoFuncionario } from '../Entity/dados-contratacao-funcionario.model';
import { MatVerticalStepper } from '@angular/material/stepper';
import { Empresa } from '../Entity/Empresa.model';
import { Funcionario } from '../Entity/funcionario.model';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent extends BaseComponent {
  controllerName = 'Empresa';
  startDate:Date = new Date();
	funcionario:FormGroup = new FormBuilder().group({
		cpf:[null,[Validators.required,ValidCpfORCnpj]],
		nome:[{value:null,disabled:true},[Validators.required]],
		email:[{value:null,disabled:true},[Validators.required]],
		id:[null]
	});
	dadosForm:FormGroup = new FormBuilder().group({
		id:[null],
		cargo:[null,[Validators.required]],
		cargaHoraria:[null,[Validators.required]],
		dataInicio:[null,[Validators.required]],
		dataFim:[null]
	});
	dados:DadosContratacaoFuncionario;

  @ViewChild('stepper',{static:true}) private myStepper: MatVerticalStepper;
  buscado: boolean = false;

	ngOnInit() {
        var listaLink = location.href.split("/");
		this.acao = listaLink[4];

		if(this.acao == 'editar'){
			this.carregarEditar();
		}
	}

	afterLoad(){
		// this.cadastro.patchValue(this.obj);
  }
  
  buscarCpf(){
    if(this.funcionario.get('cpf').valid){
      this.service.ObterCpf('funcionario',this.limpaCaracterEspecial(this.funcionario.get('cpf').value)).subscribe(x => {
        if(x == null){
          this.funcionario.get('nome').enable();
          this.funcionario.get('email').enable();
        }else{
          this.funcionario.patchValue(x);
        }
        this.funcionario.get('cpf').disable();
        this.buscado = true;
      })
    }else{
      this.touchAll(this.funcionario);
    }
  }

  voltarBusca(){
    this.funcionario.reset();
    this.funcionario.get('cpf').enable();
    this.funcionario.get('nome').disable();
    this.funcionario.get('email').disable();
    this.buscado = false;
  }

  	// salvar(){
    //     this.ObsBlockPanel.setBlockedPanel(true);
		// var state = true
		// this.myStepper.steps.forEach(x => {
		// 	if(!x.completed){
		// 		state = false;
		// 	}
		// })
		// if(state){
			// var empresa = new Empresa(this.limpaCaracterEspecial(this.cadastro.get('cnpj').value),this.cadastro.get('razaoSocial').value,this.cadastro.get('id').value);
		// 	if(this.acao == 'cadastrar'){
		// 		var funcionario = new Funcionario(this.dono.get('id').value,this.dono.get('nome').value,this.limpaCaracterEspecial(this.dono.get('cpf').value),this.dono.get('email').value,sha256('temp@123'));
		// 		this.dados = new DadosContratacaoFuncionario(0,empresa,funcionario);
		// 		this.service.Adicionar('empresa',this.dados).subscribe(x => {
		// 			this.openSnackBar('Incluido com sucesso','Ok');
		// 			this.router.navigate(['../'],{relativeTo:this.activatedRoute})
		// 		},error => {this.openSnackBar('erro','Ok');this.ObsBlockPanel.setBlockedPanel(false)},() => this.ObsBlockPanel.setBlockedPanel(false))
		// 	}else{
		// 		this.service.Atualizar('empresa',empresa).subscribe(x => {
		// 			this.openSnackBar('Atualizado com sucesso','Ok');
		// 			this.router.navigate(['../../'],{relativeTo:this.activatedRoute})
		// 		},error => {this.openSnackBar('erro','Ok');this.ObsBlockPanel.setBlockedPanel(false)},() => this.ObsBlockPanel.setBlockedPanel(false))
		// 	}
		// }else{
		// 	this.ObsBlockPanel.setBlockedPanel(false)
		// 	this.myStepper.next();
		// }
  	// }
}