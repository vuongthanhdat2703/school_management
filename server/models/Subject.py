from sqlalchemy import Column, ForeignKey, Integer, String
from config.db import Base, engine
from sqlalchemy.orm import relationship


class Subject (Base):
    __tablename__ = "subject"

    subject_id = Column(Integer(), primary_key=True, index=True)
    subject_name = Column(String)
    credit_units = Column(Integer)
    semeter = Column(Integer)
    class_id = Column(ForeignKey("class.class_id"))
    teacher_id = Column(ForeignKey("teacher.id"))
    

    classes = relationship("Class", back_populates="subjects")
    teachers = relationship("Teacher", back_populates="subjects")
    schedules = relationship("Schedule", back_populates="subjects")
