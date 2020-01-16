import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls:['./login.component.css']
  })
  export class LoginComponent extends BaseComponent {
  
    loginForm = new FormBuilder().group({
      cpf:[null],
      senha:[null]
    });
  
    ngOnInit() {
    }
  
    login(){
      var senhaNoCript = this.loginForm.get('senha').value;
      var senhaCript = this.hashMd5(this.loginForm.get('email').value+ ',' + this.loginForm.get('senha').value);
      this.loginForm.get('senha').setValue(senhaCript);
      
      this.service.ObterToken(this.loginForm.value).subscribe(retorno => {
        if(retorno.authenticated){
          localStorage.setItem('token',retorno.accessToken);
          this.router.navigate(['']);
        }else{
          this.loginForm.get('senha').setValue(senhaNoCript);
        }
      });
    }
  
  }