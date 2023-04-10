
from fastapi import FastAPI
# from services import Login_admin
# from services import Student
from services import Login_user
# from services import Class
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = "http://localhost:3000",
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

# app.include_router(Login_admin.route)
# app.include_router(Student.route)
# app.include_router(Class.route)
app.include_router(Login_user.route)