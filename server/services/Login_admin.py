from fastapi import APIRouter
from schemas.Login import Logins
from config.db import conn
from models.Login import Account

route = APIRouter()

@route.get('/login')
async def fetchLogin():
    logins_admin = []
    for row in conn.execute(Account.select()).fetchall():
        login_data = {
            'ID':row.id,
            'UserName':row.username,
            'Password':row.password,
            'Role':row.role,
        }
        logins_admin.append(login_data)

    return {'data':logins_admin}

@route.post('/api/login')
async def createLogin(student_body :Logins):
    query = conn.execute(Account.select().where(Account.c.username == student_body.username)).fetchone()

    if (student_body.password == query[2]):
        return {"message": "Login successful", "err": False }
    else:
        return {"message": "Login failed", "err": True }
    


    



