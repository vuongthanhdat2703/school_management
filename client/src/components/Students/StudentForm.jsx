import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { request } from "../../utils/request";

function StudentForm(props) {
    const [formDataStudent, setFormDataStudent] = useState({});

    useEffect(() => {
        setFormDataStudent({
            ...props.sutdentData,
            student_id: props.studentData ? props.studentData.student_id : "",
            address: props.studentData ? props.studentData.address : "",
            class_name: props.studentData ? props.studentData.class_name : "",
            profile_email: props.studentData ? props.studentData.profile_email : "",
        });
    }, [props.studentData]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormDataStudent({ ...formDataStudent, [name]: value });
    };

    const handleSave = () => {
        if (props.studentData) {
            // If studentData is present, update the existing student
            request
                .put(`/student/${props.studentData.id}`, formDataStudent)
                .then((response) => {
                    props.onSave(response.data);
                    handleClose();

                });
        } else {
            // If studentData is not present, create a new student
            request.post("/student/new", formDataStudent).then((response) => {
                props.onSave(response.data);
                handleClose();
            });
        }

        // console.log(formDataStudent)
    };
    //cloes form
    const handleClose = () => {
        setFormDataStudent({
            student_id: "",
            address: "",
            class_name: "",
            profile_email: "",
        });
        props.onClose();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
    };
    return (
        <form onSubmit={handleSubmit}>
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {props.studentData ? "Edit Student" : "Add Student"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formStudentId">
                            <Form.Label>StudentID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="StudentID"
                                name="student_id"
                                value={formDataStudent.student_id}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Address"
                                name="address"
                                value={formDataStudent.address}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formClassID">
                            <Form.Label>ClassID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="ClassID"
                                name="class_name"
                                value={formDataStudent.class_name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formProfileID">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Email"
                                name="profile_email"
                                value={formDataStudent.profile_email}
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

export default StudentForm;
