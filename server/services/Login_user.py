from config.db import get_db
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from fastapi_jwt_auth import AuthJWT
from models.Profile import Profile
from models.Users import User
from schemas import Setting, SigninUser, SignupUser
from sqlalchemy.orm import Session
from utils import auth_middleware, check_pwd, hash_pwd

route = APIRouter()


@AuthJWT.load_config
def get_config():
    return Setting()

# @route.get("/get_profile/{id}")
# def read_classID(id: int, db: Session = Depends(get_db)):
#     users = db.query(User,Profile).filter(User.id == id).join(Profile).first()
#     if not users:
#         raise HTTPException(status_code=404, detail="Class not found")

#     user_dict = users[0].__dict__
#     profile_dict = users[1].__dict__
#     del user_dict["_sa_instance_state"]
#     del profile_dict["_sa_instance_state"]
#     user_dict.update(profile_dict)

#     return user_dict


@route.get("/get_profile")
def read_user(db: Session = Depends(get_db)):
    users = db.query(Profile).all()
    return users


@route.get("/get_profile/{profile_id}")
def read_profileId(profile_id: int, db: Session = Depends(get_db)):
    profiles = db.query(Profile, User).filter(
        Profile.profile_id == profile_id).join(User).first()

    if not profiles:
        raise HTTPException(status_code=404, detail="Profile not found")

    profile_dict = profiles[0].__dict__
    user_dict = profiles[1].__dict__
    del profile_dict["_sa_instance_state"]
    del user_dict["_sa_instance_state"]
    profile_dict.update(user_dict)

    return profile_dict


@route.post("/user/signin")
def sign_in(user: SigninUser, auth: AuthJWT = Depends(), db: Session = Depends(get_db)):
    account_user = db.query(User).filter(
        User.username == user.username).first()
    if not account_user:
        raise HTTPException(status_code=401, detail="Bad username or password")
    print(account_user.password)
    is_valid_passwd_user = check_pwd(user.password, account_user.password)
    if not is_valid_passwd_user:
        raise HTTPException(status_code=401, detail="Bad username or password")

    access_token = auth.create_access_token(
        subject=user.username, expires_time=60000*60*24)
    refresh_token = auth.create_refresh_token(subject=user.username)
    return {"access_token": access_token, "refresh_token": refresh_token}


@route.get('/refresh')
def refresh(auth: AuthJWT = Depends()):
    auth.jwt_refresh_token_required()
    current_user = auth.get_jwt_subject()
    access_token_user = auth.create_access_token(
        subject=current_user, fresh=False)
    return {"access_token": access_token_user}


@route.post("/user/signup")
def sign_up(user: SignupUser, db: Session = Depends(get_db)):
    try:

        # create new user
        hashed_passwd = hash_pwd(user.password)

        new_user = User(
            username=user.username,
            password=hashed_passwd,
            role=user.role
        )
        # print(new_user)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        new_profile = Profile(
            lastname=user.lastname,
            firstname=user.firstname,
            gender=user.gender,
            birthday=user.birthday,
            phone=user.phone,
            email=user.email,
            user_id=new_user.id
        )
        print(new_profile)
        db.add(new_profile)
        db.commit()
        db.refresh(new_profile)

        return new_profile
    except Exception as e:
        print(e)
        raise HTTPException(400, detail="Bad account information")


@route.get("/profile")
def get_user_profile(db: Session = Depends(get_db), username: str = Depends(auth_middleware)):
    try:
        if username is not None:
            account = db.query(User, Profile).join(
                Profile).filter(User.username == username).first()
            user = {k: v for k, v in vars(
                account[0]).items() if k != "password"}
            profile = {k: v for k, v in vars(account[1]).items() if k != "id"}
            profile['isAdmin'] = user['role'] == 0
            profile['isStudent'] = user['role'] == 1
            profile['isTeacher'] = user['role'] == 2
            return profile
    except Exception as e:
        print(e)
        raise HTTPException(401, detail="Unauthorized")


# tạo api xóa profile theo id
@route.delete("/profile/{id}")
def delete_profile(id: int, db: Session = Depends(get_db)):
    try:
        db_profile = db.query(Profile).filter(Profile.id == id).first()
        if not db_profile:
            raise HTTPException(status_code=404, detail="Profile not found")
        db_user = db.query(User).filter(User.id == db_profile.user_id).first()
        db.delete(db_profile)
        db.delete(db_user)
        db.commit()
        return {"message": "Profile deleted"}
    except Exception as e:
        print(e)
        raise HTTPException(401, detail="Unauthorized")


# tạp api cập nhật profile
@route.put("/profile/{id}")
def update_profile(id: int, user: SignupUser, db: Session = Depends(get_db)):
    try:
        db_profile = db.query(Profile).filter(Profile.id == id).first()

        if not db_profile:
            raise HTTPException(status_code=404, detail="Profile not found")
        db_profile.username = user.username
        db_profile.password = user.password
        db_profile.role = user.role
        db_profile.lastname = user.lastname
        db_profile.firstname = user.firstname
        db_profile.gender = user.gender
        db_profile.birthday = user.birthday
        db_profile.phone = user.phone
        db_profile.email = user.email

        db.add(db_profile)
        db.commit()
        db.refresh(db_profile)

        return {"message": "Profile updated"}
    except Exception as e:
        print(e)
        raise HTTPException(401, detail="Unauthorized")
