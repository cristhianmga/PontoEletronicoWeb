import { FormControl } from "@angular/forms/forms";
import { AbstractControl } from '@angular/forms';

export function comparerStringRepeated(control: FormControl) {
    const value = String(control.value).replace(/[^0-9]/g, '');
    if (value !== '' && value[0].repeat(value.length) === value) {
        return { comparer: 'Campo inválido' };
    }
}

export function ValidCpfORCnpjFilter(control: FormControl) {
    const regex = /\d/g;
    let tmp = String(control.value).match(regex);
    if(tmp==null){
        return ;
    }
    else{
      return ValidCpfORCnpj(control);
    }
}

export function ValidCpfORCnpj(control: FormControl) {
    const regex = /\d/g;
    const equalityRegex = /^(\d)\1+$/;
    const d: number[] = [14];
    const v: number[] = [2];
    let j, i, soma: number;
    let sequencia, numeroDocumento: string;
    let tmp = String(control.value).match(regex);
    numeroDocumento = tmp != null ? equalityRegex.test(tmp.join('')) == false ? tmp.join('') : "" : "";
    switch (numeroDocumento.length) {
        case 11:
            for (i = 0; i <= 10; i++)d[i] = +numeroDocumento.substr(i, 1);
            for (i = 0; i <= 1; i++) {
                soma = 0;
                for (j = 0; j <= 8 + i; j++) soma += d[j] * (10 + i - j);

                v[i] = (soma * 10) % 11;
                if (v[i] === 10) v[i] = 0;
            }
            if (v[0] !== d[9] || v[1] !== d[10]) {
                return { cpfcnpj: 'Campo inválido' };
            }
            break;
        case 14:
            sequencia = "6543298765432";
            for (i = 0; i <= 13; i++) d[i] = +numeroDocumento.substr(i, 1);
            for (i = 0; i <= 1; i++) {
                soma = 0;
                for (j = 0; j <= 11 + i; j++)
                    soma += d[j] * +sequencia.substr(j + 1 - i, 1);

                v[i] = (soma * 10) % 11;
                if (v[i] == 10) v[i] = 0;
            }
            if (v[0] !== d[12] || v[1] !== d[13]) return { cpfcnpj: 'Campo inválido' };;
            break;
        default:
            return { cpfcnpj: 'Campo inválido' };
    }
}

export function validTitulo(control: FormControl) {
    if (control.value === undefined || control.value === null || control.value === '' && (control.value.length < 11 || control.value.length > 12)) {
        return false;
    } else {
        const d: number[] = [12];
        let dv1: number = 0;
        let dv2: number = 0;
        let j, i, somaDv1, somaDv2: number;
        const numeroDocumento = String(control.value).replace(/[^0-9]/g, '');
        if (numeroDocumento !== '' && numeroDocumento[0].repeat(numeroDocumento.length) === numeroDocumento) {
            return { titulo: 'Título de Eleitor inválido' };
        }
        for (i = 0; i <= 11; i++) { d[i] = +(numeroDocumento.substr(i, 1)); }
        somaDv1 = 0;
        somaDv2 = 0;
        for (j = 0; j <= 7; j++) { somaDv1 += d[j] * (2 + j); }
        dv1 = somaDv1 % 11;
        somaDv2 = (d[8] * 7) + (d[9] * 8) + (dv1 * 9);
        dv2 = somaDv2 % 11;

        if (dv1 === 10) { dv1 = 0; }
        if (dv2 === 10) { dv2 = 0; }
        if (dv1 !== d[10] || dv2 !== d[11]) return { titulo: 'Título de Eleitor inválido' };
    }
}

export function validateUF(control: FormControl) {
    const regUFIsValid: RegExp = /(A|a)(C|c|L|l|M|m|P|p)|(B|b)(A|a)|(C|c)(E|e)|(D|d)(F|f)|(E|e)(S|s)|(G|g)(O|o)|(M|m)(A|a|G|g|S|s|T|t)|(P|p)(A|a|B|b|E|e|I|i|R|r)|(R|r)(J|j|N|n|O|o|R|r|S|s)|(S|s)(C|c|E|e|P|p)|(T|t)(O|o)/;
    const uf = control.value ? String(control.value).replace(/[^0-9A-Za-z]/g, '') : '';
    if (uf.search(regUFIsValid) && uf.length >= 2) {
        return { uf: 'UF inválido' };
    }
}

export function validateCurso(control: FormControl) {
    const regUFIsValid: RegExp = /(A|a)(C|c|L|l|M|m|P|p)|(B|b)(A|a)|(C|c)(E|e|F|f)|(E|e)(S|s)|(D|d)(F|f)|(G|g)(O|o)|(M|m)(A|a|G|g|S|s|T|t)|(P|p)(A|a|B|b|E|e|I|i|R|r)|(R|r)(J|j|N|n|O|o|R|r|S|s)|(S|s)(C|c|E|e|P|p)|(T|t)(O|o)/;
    const ufCurso = control.value ? String(control.value).replace(/[^0-9A-Za-z]/g, '') : '';
    if (ufCurso.search(regUFIsValid) && ufCurso.length >= 2) {
        return { uf: 'UF inválido' };
    }

}

export function validateEvento(control: FormControl) {
    const regUFIsValid: RegExp = /(A|a)(C|c|L|l|M|m|P|p)|(B|b)(A|a)|(C|c)(E|e|F|f)|(E|e)(S|s)|(D|d)(F|f)|(G|g)(O|o)|(M|m)(A|a|G|g|S|s|T|t)|(P|p)(A|a|B|b|E|e|I|i|R|r)|(R|r)(J|j|N|n|O|o|R|r|S|s)|(S|s)(C|c|E|e|P|p)|(T|t)(O|o)/;
    const ufEvento = control.value ? String(control.value).replace(/[^0-9A-Za-z]/g, '') : '';
    if (ufEvento.search(regUFIsValid) && ufEvento.length >= 2) {
        return { uf: 'UF inválido' };
    }

}

export function validateDocencia(control: FormControl) {
    const regUFIsValid: RegExp = /(A|a)(C|c|L|l|M|m|P|p)|(B|b)(A|a)|(C|c)(E|e|F|f)|(E|e)(S|s)|(D|d)(F|f)|(G|g)(O|o)|(M|m)(A|a|G|g|S|s|T|t)|(P|p)(A|a|B|b|E|e|I|i|R|r)|(R|r)(J|j|N|n|O|o|R|r|S|s)|(S|s)(C|c|E|e|P|p)|(T|t)(O|o)/;
    const ufEvento = control.value ? String(control.value).replace(/[^0-9A-Za-z]/g, '') : '';
    //if (ufEvento.search(regUFIsValid) && ufEvento.length >= 2) {
    //    return { uf: 'UF inválido' };
    //}

}

export function requiredMinLength(valueComparer, withSpecialCharacter = false) {
    return function (control: FormControl) {
        let value;
        if (!withSpecialCharacter) {
            value = control.value ? String(control.value).replace(/[^0-9A-Za-z]/g, '') : '';
        } else {
            value = control.value ? String(control.value) : '';
        }
        if (value.length > 0) {
            if (value.length < valueComparer) {
                return { validator: 'Quantidade de caracter(es) inválido(s).' };
            }
        }
    }
}

export function requiredMaxLength(valueComparer, withSpecialCharacter = false) {
    return function (control: FormControl) {
        let value;
        if (!withSpecialCharacter) {
            value = control.value ? String(control.value).replace(/[^0-9A-Za-z]/g, '') : '';
        } else {
            value = control.value ? String(control.value) : '';
        }
        if (value.length > valueComparer) {
            return { validator: 'Limite máximo de ' + valueComparer + ' caracteres excedido.' };
        }
    }
}

export function dataMaxHoje(control: FormControl) {
    const hoje: Date = new Date(new Date().toDateString());
    if (control.value > hoje) {
        return { validator: 'A data não pode ser maior que o dia de hoje.' };
    }
}

export function dataMinHoje(control: FormControl) {
    const hoje: Date = new Date(new Date().toDateString());
    if (!(control.value >= hoje)) {
        return { validator: 'A data não pode ser menor que o dia de hoje.' };
    }
}

export function dataDiaAtual(control: FormControl) {
    const hoje: Date = new Date(new Date().toDateString());
    if(control.value < hoje) {
        return {validator: 'A data fim não pode ser menor que a data início.'};
    }

}

export function ValidarData(inicio: Date, final: Date): boolean {
    if (final < inicio)
        return false;
    else
        return true;
}

export function ValidaCodigo(control: FormControl){
    if(control.value != "" && control.value != null){
        if(control.value.indexOf("_") != -1){
            return {validator: 'Preencha todo o Código.'};
        }
    }else{
        return {validator: 'Campo Obrigatório.'};
    }
}