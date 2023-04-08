from sqlalchemy import Column,ForeignKey
from config.db import Base, engine
from sqlalchemy.sql.sqltypes import Integer,String,INT
from sqlalchemy.orm import relationship

class Account(Base):
    __tablename__ = "account"

    id = Column( Integer, primary_key = True, index= True)
    username = Column(String(50))
    password = Column(String(50))
    role = Column(INT)
    user_id = Column(ForeignKey("user.id"))

    users = relationship("User", back_populates="accounts") 
 
Base.metadata.create_all(bind=engine)