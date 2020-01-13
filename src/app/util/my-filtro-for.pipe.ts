import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFiltroFor'
})
export class MyFiltroForPipe implements PipeTransform {

  transform(value: any[],filter:number,indexTab:number,indexForm:number): any {
    if(indexTab == indexForm){
      if(value.length > 0){
        return value.filter(x => x.idCategoria == filter);
      }else{
        return [];
      }
    }
  }

}
