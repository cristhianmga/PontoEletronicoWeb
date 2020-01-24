export class Empresa{
    public Id:number;
    public CNPJ:string;
    public RazaoSocial:string;

    constructor(Id,CNPJ,RazaoSocial){
        this.Id = Id;
        this.CNPJ = CNPJ;
        this.RazaoSocial = RazaoSocial;
    }
}