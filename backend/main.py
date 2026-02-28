from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from dotenv import load_dotenv

import schemas, database as db, models

load_dotenv()

models.Base.metadata.create_all(bind=db.engine)

app = FastAPI()

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