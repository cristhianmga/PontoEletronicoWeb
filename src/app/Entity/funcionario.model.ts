export class Funcionario{
    public id:number;
    public nome:string;
    public cpf:string;
    public email:string;
    public senha:string;

    constructor(id,nome,cpf,email,senha?){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}