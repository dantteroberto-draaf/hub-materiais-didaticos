from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv

import schemas, database as db, models

from google import genai
import os
import json
import time
import logging

logging.basicConfig(level=logging.INFO)

load_dotenv()
cliente_gemini = genai.Client()

models.Base.metadata.create_all(bind=db.engine)

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=['*'])

@app.get('/health')
def healthCheck():
    return {"status": "Ok"}

@app.post('/recursos', response_model=schemas.RecursoResponse)
def criar_recurso(recursoRecebido: schemas.RecursoCreate,
                  sessao_db: Session = Depends(db.get_db)):
    
    novo_recurso = models.Recurso(**recursoRecebido.model_dump())
    sessao_db.add(novo_recurso)

    sessao_db.commit()

    sessao_db.refresh(novo_recurso)

    return novo_recurso

@app.get('/recursos', response_model=list[schemas.RecursoResponse])
def listar_recursos(skip: int=0, limit: int=10,
                    sessao_db: Session = Depends(db.get_db)):
    
    recursos = sessao_db.query(models.Recurso).offset(skip).limit(limit).all()

    return recursos

@app.put('/recursos/{recurso_id}', response_model=schemas.RecursoResponse)
def editar_recurso(dados_recebidos: schemas.RecursoCreate, 
                   recurso_id: int, 
                   sessao_db: Session = Depends(db.get_db)):
    
    recurso_escolhido = sessao_db.query(models.Recurso).filter(models.Recurso.id == recurso_id).first()

    if recurso_escolhido is None: raise HTTPException(status_code=404, detail="Recurso não encontrado")

    recurso_escolhido.titulo = dados_recebidos.titulo
    recurso_escolhido.descricao = dados_recebidos.descricao
    recurso_escolhido.tipo = dados_recebidos.tipo
    recurso_escolhido.link = dados_recebidos.link
    recurso_escolhido.tags = dados_recebidos.tags

    sessao_db.commit()
    sessao_db.refresh(recurso_escolhido)
    
    return recurso_escolhido

@app.delete('/recursos/{recurso_id}')
def deletar_recurso(recurso_id: int, sessao_db: Session = Depends(db.get_db)):
    recurso_escolhido = sessao_db.query(models.Recurso).filter(models.Recurso.id == recurso_id).first()

    if recurso_escolhido is None: raise HTTPException(status_code=404, detail="Recurso não encontrado")

    sessao_db.delete(recurso_escolhido)
    
    sessao_db.commit()

    return {"message": "Recurso deletado com sucesso"}


@app.post("/recursos/assist", response_model=schemas.SmartAssistResponse)
def smartAssist(titulo_e_tipo: schemas.SmartAssistRequest,):
    

    inicio = time.time()
    prompt = f'''Você é um assistente pedagógico. Gere uma descrição didática de até 2 parágrafos e 3 tags relevantes sobre um material com esse título: "{titulo_e_tipo.titulo}". O material é deste tipo: "{titulo_e_tipo.tipo}". 
    SUA RESPOSTA DEVE SER EXATAMENTE UM JSON VALIDO no formato:
    {{
        "descricao": "...",
        "tags": ["tag1", "tag2", "tag3"]
    }}
    Não escreva nada além do JSON. Não inclua blocos de código markdown.'''
    
    resposta = cliente_gemini.models.generate_content(model='gemini-2.5-flash', contents=prompt)
    
    fim = time.time()
    latencia = fim - inicio

    tokens = resposta.usage_metadata.total_token_count if resposta.usage_metadata else 0

    logging.info(f'AI Request: Title="{titulo_e_tipo.titulo}", Token Usage={tokens}, Latency={latencia:.2f}s')

    texto_limpo = resposta.text.replace('```json', '').replace('```', '').strip()
    dicionario = json.loads(texto_limpo)

    return dicionario