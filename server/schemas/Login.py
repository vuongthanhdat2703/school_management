from pydantic import BaseModel

class Logins(BaseModel):
    username: str
    password: str
    role : int
    userID: int

