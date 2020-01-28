import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidCpfORCnpj } from 'src/app/util/custom.validators';

@Component({
  selector: 'app-adicionar-editar-empresa',
  templateUrl: './adicionar-editar-empresa.component.html',
  styleUrls: ['./adicionar-editar-empresa.component.css']
})
export class AdicionarEditarEmpresaComponent extends BaseComponent {

  cadastro:FormGroup = new FormBuilder().group({
    cnpj:[null,[Validators.required,ValidCpfORCnpj]],
    razaoSocial:[null,[Validators.required]]
  });

  ngOnInit() {
  }

}
