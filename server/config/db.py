from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
engine = create_engine ('mysql+pymysql://root:27032001@127.0.0.1:3306/school_management_system')
meta = MetaData()
Base = declarative_base()
conn = engine.connect()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()