import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { cacheable, clearCache, headers } from '../util/rxjs-functions';

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
  
  ObterTodos = (route: string, cacheKey?: string, refresh: boolean = false) => cacheable(
    () => this.http.get<any[]>(`${environment.apiEndpoint}/api/${route}`,{headers:headers()}),
    cacheKey,
    refresh
  )

  ObterToken(obj: any): Observable<any> {
    return this.http.post<any>(`${environment.apiEndpoint}/api/login`, obj,{headers:headers()});
  }


}