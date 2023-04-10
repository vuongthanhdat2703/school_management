from fastapi import APIRouter,HTTPException,Depends
from fastapi_jwt_auth import AuthJWT
from models.Profile import Profile
from models.Users import User
from config.db import get_db
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from schemas import SigninUser ,Setting, SignupUser
from utils import hash_pwd ,check_pwd

route = APIRouter()


@AuthJWT.load_config
def get_config():
    return Setting()

@route.post("/user/signin")
def sign_in (user : SigninUser ,auth: AuthJWT = Depends(), db : Session = Depends(get_db)):
    account_user = db.query(User).filter(User.username == user.username).first()
    if not account_user:
        raise HTTPException(status_code=401,detail="Bad username or password")
    print(account_user.password)
    is_valid_passwd_user = check_pwd(user.password, account_user.password)
    if not is_valid_passwd_user:
        raise HTTPException(status_code=401,detail="Bad username or password")
    
    access_token = auth.create_access_token(subject=user.username)
    refresh_token = auth.create_refresh_token(subject=user.username)
    return {"access_token": access_token, "refresh_token": refresh_token}

@route.get('/refresh')
def refresh(auth: AuthJWT = Depends()):
    auth.jwt_refresh_token_required()
    current_user = auth.get_jwt_subject()
    access_token_user = auth.create_access_token(subject=current_user,fresh=False)
    return{"access_token" :access_token_user }


@route.post("/user/signup")
def sign_up(user: SignupUser, db: Session = Depends(get_db)):
    try:
       
        # create new user
        hashed_passwd = hash_pwd(user.password)

        new_user = User(
            username=user.username, 
            password=hashed_passwd
            )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        new_profile = Profile(
            lastname= user.lastname,
            firstname = user.firstname,
            gender = user.gender,
            birthday = user.birthday,
            phone = user.phone,
            email = user.email,
            user_id = new_user.id
        )
        db.add(new_profile)
        db.commit()
        db.refresh(new_profile)
        print(new_profile)
        return {"message": "New account registed!"}
    except:
        raise HTTPException(400, detail="Bad account information")