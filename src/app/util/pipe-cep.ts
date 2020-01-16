import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'CepPipe'
})
export class CepPipe implements PipeTransform {

    transform(value: string): string {
        if (value == null) {
            return '-';
        }
        else {
            const valor = String(value).replace(/[^0-9A-Za-z]/g, '');
            if (valor.length > 7) {
                return valor.substring(0, 5) + "-" + valor.substring(5, valor.length);
            }
            return value;
        }
    }
}