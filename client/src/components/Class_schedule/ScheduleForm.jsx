import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { request } from '../../utils/request';

function ScheduleForm(props) {
    const [formDataSchedule, setFormDataSchedule] = useState({});
    const [subjectList, setSubjectList] = useState([]);
    const [listTeacher, setListTeacher] = useState([])

    useEffect(() => {
        setFormDataSchedule({
            ...props.scheduleData,
            subject_id: props.scheduleData ? props.scheduleData.subject_id : "",
            start_time: props.scheduleData ? props.scheduleData.start_time : "",
            end_time: props.scheduleData ? props.scheduleData.end_time : "",
            id: props.scheduleData ? props.scheduleData.id : "",
            classroom: props.scheduleData ? props.scheduleData.classroom : "",
        })
    }, [props.scheduleData])

    useEffect(() => {
        request.get("/get_subject")
            .then(response => {
                setSubjectList(response.data);
            })
    }, []);

    useEffect(() => {
        request.get("/get_teacher").then((response) => {
            setListTeacher(response.data);
        });
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormDataSchedule({ ...formDataSchedule, [name]: value });
    };

    const handleSave = () => {
        if (props.scheduleData) {
            // If classData is present, update the existing class
            request.put(`/class/${props.scheduleData.class_id}`, formDataSchedule)
                .then((response) => {
                    props.onSave(response.data);
                    handleClose();
                })
        } else {// If classData is not present, create a new class
            console.log({ formDataSchedule })
            request.post("/class/new", formDataSchedule)
                .then((response) => {
                    console.log(response)
                    props.onSave(response.data)
                    handleClose();
                })
        }
    };

    const handleClose = () => {
        setFormDataSchedule({
            subject_id: "",
            start_time: "",
            end_time: "",
            id: "",
            classroom: "",
        });
        props.onClose();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit}>
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.classData ? 'Edit Class' : 'Add Class'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formSubject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Select
                                name="subject_id"
                                value={formDataSchedule.subject_id}
                                onChange={handleChange}
                            >
                                {subjectList.map((body) => (
                                    <option key={body.subject_id} value={body.subject_id}>
                                        {body.subject_name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formStartTime">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="start_time"
                                value={formDataSchedule.start_time}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEndTime">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="end_time"
                                value={formDataSchedule.end_time}
                                onChange={handleChange}
                            />

                        </Form.Group>

                        <Form.Group controlId="formTeacherName">
                            <Form.Label>Teacher Name</Form.Label>
                            <Form.Select
                                name="id"
                                value={formDataSchedule.id}
                                onChange={handleChange}
                            >
                                {listTeacher.map((body) => (
                                    <option key={body.id} value={body.id}>
                                        {`${body.firstname} ${body.lastname}`}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formClassroom">
                            <Form.Label>Classroom</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Classroom"
                                name="classroom"
                                value={formDataSchedule.classroom}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </form>

    );
}
export default ScheduleForm;