
from fastapi import FastAPI
# from services.Login_admin import route
# from services.Student import route
from services.Class import route
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = "http://localhost:3000",
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

app.include_router(route)