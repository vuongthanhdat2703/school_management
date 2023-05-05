from sqlalchemy import Column, ForeignKey, Integer, String
from config.db import Base, engine
from sqlalchemy.orm import relationship


class Teacher (Base):
    __tablename__ = "teacher"

    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, unique=True)
    teacher_evaluation = Column(String)
    profile_id = Column(ForeignKey("profile.profile_id"))

    profiles = relationship("Profile", back_populates="teachers")


Base.metadata.create_all(bind=engine)
