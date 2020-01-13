import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFiltroForResultado'
})
export class MyFiltroForResultadoPipe implements PipeTransform {

transform(value: any[],filter:number): any {
    if(value.length > 0){
        return value.filter(x => x.idCategoria == (filter + 1));
    }else{
        return [];
    }
}

}
