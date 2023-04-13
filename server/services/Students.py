from fastapi import APIRouter, HTTPException,Depends
from schemas.Student import Student as studentSchemas
from config.db import get_db
from models.Student import Student
from models.Profile import Profile
from models.Class import Class
from models.Faculty import Faculty
from sqlalchemy.orm import Session


route = APIRouter()



@route.get("/get_student")
def read_student( db: Session = Depends(get_db)):
    student = db.query(Student, Profile,Class,Faculty).join(Profile).join(Class).join(Faculty).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    student_dict = student[0].__dict__
    profile_dict = student[1].__dict__
    class_dict = student[2].__dict__
    faculty_dict = student[3].__dict__
    student_dict.update(profile_dict)
    student_dict.update(class_dict)
    student_dict.update(faculty_dict)

    return student_dict

@route.get("/student/{student_id}")
def read_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student, Profile).filter(Student.id == student_id).join(Profile).first()
   
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    student_dict = student[0].__dict__
    profile_dict = student[1].__dict__
    del student_dict["_sa_instance_state"]
    del profile_dict["_sa_instance_state"]
    student_dict.update(profile_dict)

    return student_dict
    
@route.post("/student/new")
def create_student(body :studentSchemas,db:Session=Depends(get_db)):
    try:
        profile = db.query(Profile).filter(Profile.email == body.profile_email).first()

        if not profile:
            raise HTTPException(status_code=400, detail="Bad student!")

        new_student = Student(
            student_id=body.student_id,
            address=body.address,
            class_id = body.class_id,
            profile_id= profile.id ,
        )
        db.add(new_student)
        db.commit()
        db.refresh(new_student)

        return {"message": "New account student!"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Bad student information !")
    

@route.put("/student/{id}")
def update_student (id :int,body:  studentSchemas,db:Session = Depends(get_db)):
    db_student = db.query(Student).filter(Student.id == id).first()
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    db_student.student_id = body.student_id
    db_student.address = body.address
    db_student.class_id = body.class_id

    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

@route.delete("/student/{id}")
def delete_item(id: int,db:Session = Depends(get_db)):
        db_student = db.query(Student).filter(Student.id == id).first()
        if not db_student:
            raise HTTPException(status_code=404, detail="Student not found")
        db_profile = db.query(Profile).filter(Profile.id == db_student.profile_id).first()
        db.delete(db_student)
        db.delete(db_profile)
        db.commit()
        return {"message": "Student deleted successfully"}


