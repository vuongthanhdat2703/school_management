from sqlalchemy import Column,ForeignKey
from config.db import Base, engine
from sqlalchemy.sql.sqltypes import Integer,String,INT
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "user"

    id = Column( Integer, primary_key = True, index= True)
    username = Column(String,unique=True)
    password = Column(String)
    role = Column(INT)
    
    profiles = relationship("Profile", back_populates="user") 
 
Base.metadata.create_all(bind=engine)