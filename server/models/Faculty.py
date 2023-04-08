from sqlalchemy import Column
from config.db import Base,engine
from sqlalchemy.sql.sqltypes import Integer, String
from sqlalchemy.orm import relationship

class Faculty (Base):
    __tablename__ = "faculty"

    id = Column (Integer, primary_key=True, index=True)
    faculty_name = Column(String(50))
    
    classes = relationship ("Class", back_populates="faculties")

Base.metadata.create_all(bind=engine)
