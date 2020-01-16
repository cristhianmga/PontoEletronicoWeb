import { Pipe, PipeTransform } from '@angular/core';

/*
 * Exibe telefone com máscara
 * Usage:
 *  value | telefoneMask
*/

@Pipe({
    name: 'telefoneMask'
})
export class TelefoneMaskPipe implements PipeTransform {

    transform(value: string): string {
        if (value == null) {
            return '-';
        }
        else {
            const valor = value.replace(/[^0-9A-Za-z]/g, '');
            if (valor.length >= 8) {
                return valor.substring(0, 4) + "-" + valor.substring(4, valor.length);
            }
            return value;
        }
    }
}