import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormBuilder } from '@angular/forms';
import { sha256 } from 'js-sha256';
import { Login } from '../Entity/Login.model';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls:['./login.component.css']
  })
  export class LoginComponent extends BaseComponent {
    Login:Login;
  
    loginForm = new FormBuilder().group({
      cpf:[null],
      senha:[null]
    });
  
    ngOnInit() {
    }
  
    login(){
      this.ObsBlockPanel.setBlockedPanel(true);
      this.Login = new Login(this.limpaCaracterEspecial(this.loginForm.get('cpf').value),this.loginForm.get('senha').value);
      this.service.ObterToken(this.Login).subscribe(retorno => {
        if(retorno.authenticated){
          localStorage.setItem('token',retorno.accessToken);
          this.router.navigate(['']);
        }
      },
      error => {
        this.ObsBlockPanel.setBlockedPanel(false);
      },
      () =>{   
        this.ObsBlockPanel.setBlockedPanel(false);
      });
    }
  
  }