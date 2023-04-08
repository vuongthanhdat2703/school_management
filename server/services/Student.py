from fastapi import APIRouter, HTTPException,Depends
from schemas.Student import Students
from config.db import conn,SessionLocal,get_db
from models.Student import Student
from models.Users import User
# from models.Class import Class
from sqlalchemy.orm import Session


route = APIRouter()

@route.get("/student/{student_id}")
def read_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student, User).filter(Student.student_id == student_id).join(User).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    student_dict = student[0].__dict__
    user_dict = student[1].__dict__
    del student_dict["_sa_instance_state"]
    del user_dict["_sa_instance_state"]
    student_dict.update(user_dict)

    return student_dict

@route.post("/student/new", response_model=Students)
def create_student(student_bd :Students,db:Session=Depends(get_db)):

    existing_user = db.query(User).filter(User.email == student_bd.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = User(
        lastname = student_bd.lastname,
        firstname =student_bd.firstname,
        gender = student_bd.gender,
        phone = student_bd.phone,
        email = student_bd.email
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)


    new_student = Student(
        student_id=student_bd.student_id,
        birthDate=student_bd.birthDate,
        address=student_bd.address,
        class_id = student_bd.class_id,
        user_id=new_user.id
    )
    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return {"message": "New account student!"}
# @route.put("/student/{students_id}")
# def update_student (students_id :int,student_bd :Students ):
#     db_student = db.query(Student).filter(Student.student_id == students_id).first()
#     if not db_student:
#         raise HTTPException(status_code=404, detail="Student not found")
#     db_student.student_id = student_bd.student_id
#     db_student.brithDate = student_bd.brithDate
#     db_student.address = student_bd.address
#     db.commit()
#     return db_student

# @route.delete("/student/{students_id}")
# def delete_item(students_id: int):
#     db = SessionLocal()
#     db_student = db.query(Student).filter(Student.student_id == students_id).first()
#     if not db_student:
#         raise HTTPException(status_code=404, detail="Student not found")
#     db.delete(db_student)
#     db.commit()
#     return {"message": "Student deleted successfully"}

