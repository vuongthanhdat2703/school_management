from pydantic import BaseModel

class Users(BaseModel):
    id:int
    username: str
    password: str
    role : int

