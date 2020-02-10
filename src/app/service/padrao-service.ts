import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { cacheable, clearCache, headers, params } from '../util/rxjs-functions';
import { Paginacao } from '../Entity/Paginacao.model';

@Injectable()
export class PadraoService {

  constructor(public http: HttpClient) { }

  LimparCache = (key: string) => clearCache(key);

  Adicionar(route: string, obj: any): Observable<any> {
    return this.http.post<any>(`${environment.apiEndpoint}/api/${route}`, obj,{headers:headers()});
  }
  Atualizar(route: string, obj: any, parcial?: any): Observable<any> {
    return this.http.put<any>(`${environment.apiEndpoint}/api/${route}`, obj,{headers:headers()});
  }
  Deletar(route: string, id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiEndpoint}/api/${route}/${id}`,{headers:headers()});
  }
  Obter = (route: string, id: number, cacheKey?: string, refresh: boolean = false) => cacheable(
    () => this.http.get<any>(`${environment.apiEndpoint}/api/${route}/${id}`,{headers:headers()}),
    cacheKey,
    refresh
  )
  ObterDadosUsuario = (cacheKey?: string, refresh: boolean = false) => cacheable(
    () => this.http.get<any>(`${environment.apiEndpoint}/api/funcionario/obterDadosUsuario`,{headers:headers()}),
    cacheKey,
    refresh
  )
  ObterCpf = (route: string, cpf: string, cacheKey?: string, refresh: boolean = false) => cacheable(
    () => this.http.get<any>(`${environment.apiEndpoint}/api/${route}/verificaCpf/${cpf}`,{headers:headers()}),
    cacheKey,
    refresh
  )
  
  ObterTodos = (route: string, cacheKey?: string, refresh: boolean = false) => cacheable(
    () => this.http.get<any[]>(`${environment.apiEndpoint}/api/${route}`,{headers:headers()}),
    cacheKey,
    refresh
  )

  
  
  ListarTodos = (route: string, cacheKey?: string, refresh: boolean = false) => cacheable(
    () => this.http.get<any[]>(`${environment.apiEndpoint}/api/${route}/listarTodos`,{headers:headers()}),
    cacheKey,
    refresh
  )

  ObterTodosPaginado = (route: string,pagination:Paginacao, cacheKey?: string, refresh: boolean = false) => cacheable(
    () => this.http.get<any>(`${environment.apiEndpoint}/api/${route}/ObterTodosPaginado`,{headers:headers(),params:params(pagination)}),
    cacheKey,
    refresh
  )

  ObterToken(obj: any): Observable<any> {
    return this.http.post<any>(`${environment.apiEndpoint}/api/Autenticacao`, obj,{headers:headers()});
  }


}