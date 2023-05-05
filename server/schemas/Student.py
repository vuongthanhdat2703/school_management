
from pydantic import BaseModel


class Student(BaseModel):
    student_id: int
    address: str
    class_name: str
    profile_email: str
