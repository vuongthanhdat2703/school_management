from datetime import datetime

from config.db import get_db
from fastapi import APIRouter, Depends, HTTPException, Query, Path
from models.Profile import Profile
from models.Schedule import Schedule
from models.Student import Student
from models.Subject import Subject
from models.Teacher import Teacher
from schemas.Schedule import Schedule as scheduleSchemas
from sqlalchemy.orm import Session
from utils import auth_middleware

route = APIRouter()


@route.get("/get_schedule/{student_id}")
def read_schedule(student_id: int, db: Session = Depends(get_db)):
    try:

        schedules = db.query(Schedule, Student, Subject, Teacher).join(
            Student).join(Subject).join(Teacher).filter(
            Student.student_id == student_id).all()

        if not schedules:
            raise HTTPException(status_code=404, detail="Schedule not found")

        schedule_list = []
        for schedule in schedules:

            schedule_dict = schedule[0].__dict__
            student_dict = schedule[1].__dict__
            teacher_dict = schedule[2].__dict__
            subject_dict = schedule[3].__dict__
            schedule_dict.update(student_dict)
            schedule_dict.update(teacher_dict)
            schedule_dict.update(subject_dict)

            schedule_list.append(schedule_dict)
        return schedule_list

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=400, detail="Bad schedule information !")


@route.post("/schedule/new")
def create_schedule(body: scheduleSchemas, db: Session = Depends(get_db)):
    try:
        teacher = db.query(Teacher).filter(
            Teacher.id == body.teacher_id).first()

        students = db.query(Student).filter(
            Student.id == body.student_id
        ).first()
        print(students)
        subjects = db.query(Subject).filter(
            Subject.subject_name == body.subject_name
        ).first()
        print(subjects)
        if not subjects:
            raise HTTPException(status_code=400, detail="Bad subject!")

        new_schedule = Schedule(
            classroom=body.classroom,
            start_time=body.start_time,
            end_time=body.end_time,
            teacher_id=teacher.id,
            subject_id=subjects.subject_id,
            student_id=students.id
        )

        db.add(new_schedule)
        db.commit()
        db.refresh(new_schedule)

        return new_schedule

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=400, detail="Bad schedule information !")


@route.put("/schedule/{schedule_id}")
def update_schedule(schedule_id: int, body: scheduleSchemas, db: Session = Depends(get_db)):
    try:
        teacher = db.query(Teacher).filter(
            Teacher.id == body.teacher_id).first()
        print(teacher)

        subject = db.query(Subject).filter(
            Subject.subject_name == body.subject_name
        ).first()
        print(subject)
        if not subject:
            raise HTTPException(status_code=400, detail="Bad subject!")

        schedules = db.query(Schedule).filter(
            Schedule.schedule_id == schedule_id).first()

        if not schedules:
            raise HTTPException(status_code=404,
                                detail="Schedule not found")

        schedules.classroom = body.classroom,
        schedules.start_time = body.start_time,
        schedules.end_time = body.end_time,
        schedules.teacher_id = teacher.id,
        schedules.subject_id = subject.subject_id,

        db.commit()
        db.refresh(schedules)
        return schedules

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=400, detail="Bad schedule information !")

# delete schedule


@route.delete("/schedule/{schedule_id}")
def delete_item(schedule_id: int, db: Session = Depends(get_db)):
    db_schedule = db.query(Schedule).filter(
        Schedule.schedule_id == schedule_id).first()
    if not db_schedule:
        raise HTTPException(status_code=404, detail="Schedule not found")
    db.delete(db_schedule)
    db.commit()
    return {"message": "Schedule deleted successfully"}
