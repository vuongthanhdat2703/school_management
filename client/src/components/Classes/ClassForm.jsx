import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { request } from '../../utils/request';

function ClassForm(props) {
    const [formDataClass, setFormDataClass] = useState({});
    const [faculties, setFaculties] = useState([]);

    useEffect(() => {
        getFaculty()
        setFormDataClass({
            ...props.classData,
            class_name: props.classData ? props.classData.class_name : "",
            id: props.classData ? props.classData.id : "",
            faculty_name: props.classData ? props.classData.faculty_name : "",
        })
    }, [props.classData])

    const getFaculty = (id) => {
        request.get(`/faculty/${id}`, formDataClass).then(response => {
            setFaculties(response.data)
        })
    }


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormDataClass({ ...formDataClass, [name]: value });
    };

    const handleSave = () => {
        if (props.classData) {
            // If classData is present, update the existing class
            request.put(`/class/${props.classData.class_id}`, formDataClass)
                .then((response) => {
                    props.onSave(response.data);
                    handleClose();
                })
        } else {// If classData is not present, create a new class
            console.log({ formDataClass })
            request.post("/class/new", formDataClass)
                .then((response) => {
                    console.log(response)
                    props.onSave(response.data)
                    handleClose();
                })
        }
    };
    //cloes form
    const handleClose = () => {
        setFormDataClass({
            class_name: "",
            faculty_name: "",
        });
        props.onClose();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.classData ? 'Edit Class' : 'Add Class'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formClassName">
                        <Form.Label>Class Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="ClassName"
                            name="class_name"
                            value={formDataClass.class_name}
                            onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formFacultyName">
                        <Form.Label>Faculty Name</Form.Label>
                        <Form.Select
                            name="id"
                            value={formDataClass.id}
                            onChange={handleChange}
                        >
                            {faculties.map((faculty) => (
                                <option key={faculty.id} value={faculty.id}>
                                    {faculty.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ClassForm;
