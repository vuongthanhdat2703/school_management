from sqlalchemy import Column,ForeignKey
from config.db import Base, engine
from sqlalchemy.sql.sqltypes import Integer,String,Date
from sqlalchemy.orm import relationship

class Profile(Base):
    __tablename__ = "profile"

    id = Column(Integer, primary_key= True, index=True)
    lastname = Column (String)
    firstname = Column (String)
    birthday= Column (Date)
    gender = Column (String)
    phone = Column (String)
    email = Column (String,unique=True,index=True)
    user_id = Column(ForeignKey("user.id"))

    users = relationship ("User", back_populates= "profile")
    # students = relationship("Student",back_populates="profile")

Base.metadata.create_all(bind=engine)