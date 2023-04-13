from fastapi import APIRouter, HTTPException,Depends
from schemas.Teacher import Teacher as teacherSchemas
from config.db import get_db
from models.Teacher import Teacher
from models.Profile import Profile
from sqlalchemy.orm import Session

route = APIRouter()


@route.get("/get_teacher")
def read_teacher (db: Session = Depends(get_db)):
    teacher = db.query(Teacher,Profile).join(Profile).first()

    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    
    teacher_dict = teacher[0].__dict__
    profile_dict = teacher[1].__dict__
    teacher_dict.update(profile_dict)

    return teacher_dict

@route.post("/teacher/new")
def create_teacher(body:teacherSchemas, db: Session = Depends(get_db)):
    try:
        profile = db.query(Profile).filter(Profile.email == body.profile_email).first()

        if not profile:
            raise HTTPException(status_code=400, detail="Bad teacher information!")
        new_teacher = Teacher(
            teacher_id = body.teacher_id,
            teacher_evaluation = body.teacher_evaluation,
            profile_id = profile.id
        )
        db.add(new_teacher)
        db.commit()
        db.refresh(new_teacher)
        return {"message": "New account teacher!"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Bad steacher information!")

# delete teacher
@route.delete("/teacher/{id}")
def delete_item(id: int,db:Session = Depends(get_db)):
        db_teacher = db.query(Teacher).filter(Teacher.id == id).first()
        if not db_teacher:
            raise HTTPException(status_code=404, detail="Student not found")
        db_profile = db.query(Profile).filter(Profile.id == db_teacher.profile_id).first()
        db.delete(db_teacher)
        db.delete(db_profile)
        db.commit()
        return {"message": "Student deleted successfully"}