import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recurso, SmartAssistRequest, SmartAssistResponse } from '../models/recurso.model';


@Injectable({
  providedIn: 'root',
})
export class Api {

  private apiUrl = 'http://localhost:8000/recursos';

  constructor(private http: HttpClient) { }

  registrarRecurso(recurso: Recurso): Observable<Recurso> {
    return this.http.post<Recurso>(this.apiUrl, recurso);
  }

  listarRecursos(): Observable<Recurso[]> {
    return this.http.get<Recurso[]>(this.apiUrl);
  }

  editarRecurso(id: number, recurso: Recurso): Observable<Recurso> {
    return this.http.put<Recurso>(`${this.apiUrl}/${id}`, recurso)
  }

  deletarRecurso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  // essas crases servem como uma fstring no python pra conseguir colocar o url e o id

  smartAssist(titulo_e_tipo: SmartAssistRequest): Observable<any> {
    return this.http.post<SmartAssistResponse>(`${this.apiUrl}/assist`, titulo_e_tipo);
  }


}
