export class Empresa{
    public Id:number;
    public CNPJ:string;
    public RazaoSocial:string;

    constructor(CNPJ,RazaoSocial,Id){
        this.Id = Id == null ? 0 : Id;
        this.CNPJ = CNPJ;
        this.RazaoSocial = RazaoSocial;
    }
}