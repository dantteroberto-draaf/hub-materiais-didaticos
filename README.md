# 📚 Hub Inteligente de Recursos Educacionais

Uma aplicação Fullstack desenvolvida para o gerenciamento de materiais didáticos, contando com o auxílio de Inteligência Artificial para gerar descrições e tags automáticas, otimizando o tempo do usuário.

## Funcionalidades

* **CRUD Completo:** Cadastro, leitura, edição e exclusão de materiais educacionais (Links, PDFs, Vídeos).
* **Smart Assist (IA):** Integração com a API do Google Gemini atuando como um "Assistente Pedagógico". Gera automaticamente descrições ricas e sugere tags com base no título e tipo do material informado pelo usuário.
* **Paginação:** Listagem otimizada de recursos preparada para escalabilidade.
* **Feedback Visual:** Interface reativa com *loading states* durante o processamento da IA.
* **Observabilidade e Saúde:** Endpoint de `/health` e logs estruturados de requisições.

## 🛠️ Tecnologias Utilizadas

**Frontend:**
* Angular (v17+) com controle de fluxo nativo (`@for`, `@if`)
* Reactive Forms
* Tailwind CSS (v3) para estilização responsiva

**Backend:**
* Python 3
* FastAPI
* Integração com Google Gemini (LLM)

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
