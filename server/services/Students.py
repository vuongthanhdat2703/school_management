from config.db import get_db
from fastapi import APIRouter, Depends, HTTPException
from models.Class import Class

from models.Profile import Profile
from models.Student import Student
from schemas.Student import Student as studentSchemas
from sqlalchemy.orm import Session

route = APIRouter()


@route.get("/get_student")
def read_student(db: Session = Depends(get_db)):
    students = db.query(Student, Profile, Class).join(
        Profile).join(Class).all()

    if not students:
        raise HTTPException(status_code=404, detail="Student not found")
    student_list = []
    for student in students:
        student_dict = student[0].__dict__
        # Remove the profile_id key from the dictionary
        student_dict.pop('_sa_instance_state')
        # Access the id of the student directly
        student_dict['profile_id'] = student_dict.pop('profile_id')
        profile_dict = student[1].__dict__
        class_dict = student[2].__dict__
        student_dict.update(profile_dict)
        student_dict.update(class_dict)
        student_list.append(student_dict)
    return student_list


# @route.get("/student/{student_id}")
# def read_student(student_id: int, db: Session = Depends(get_db)):
#     student = db.query(Student, Profile).filter(
#         Student.id == student_id).join(Profile).first()

#     if not student:
#         raise HTTPException(status_code=404, detail="Student not found")

#     student_dict = student[0].__dict__
#     profile_dict = student[1].__dict__
#     del student_dict["_sa_instance_state"]
#     del profile_dict["_sa_instance_state"]
#     student_dict.update(profile_dict)

#     return student_dict


@route.post("/student/new")
def create_student(body: studentSchemas, db: Session = Depends(get_db)):
    try:
        profile = db.query(Profile).filter(
            Profile.email == body.profile_email).first()

        class_ = db.query(Class).filter(
            Class.class_name == body.class_name).first()

        if not profile:
            raise HTTPException(status_code=400, detail="Bad student!")

        new_student = Student(
            student_id=body.student_id,
            address=body.address,
            class_id=class_.class_id,
            profile_id=profile.profile_id,
        )
        db.add(new_student)
        db.commit()
        db.refresh(new_student)

        return {"message": "New account student!"}
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=400, detail="Bad student information !")


# tạo api cập nhật profile theo id
@route.put("/student/{id}")
def update_student(id: int, body: studentSchemas, db: Session = Depends(get_db)):
    try:
        profile = db.query(Profile).filter(
            Profile.email == body.profile_email).first()

        class_ = db.query(Class).filter(
            Class.class_name == body.class_name).first()

        if not profile:
            raise HTTPException(status_code=400, detail="Bad student!")
        student = db.query(Student).filter(Student.id == id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")
        student.student_id = body.student_id
        student.address = body.address
        student.class_id = class_.class_id
        student.profile_id = profile.profile_id

        db.commit()
        db.refresh(student)
        return {"message": "Student updated!"}
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=400, detail="Bad student information !")


@route.delete("/student/{id}")
def delete_item(id: int, db: Session = Depends(get_db)):
    db_student = db.query(Student).filter(Student.id == id).first()
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    db_profile = db.query(Profile).filter(
        Profile.id == db_student.profile_id).first()
    db.delete(db_student)
    db.delete(db_profile)
    db.commit()
    return {"message": "Student deleted successfully"}
