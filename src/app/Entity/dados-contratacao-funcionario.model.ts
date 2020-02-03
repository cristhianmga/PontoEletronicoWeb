import { Empresa } from './Empresa.model';
import { Funcionario } from './funcionario.model';

export class DadosContratacaoFuncionario{
    public id:number;
    public empresa:Empresa;
    public funcionario:Funcionario;
    constructor(id,empresa:Empresa,funcionario:Funcionario){
        this.id = id;
        this.empresa = empresa;
        this.funcionario = funcionario;
    }
}