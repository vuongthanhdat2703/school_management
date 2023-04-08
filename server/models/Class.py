from sqlalchemy import Column,ForeignKey
from config.db import Base,engine
from sqlalchemy.sql.sqltypes import Integer, String
from sqlalchemy.orm import relationship

class Class (Base):
    __tablename__ = "class"
    
    class_id = Column (Integer, primary_key=True)
    class_name = Column(String(50))
    faculty_id = Column(ForeignKey("faculty.id"))
    
    faculties = relationship ("Faculty", back_populates="classes")
    # students = relationship ("Student", back_populates="classes")

Base.metadata.create_all(bind=engine)

