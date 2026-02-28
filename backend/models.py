from database import Base
from sqlalchemy import Integer, String, Column, Text, ARRAY

class Recurso(Base):

    __tablename__ = "recursos"

    id = Column(Integer, primary_key=True)

    titulo = Column(String, nullable=False)
    descricao = Column(Text, nullable=True)
    tipo = Column(String, nullable=False)
    link = Column(String, nullable=False)
    tags = Column(ARRAY(String), default=[])
