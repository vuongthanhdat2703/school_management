from fastapi import APIRouter, HTTPException,Depends
from schemas.Student import Student as studentSchemas
from config.db import get_db
from models.Student import Student
from models.Profile import Profile
# from models.Class import Class
from sqlalchemy.orm import Session


route = APIRouter()

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
    
@route.post("/student/new", response_model=studentSchemas)
def create_student(body :studentSchemas,db:Session=Depends(get_db)):
    try:
       
        new_profile = Profile(
            lastname = body.lastname,
            firstname =body.firstname,
            birthday = body.birthday,
            gender = body.gender,
            phone = body.phone,
            email = body.email
        )
        db.add(new_profile)
        db.commit()
        db.refresh(new_profile)


        new_student = Student(
            student_id=body.student_id,
            address=body.address,
            class_id = body.class_id,
            profile_id=new_profile.id
        )
        db.add(new_student)
        db.commit()
        db.refresh(new_student)

        return {"message": "New account student!"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Bad student!")
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

