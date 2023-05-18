
from pydantic import BaseModel
from datetime import datetime


class Schedule(BaseModel):
    classroom: str
    start_time: datetime
    end_time: datetime
    teacher_id: int
    subject_name: str
    student_id: int | None
