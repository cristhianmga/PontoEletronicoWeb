import { Component } from '@angular/core';
import { BaseComponent } from './base/base.component';
import { DebugHelper } from 'protractor/built/debugger';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent {
  title = 'PontoEletronicoWeb';
  
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  isLogged(){
		const helper = new JwtHelperService();
    try{
        var tempo = helper.isTokenExpired(localStorage.getItem("token"));
        if(tempo){
          return false;
        }else{
          return true;
        }
    }catch(e){
      return false;
    }
  }
  
}
