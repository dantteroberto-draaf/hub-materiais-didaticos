import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api.service';
import { Recurso } from '../../models/recurso.model';

@Component({
  selector: 'app-gerenciador',
  imports: [],
  templateUrl: './gerenciador.html',
  styleUrl: './gerenciador.css',
})
export class Gerenciador implements OnInit{
  listaRecursos: Recurso[] = [];

  constructor(private apiService: Api) {}

  // roda automaticamente quando o componente é carregado
  ngOnInit(): void {
    this.carregarRecursos();
  }

  carregarRecursos() {
    this.apiService.listarRecursos().subscribe({
      next: (dados) => {
        this.listaRecursos = dados;
        console.log("Chegou do FastAPI:", this.listaRecursos);
      },
      error: (erro) => {
        console.error("Erro ao buscar dados: ", erro);
      }
    });
  }
}
