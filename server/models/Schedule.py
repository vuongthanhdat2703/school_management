from sqlalchemy import Column, ForeignKey, Integer, String
from config.db import Base, engine
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import DateTime


class Schedule (Base):
    __tablename__ = "schedule"

    schedule_id = Column(Integer, primary_key=True, index=True)
    classroom = Column(String)
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    teacher_id = Column(ForeignKey("teacher.id"))
    student_id = Column(ForeignKey("student.id"))
    subject_id = Column(ForeignKey("subject.subject_id"))

    students = relationship("Student", back_populates="schedules")
    teachers = relationship("Teacher", back_populates="schedules")
    subjects = relationship("Subject", back_populates="schedules")
