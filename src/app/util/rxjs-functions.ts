import { Observable, ReplaySubject } from 'rxjs';
import { headersToString } from 'selenium-webdriver/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Paginacao } from '../Entity/Paginacao.model';

let cacheableCache: { [key: string]: Observable<any> } = {};
export function cacheable<T>(returnObservable: () => Observable<T>, key?: string, refresh?: boolean, customCache?: { [key: string]: Observable<T> }): Observable<T> {
  if (refresh)
    delete cacheableCache[key];
  if (!!key && (customCache || cacheableCache)[key]) {
    return (customCache || cacheableCache)[key] as Observable<T>;
  }
  let replay = new ReplaySubject<T>(1);
  returnObservable().subscribe(
    x => replay.next(x),
    x => replay.error(x),
    () => replay.complete()
  );
  let observable = replay.asObservable();
  if (!!key) {
    if (!!customCache) {
      customCache[key] = observable;
    } else {
      cacheableCache[key] = observable;
    }
  }
  return observable;
};

export function clearCache(key: string) {
  delete cacheableCache[key];
}
let defaultHeaders = new Headers({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  'Access-Control-Allow-Headers': 'Content-Type'
});

export function headers(){
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Access-Control-Allow-Origin', '*');
  headers = headers.append('Access-Control-Allow-Credentials', 'true');
  headers = headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  headers = headers.append('Access-Control-Allow-Headers', 'Content-Type');
  if(localStorage.getItem('token') != null){
    headers = headers.append('Authorization',`Bearer ${localStorage.getItem('token')}`);
  }
  return headers;
}
export function params(filtro:any = null){
  let params: HttpParams = new HttpParams();
  if(filtro != null){
    Object.keys(filtro).map(k => params = params.set(k, filtro[k]));
  }
  return params;
}