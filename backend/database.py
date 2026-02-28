from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

url_database = "postgresql://postgres:301072@localhost:5432/hub_educacional"

# Criação do engine
engine = create_engine(url_database)

# Configuração da sessão
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para modelos
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()