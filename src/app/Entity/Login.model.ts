import { FormGroup } from '@angular/forms';
import { sha256 } from 'js-sha256';

export class Login{
    public Cpf:string;
    public Senha:string;
    constructor(cpf:string,senha:string){
        this.Cpf = cpf;
        this.Senha = sha256(senha);
    }
}