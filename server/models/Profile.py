from config.db import Base, engine
from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Date, Integer, String


class Profile(Base):
    __tablename__ = "profile"

    profile_id = Column(Integer, primary_key=True, index=True)
    lastname = Column(String(45))
    firstname = Column(String(45))
    birthday = Column(Date)
    gender = Column(String(45))
    phone = Column(String(45))
    email = Column(String(45), unique=True, index=True)
    user_id = Column(ForeignKey("user.id", ondelete="CASCADE"), nullable=True)

    users = relationship("User", back_populates="profiles")
    students = relationship("Student", back_populates="profiles")
    teachers = relationship("Teacher", back_populates="profiles")


Base.metadata.create_all(bind=engine)
