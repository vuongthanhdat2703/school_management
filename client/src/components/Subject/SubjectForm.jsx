import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { request } from "../../utils/request";

function Subject(props) {
    const [formData, setFormData] = useState({});
    const [listTeacher, setListTeacher] = useState([])
    const [listClass, setListClass] = useState([])
    // console.log(listTeacher)

    useEffect(() => {
        setFormData({
            ...props.subjectData,
            subject_name: props.subjectData ? props.subjectData.subject_name : "",
            credit_units: props.subjectData ? props.subjectData.credit_units : "",
            semeter: props.subjectData ? props.subjectData.semeter : "",
            class_id: props.subjectData ? props.subjectData.class_id : "",
            id: props.subjectData ? props.subjectData.id : "",

        });
    }, [props.subjectData]);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value });
    };
    useEffect(() => {
        request.get("/get_teacher").then((response) => {
            setListTeacher(response.data);
        });
    }, []);

    useEffect(() => {
        request.get("/class").then((response) => {
            setListClass(response.data);
        });
    }, []);
    const handleSave = () => {
        if (props.subjectData) {
            // If subjectData is present, update the existing subject
            request
                .put(`/subjects/${props.subjectData.subject_id}`, formData)
                .then((response) => {
                    props.onSave(response.data);
                    handleClose();
                });
        } else {
            // If subjectData is not present, create a new subject
            request.post("/subjects/new", formData).then((response) => {
                props.onSave(response.data);
                handleClose();
            });
        }
    };

    const handleClose = () => {
        setFormData({
            subject_name: "",
            credit_units: "",
            semeter: "",
            class_id: "",
            id: "",
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
                        {props.subjectData ? "Edit Subject" : "Add Subject"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formSubjectName">
                            <Form.Label>Subject Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Subject Name"
                                name="subject_name"
                                value={formData.subject_name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formCreditUnits">
                            <Form.Label>Credit Units</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Credit Units"
                                name="credit_units"
                                value={formData.credit_units}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formSemester">
                            <Form.Label>Semester</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Semester"
                                name="semeter"
                                value={formData.semeter}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formClassName">
                            <Form.Label>Class Name</Form.Label>
                            <Form.Select
                                name="class_id"
                                value={formData.class_id}
                                onChange={handleChange}
                            >
                                {listClass.map((body) => (
                                    <option key={body.class_id} value={body.class_id}>
                                        {body.class_name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formTeacherName">
                            <Form.Label>Teacher Name</Form.Label>
                            <Form.Select
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                            >
                                {listTeacher.map((body) => (
                                    <option key={body.id} value={body.id}>
                                        {`${body.firstname} ${body.lastname}`}
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
        </form>
    );
}
export default Subject;