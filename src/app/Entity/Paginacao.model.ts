export class Paginacao{
    public page:number;
    public size:number;
    public sort:string;
    public order:string;

    constructor(page,size,sort,order){
        this.page = page;
        this.size = size;
        this.sort = sort;
        this.order = order;
    }
}