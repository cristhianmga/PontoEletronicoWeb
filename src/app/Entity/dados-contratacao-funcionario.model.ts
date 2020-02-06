import { Empresa } from './Empresa.model';
import { Funcionario } from './funcionario.model';

export class DadosContratacaoFuncionario{
    public id:number;
    public empresa:Empresa;
    public EmpresaId:number;
    public FuncionarioId:number;
    public funcionario:Funcionario;
    constructor(id:number,empresa?:Empresa,funcionario?:Funcionario,empresaId?:number,funcionarioId?:number){
        this.id = id;
        this.empresa = empresa;
        this.funcionario = funcionario;
        this.EmpresaId = empresaId;
        this.FuncionarioId = funcionarioId;
    }
}