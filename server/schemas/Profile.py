from pydantic import BaseModel
from datetime import date


class Profile(BaseModel):
    lastname: str
    firstname: str
    gender: str
    birthday: date | None
    phone: int
    email: str


class Setting (BaseModel):
    authjwt_secret_key: str = "secret"


class SigninUser(BaseModel):
    username: str
    password: str


class SignupUser(Profile):
    username: str
    password: str
    role: int
