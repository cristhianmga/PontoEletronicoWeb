export class Empresa{
    public Id:number;
    public CNPJ:string;
    public RazaoSocial:string;

    constructor(CNPJ,RazaoSocial,Id?){
        this.Id = Id;
        this.CNPJ = CNPJ;
        this.RazaoSocial = RazaoSocial;
    }
}