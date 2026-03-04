# 📚 V-Library, o Hub Inteligente de Recursos Educacionais


Uma aplicação Fullstack desenvolvida para o gerenciamento de materiais didáticos, contando com o auxílio de Inteligência Artificial para gerar descrições e tags automáticas, otimizando o tempo do usuário.

![GIF_VLibrary1-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/d6800fbd-ca03-450e-b685-fe8053d0f77b)

## Funcionalidades

* **CRUD Completo:** Cadastro, leitura, edição e exclusão de materiais educacionais (Links, PDFs, Vídeos).
* **Smart Assist (IA):** Integração com a API do Google Gemini atuando como um "Assistente Pedagógico". Gera automaticamente descrições ricas e sugere tags com base no título e tipo do material informado pelo usuário.
* **Paginação:** Listagem otimizada de recursos preparada para escalabilidade.
* **Feedback Visual:** Interface reativa com *loading states* durante o processamento da IA.
* **Observabilidade e Saúde:** Endpoint de `/health` e logs estruturados de requisições.

## Tecnologias Utilizadas

**Frontend:**
* Angular (v17+) com controle de fluxo nativo (`@for`, `@if`)
* Reactive Forms
* Tailwind CSS (v3) para estilização responsiva

**Backend:**
* Python 3
* FastAPI
* Integração com Google Gemini (LLM)

---

## Arquitetura do Sistema

* Frontend (Client): Desenvolvido em Angular (v17+), atua como uma Single Page Application (SPA). Ele gerencia o estado da interface, formulários reativos e faz requisições assíncronas para o servidor.
* Backend (API): Desenvolvido em FastAPI (Python), é o coração lógico do sistema. Ele expõe endpoints RESTful, gerencia a persistência dos dados (CRUD) e atua como uma ponte segura para serviços de terceiros (Google Gemini).
* Comunicação: A troca de dados entre o Client e a API é feita exclusivamente via protocolo HTTP utilizando o formato JSON.

---

## Prompt Engineering
Para garantir que a Inteligência Artificial retorne dados precisos e úteis para a plataforma, foi aplicada uma técnica de Prompt Engineering.
No backend, a IA do Google Gemini é instruída a assumir a persona de um "Assistente Pedagógico". O prompt é construído dinamicamente concatenando o Título e o Tipo do material inseridos pelo usuário. A instrução força a LLM a retornar a resposta em um formato estruturado (JSON contendo uma descrição rica e um array com 3 tags relevantes), garantindo que o Angular consiga injetar os dados automaticamente nos campos do formulário sem quebrar a interface.

---

## Estratégia de Segurança
Seguindo as melhores práticas de DevSecOps, nenhuma credencial ou chave de API foi "chumbada" (hardcoded) no código-fonte.
A chave de autenticação do Google Gemini (```GEMINI_API_KEY```) é injetada na aplicação através de variáveis de ambiente. No ambiente de desenvolvimento, utilizamos um arquivo ```.env```, que é estritamente ignorado pelo controle de versão do Git (configurado no ```.gitignore```). Isso previne o vazamento acidental de credenciais em repositórios públicos, garantindo a integridade e segurança do projeto.

---

## Estratégia de Paginação
Pensando na escalabilidade do sistema e na experiência do usuário (UX), a listagem de materiais não sobrecarrega a rede trazendo todos os registros de uma vez.

Foi implementada uma paginação do lado do servidor (Server-side Pagination). A rota ```GET /recursos``` do FastAPI aceita os parâmetros de Query ```skip``` (deslocamento) e limit (tamanho do lote). O frontend calcula dinamicamente esses valores com base na página atual do usuário, garantindo consultas leves ao banco de dados e uma renderização rápida na tela, mesmo que o volume de materiais cadastrados cresça exponencialmente.

---

## 🚀 Como executar o projeto localmente

### Pré-requisitos
* Node.js e NPM instalados
* Angular CLI instalado (`npm install -g @angular/cli`)
* Python 3.9+ instalado

### 1. Configurando o Backend (FastAPI)

Abra o terminal na pasta raiz do backend:

```bash
# Crie um ambiente virtual
python -m venv venv

# Ative o ambiente virtual
# No Windows:
venv\Scripts\activate
# No Linux/Mac:
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt
```
#### Configuração da Chave da API
Crie um arquivo chamado ```.env``` na raiz da pasta do backend e adicione a sua chave da API do Gemini:
```bash
GEMINI_API_KEY=sua_chave_aqui
```
Rodando o servidor:
```bash
uvicorn main:app --reload
```

### Configurando o Frontend(Angular)
Abra um novo terminal na pasta raiz do frontend:
```bash
# Instale as dependências (incluindo o Tailwind CSS)
npm install

# Inicie o servidor de desenvolvimento
ng serve
```
O frontend estará acessível no seu navegador em http://localhost:4200.

---
### Endpoints Principais da API
```GET /recursos?skip=0&limit=6``` - Lista os recursos com paginação

```POST /recursos``` - Cria um novo recurso

```PUT /recursos/{id}``` - Atualiza um recurso existente

```DELETE /recursos/{id}``` - Remove um recurso

```POST /assist``` - Recebe título/tipo e retorna a sugestão da IA (Gemini)

```GET /health``` - Retorna o status de saúde da API

---

Desenvolvido por Dantte Roberto - Estudante de Ciência da Computação no CIn-UFPE.

E-mail: dantteroberto10@gmail.com

LinkedIn: www.linkedin.com/in/dantte-roberto
