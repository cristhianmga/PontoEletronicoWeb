import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpj'
})
export class PipeCpfCnpj implements PipeTransform {

  transform(value: string): string {
    if (value == null) {
      return '-';
    }
    else {
      const valor = value.replace(/[^0-9A-Za-z]/g, '');
      if (valor.length == 11) {
        return valor.substring(0, 3) + "." + valor.substring(3, 6) + "." + valor.substring(6, 9) + "-" + valor.substring(9, 11);
      } else if (valor.length == 14){
        return valor.substring(0, 2) + "." + valor.substring(2, 5) + "." + valor.substring(5, 8) + "/" + valor.substring(8, 12) +"-" + valor.substring(12, 14);
      }
        return value;
    }
  }
}