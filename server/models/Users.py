from sqlalchemy import Column
from config.db import Base, engine
from sqlalchemy.sql.sqltypes import Integer,String
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key= True, index=True)
    lastname = Column (String(50))
    firstname = Column (String(50))
    gender = Column (String(50))
    phone = Column (String(50))
    email = Column (String(50),unique=True,index=True)

    accounts = relationship ("Account", back_populates= "users")
    students = relationship("Student",back_populates="users")

Base.metadata.create_all(bind=engine)