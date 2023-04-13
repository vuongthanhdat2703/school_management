from pydantic import BaseModel


class Teacher(BaseModel):
    teacher_id:int
    teacher_evaluation:str
    profile_email:str
    