from pydantic import BaseModel


class Faculty(BaseModel):
    id: int
    faculty_name: str
