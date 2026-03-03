import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recurso, RecursoCreate, SmartAssistRequest, SmartAssistResponse } from '../models/recurso.model';


@Injectable({
  providedIn: 'root',
})
export class Api {

  private apiUrl = 'http://localhost:8000/recursos';

  constructor(private http: HttpClient) { }

  registrarRecurso(recurso: RecursoCreate): Observable<RecursoCreate> {
    return this.http.post<RecursoCreate>(this.apiUrl, recurso);
  }

  listarRecursos(skip: number=0, limit: number=6): Observable<Recurso[]> {
    return this.http.get<Recurso[]>(`${this.apiUrl}?skip=${skip}&limit=${limit}`);
  }

  editarRecurso(id: number, recurso: RecursoCreate): Observable<Recurso> {
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
