# from fastapi import APIRouter, HTTPException, Depends
# from sqlalchemy.orm import Session
# from config.db import get_db
# from models.Faculty import Faculty
# from schemas.Faculty import Faculty as FacultySchema

# route = APIRouter()

# @route.get("/faculty/{faculty_id}", response_model=FacultySchema)
# def read_faculty(faculty_id: int, db: Session = Depends(get_db)):
#     faculty = db.query(Faculty).filter(Faculty.faculty_id == faculty_id).first()
#     if not faculty:
#         raise HTTPException(status_code=404, detail="Faculty not found")
#     return faculty