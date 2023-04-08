from pydantic import BaseModel

class Users(BaseModel):
    lastname : str
    firstname : str
    gender : str
    phone : int
    email : str

class Setting (BaseModel):
    authjwt_secret_key: str = "secret"

class SigninUser(BaseModel):
    username: str
    password: str