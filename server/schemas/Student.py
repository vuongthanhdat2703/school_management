
from schemas.Profile import Profile


class Student(Profile):
    student_id :int
    address:str
    class_id: int
    