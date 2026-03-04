import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Api } from '../../services/api.service';
import { Recurso } from '../../models/recurso.model';

import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-gerenciador',
  imports: [ReactiveFormsModule],
  templateUrl: './gerenciador.html',
  styleUrl: './gerenciador.css',
})
export class Gerenciador implements OnInit{
  listaRecursos: Recurso[] = [];
  paginaAtual: number = 0;
  itensPorPagina: number = 6;

  formulario = new FormGroup({
  titulo: new FormControl('', [Validators.required]),
  tipo: new FormControl('', [Validators.required]),
  link: new FormControl('', [Validators.required]),
  descricao: new FormControl(''),
  tags: new FormControl('')
});

  carregandoIA: boolean = false;

  idEmEdicao: number | null = null;

  constructor(private apiService: Api, private cdr: ChangeDetectorRef) {}

  // roda automaticamente quando o componente é carregado
  ngOnInit(): void {
    this.carregarRecursos();
    this.cdr.detectChanges();
  }

  carregarRecursos() {
    const skip = this.paginaAtual * this.itensPorPagina;

    this.apiService.listarRecursos(skip, this.itensPorPagina).subscribe({
      next: (dados) => {
        this.listaRecursos = dados;
        this.cdr.detectChanges();
        console.log("Chegou do FastAPI:", this.listaRecursos);
      },
      error: (erro) => {
        console.error("Erro ao buscar dados: ", erro);
      }
    });
  }

  paginaAnterior() {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      this.carregarRecursos();
      this.cdr.detectChanges();
    }
  }

  proximaPagina() {
    if (this.listaRecursos.length === this.itensPorPagina) {
      this.paginaAtual++;
      this.carregarRecursos();
      this.cdr.detectChanges();
    }
  }

  deletarRecurso(id: number) {
    this.apiService.deletarRecurso(id).subscribe({
      next: (resposta) => {
        console.log('Recurso deletado!', resposta);
        this.carregarRecursos();
      },
      error: (erro) => {
        console.log("Erro ao deletar: ", erro);
      }
    });
  }

  prepararEdicao(recurso: Recurso) {
  this.idEmEdicao = recurso.id!;

  this.formulario.patchValue({
    titulo: recurso.titulo,
    tipo: recurso.tipo,
    link: recurso.link,
    descricao: recurso.descricao,
    tags: recurso.tags.join(', ') 
    });

  window.scrollTo({ top: 0, behavior: 'smooth' }); 
  this.cdr.detectChanges();
  }

  salvarRecurso() {
    if (this.formulario.invalid) {
    alert("⚠️ Por favor, preencha os campos obrigatórios: Título, Tipo e Link antes de salvar!");
    
    this.formulario.markAllAsTouched(); 
    
    return;
    }
    const formValues = this.formulario.value;

    // transformando as tags de string separada por vírgulas para array no formato desejado
    const tagsArray = formValues.tags ? formValues.tags.split(',').map((t: string) => t.trim()) : [];

    const objeto_recurso = {
      "titulo": formValues.titulo || '',
      "tipo": formValues.tipo || 'Link',
      "link":formValues.link || '',
      "descricao": formValues.descricao || '',
      "tags": tagsArray
    };

    if (this.idEmEdicao) {
    this.apiService.editarRecurso(this.idEmEdicao, objeto_recurso).subscribe({
      next: () => {
        console.log("Recurso editado com sucesso!")
        this.carregarRecursos();
        this.formulario.reset();
        this.idEmEdicao = null;
        this.cdr.detectChanges();
      }
    });
  }
    else {
    this.apiService.registrarRecurso(objeto_recurso).subscribe({
      next: (resposta) => {
        console.log("Salvo com sucesso!", resposta);
        this.carregarRecursos();
        this.formulario.reset();
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.log("Erro ao registrar recurso!", erro);
      }
    });
  }
  }

  gerarDescricaoIA() {
    const tituloPreenchido = this.formulario.value.titulo;
    const tipoPreenchido = this.formulario.value.tipo;

    if (!tituloPreenchido) {
      alert('Por favor, preencha o campo "Título" antes de pedir ajuda à IA!');
      return;
    }

    const requisicaoIA = {
      titulo: tituloPreenchido,
      tipo: tipoPreenchido || "Link"
    };

    this.carregandoIA = true;

    this.apiService.smartAssist(requisicaoIA).subscribe({
      next: (resposta) => {
        console.log("A IA respondeu com sucesso", resposta);

        this.formulario.patchValue({
          descricao: resposta.descricao,
          
          tags: resposta.tags.join(', ') 
        });
        this.carregandoIA = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.log("Erro ao tentar comunicar com a IA");
        alert('Ops! Ocorreu um erro ao gerar a descrição com a IA. Verifique se o backend está funcionando normalmente.')
        this.carregandoIA = false;
        this.cdr.detectChanges();
      }
    });
  }
}
