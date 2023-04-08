from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from config.db import get_db
from models.Class import Class
from models.Faculty import Faculty
from schemas.Class import Class as ClassSchema

route = APIRouter()



@route.get("/class")
def read_classes(db: Session = Depends(get_db)):
    classes = db.query(Class,Faculty).join(Faculty).all()
    class_list = []
    for class_ in classes:
        class_dict = class_[0].__dict__
        faculty_dict = class_[1].__dict__
        class_dict.update(faculty_dict)
        class_list.append(class_dict)
    return class_list

@route.get("/class/{class_id}")
def read_classID(class_id: int, db: Session = Depends(get_db)):
    classes = db.query(Class,Faculty).filter(Class.class_id == class_id).join(Faculty).first()
    if not classes:
        raise HTTPException(status_code=404, detail="Class not found")
    
    class_dict = classes[0].__dict__
    faculty_dict = classes[1].__dict__
    del class_dict["_sa_instance_state"]
    del faculty_dict["_sa_instance_state"]
    class_dict.update(faculty_dict)

    return class_dict

@route.post("/class/new")
def create_class(class_bd: ClassSchema,db:Session=Depends(get_db)):
    try:
        new_faculty = Faculty(
            faculty_name = class_bd.faculty_name
        )
        db.add(new_faculty)
        db.commit()
        db.refresh(new_faculty)
        
        new_class = Class(
            class_id = class_bd.class_id,
            class_name = class_bd.class_name,
            faculty_id = new_faculty.id
        )

        db.add(new_class)
        db.commit()
        db.refresh(new_class)   
        
        
        return {"message":"New class information "}
    except:
        raise HTTPException(400, detail="Bad class information")
    
@route.put("/class/{class_id}")
def update_class (class_id :int,class_bd: ClassSchema,db:Session = Depends(get_db) ):
    db_class = db.query(Class).filter(Class.class_id == class_id).first()
    if not db_class:
        raise HTTPException(status_code=404, detail="Class not found")
    class_bd.class_id = class_bd.class_id
    class_bd.class_name = class_bd.class_name
    class_bd.faculty_name = class_bd.faculty_name
    db.commit()
    return db_class

@route.delete("/class/{class_id}")
def delete_class(class_id: int,db : Session = Depends(get_db) ):
    db_class = db.query(Class).filter(Class.class_id == class_id).first() 
    if not db_class:
        raise HTTPException(status_code=404, detail="Class not found")
    db.delete(db_class)
    db.commit()
    return {"message": "Class deleted successfully"}

