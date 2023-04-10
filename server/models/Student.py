from sqlalchemy import Column,ForeignKey ,Integer, String
from config.db import Base,engine
from sqlalchemy.orm import relationship

class Student (Base):
    __tablename__ = "student"

    student_id = Column (Integer, primary_key=True,index=True)
    
    address = Column(String(50))    
    user_id = Column(ForeignKey("user.id"))
    class_id = Column(ForeignKey("class.class_id"))
    
    # profiles = relationship ("Profile", back_populates="students")
    # classes = relationship ("Class" ,back_populates="students")

Base.metadata.create_all(bind=engine)


