import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'pagina-inicial',
    templateUrl: './PaginaInicial.component.html',
    styleUrls:['./PaginaInicial.component.css']
  })
  export class PaginaInicialComponent extends BaseComponent {
  
  
    ngOnInit() {
    }
  
    MinhaEmpresa(){
      this.router.navigate(['./empresa/minha-empresa'])
    }
  }