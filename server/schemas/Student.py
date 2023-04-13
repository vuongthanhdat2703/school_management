
from pydantic import BaseModel


class Student(BaseModel):
    student_id :int
    address:str
    class_id: int
    profile_email:str
    