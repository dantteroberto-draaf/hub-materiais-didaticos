import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api.service';
import { Recurso } from '../../models/recurso.model';

import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gerenciador',
  imports: [ReactiveFormsModule],
  templateUrl: './gerenciador.html',
  styleUrl: './gerenciador.css',
})
export class Gerenciador implements OnInit{
  listaRecursos: Recurso[] = [];

  formulario = new FormGroup({
  titulo: new FormControl(''),
  tipo: new FormControl(''),
  link: new FormControl(''),
  descricao: new FormControl(''),
  tags: new FormControl('') // Vamos tratar isso como uma string separada por vírgulas por enquanto
});

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
