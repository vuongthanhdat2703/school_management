
from schemas.Users import Users


class Students (Users):
    student_id :int
    birthDate: str
    address:str
    class_id: int
    