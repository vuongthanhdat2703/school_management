from sqlalchemy import Column,ForeignKey ,Integer, String
from config.db import Base,engine
from sqlalchemy.orm import relationship

class Student (Base):
    __tablename__ = "student"

    id = Column (Integer, primary_key=True,index=True)
    student_id = Column(Integer)
    address = Column(String(50))    
    profile_id = Column(ForeignKey("profile.id"))
    class_id = Column(ForeignKey("class.class_id"))
    
    # profiles = relationship ("Profile", back_populates="students")
    # classes = relationship ("Class",back_populates="students")

Base.metadata.create_all(bind=engine)
