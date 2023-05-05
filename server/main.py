
from fastapi import FastAPI
# from utils import verify_authorization_header
from services import Students
from services import Classes
from services import Login_user
from services import Teacher
from services import Faculties
from fastapi.middleware.cors import CORSMiddleware
# from fastapi_auth_middleware import AuthMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:3000",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(Students.route)
app.include_router(Classes.route)
app.include_router(Login_user.route)
app.include_router(Teacher.route)
app.include_router(Faculties.route)
# app.add_middleware(AuthMiddleware, verify_header=verify_authorization_header)
