from config.db import get_db
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.db import get_db
from schemas.Subject import Subject as subjectSchemas
from models.Subject import Subject
from models.Class import Class
from models.Teacher import Teacher
from models.Profile import Profile

route = APIRouter()


@route.get("/get_subject")
def read_subject(db: Session = Depends(get_db)):
    subjects = db.query(Subject, Class, Teacher, Profile).join(
        Class).join(Teacher).join(Profile).all()

    subject_list = []
    for subject_ in subjects:
        subject_dict = subject_[0].__dict__
        class_dict = subject_[1].__dict__
        teacher_dict = subject_[2].__dict__
        profile_dict = subject_[3].__dict__
        subject_dict.update(class_dict)
        subject_dict.update(teacher_dict)
        subject_dict.update(profile_dict)
        subject_list.append(subject_dict)
    return subject_list


@route.post("/subjects/new")
def create_subject(body: subjectSchemas, db: Session = Depends(get_db)):
    try:
        class_ = db.query(Class).filter(
            Class.class_id == body.class_id).first()

        teacher = db.query(Teacher).filter(
            Teacher.id == body.id,).first()

        if not teacher:
            raise HTTPException(status_code=400, detail="Bad subject!")

        new_subject = Subject(
            subject_name=body.subject_name,
            credit_units=body.credit_units,
            semeter=body.semeter,
            class_id=class_.class_id,
            teacher_id=teacher.id
        )
        db.add(new_subject)
        db.commit()
        db.refresh(new_subject)

        return new_subject
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=400, detail="Bad subject information !")


@route.put("/subjects/{subject_id}")
def update_subject(subject_id: int, body: subjectSchemas, db: Session = Depends(get_db)):
    try:
        class_ = db.query(Class).filter(
            Class.class_id == body.class_id).first()

        teacher = db.query(Teacher).filter(
            Teacher.id == body.id,).first()

        if not teacher:
            raise HTTPException(status_code=400, detail="Bad subject!")

        subject = db.query(Subject).filter(
            Subject.subject_id == subject_id).first()

        if not subject:
            raise HTTPException(status_code=404, detail="Subject not found")

        subject.subject_name = body.subject_name,
        subject.credit_units = body.credit_units,
        subject.semeter = body.semeter,
        subject.class_id = class_.class_id,
        subject.teacher_id = teacher.id

        db.commit()
        db.refresh(subject)
        return subject
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=400, detail="Bad subject information !")


@route.delete("/subject/{subject_id}")
def delete_item(subject_id: int, db: Session = Depends(get_db)):
    db_subject = db.query(Subject).filter(
        Subject.subject_id == subject_id).first()
    if not db_subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    db.delete(db_subject)
    db.commit()
    return {"message": "Subject deleted successfully"}
