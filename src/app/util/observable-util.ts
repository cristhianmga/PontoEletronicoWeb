import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

export interface ObservableUtil {
    subject: Subject<any>;
}

/**
 * Observable padrão
 */
@Injectable()
export class ObservableVariable implements ObservableUtil {
    subject = new Subject<any>();

    setVariable(variable: any): void {
        this.subject.next({ text: variable });
    }

    clearVariable() {
        this.subject.next();
    }

    getVariable(): Observable<any> {
        return this.subject.asObservable();
    }
}

/**
 * Observable para bloqueio da tela pelo componente loading
 */
@Injectable()
export class ObservableBlockPanel implements ObservableUtil {
    subject = new Subject<any>();
    setBlockedPanel(variable: any) {
        this.subject.next({ text: variable });
    }

    clearBlockedPanel() {
        this.subject.next();
    }

    getBlockedPanel(): Observable<any> {
        return this.subject.asObservable();
    }
}

/**
 * Observable para bloqueio da tela pelo componente loading ao carregar documentos
 */
@Injectable()
export class ObservableBlockPanelDoc implements ObservableUtil {
    subject = new Subject<any>();
    setBlockedPanel(variable: any) {
        this.subject.next({ text: variable });
    }

    clearBlockedPanel() {
        this.subject.next();
    }

    getBlockedPanel(): Observable<any> {
        return this.subject.asObservable();
    }
}
/**
 * Possui os dados do usuário logado
 */
@Injectable()
export class bObservableUsuario {
    constructor() { }
    private messageSource = new BehaviorSubject<any>("");
    /**
     * Retorna o valor atual armazenado na variável
     */
    getValue = this.messageSource.asObservable();
    /**
     * Inseri um novo valor na variável, sobrescrevendo o antigo
     * @param obj Valor a ser passado para o observable
     */
    setValue(obj: any) {
        this.messageSource.next(obj);
    }
}