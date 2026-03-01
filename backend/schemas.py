from pydantic import BaseModel, ConfigDict

class RecursoBase(BaseModel):
    titulo: str
    descricao: str | None = None # para caso o usuário não insira descrição
    tipo: str
    link: str
    tags: list[str] = []


class RecursoCreate(RecursoBase):
    pass

class RecursoResponse(RecursoBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

class SmartAssistRequest(BaseModel):
    titulo: str
    tipo: str

class SmartAssistResponse(BaseModel):
    descricao: str
    tags: list[str]