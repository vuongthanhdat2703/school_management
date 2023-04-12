from sqlalchemy import Column
from config.db import Base, engine
from sqlalchemy.sql.sqltypes import Integer,String,INT
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "user"

    id = Column( Integer, primary_key = True, index= True)
    username = Column(String(50),unique=True)
    password = Column(String(255))
    role = Column(INT)
    
    profiles = relationship("Profile", back_populates="users",uselist=False) 
 
Base.metadata.create_all(bind=engine)