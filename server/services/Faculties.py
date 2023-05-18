from fastapi import APIRouter, Depends
from starlette.authentication import requires
from sqlalchemy.orm import Session
from config.db import get_db
from models.Faculty import Faculty


route = APIRouter()


@route.get('/faculty/{id}')
def read_facultyID(id: int, db: Session = Depends(get_db)):
    faculties = db.query(Faculty).filter(Faculty.id == id).first()

    if not faculties:
        raise HTTPException(status_code=404, detail="Faculty not found")

    return faculties


@route.get('/get_faculty')
def read_facultyID(db: Session = Depends(get_db)):
    faculties = db.query(Faculty).all()

    if not faculties:
        raise HTTPException(status_code=404, detail="Faculty not found")

    return faculties
