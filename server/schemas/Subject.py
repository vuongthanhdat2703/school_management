from pydantic import BaseModel


class Subject(BaseModel):
    subject_name: str
    credit_units: int
    semeter: int
    class_id: str
    id: int
