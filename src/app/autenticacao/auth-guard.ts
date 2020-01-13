import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { bObservableUsuario } from '../util/observable-util';
import { Subscription } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

	usuario:any;
	token:string = localStorage.getItem('token');
    
constructor(private router: Router,
			private observableUsuario:bObservableUsuario) { }

  

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    if(this.token == null){
		this.router.navigate(['/login']);
	}else{
		// return this.verificaUsuario(state);
		return true;
	}
  }
  canActivateChild = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => this.canActivate(route,state);

  isLogged(){
    var token = localStorage.getItem('token');
    if(token == null){
      return false;
    }else{
      return true
    }
  }

  verificaUsuario(state:RouterStateSnapshot){
	  this.observableUsuario.getValue.subscribe(x => {
		  	if(x){
				if(x.nome == 'admin'){
					return true;
				}
				else{
					if(state.url.split('/')[1] != 'candidato' && state.url.split('/')[1] != 'categoria' ){
						return true;
					}else{
						this.router.navigate(['/erro']);
					}
				}
			}else{
				return false;
			}
	  })
	  return true;
  }
} 