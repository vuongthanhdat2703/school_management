import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { request } from "../../utils/request";

function TeacherForm(props) {
  const [formDataTeacher, setFormDataTeacher] = useState({});

  useEffect(() => {
    setFormDataTeacher({
      ...props.teacherData,
      teacher_id: props.teacherData ? props.teacherData.teacher_id : "",
      teacher_evaluation: props.teacherData ? props.teacherData.teacher_evaluation : "",
      profile_id: props.teacherData ? props.teacherData.profile_id : "",
    });
  }, [props.teacherData]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormDataTeacher({ ...formDataTeacher, [name]: value });
  };

  const handleSave = () => {
    if (props.teacherData) {
      // If studentData is present, update the existing student
      request
        .put(`/teacher/${props.teacherData.id}`, formDataTeacher)
        .then((response) => {
          props.onSave(response.data);
          handleClose();
        });
    } else {
      // If studentData is not present, create a new student
      request.post("/teacher/new", formDataTeacher).then((response) => {
        props.onSave(response.data);
        handleClose();
      });
    }
  };

  const handleClose = () => {
    setFormDataTeacher({
      teacher_id: "",
      teacher_evaluation: "",
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
            {props.teacherData ? "Edit Teacher" : "Add Teacher"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Teacher ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Teacher ID"
                name="teacher_id"
                value={formDataTeacher.teacher_id}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEvaluation">
              <Form.Label>Evaluation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Evaluation"
                name="teacher_evaluation"
                value={formDataTeacher.teacher_evaluation}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formProfileID">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                name="profile_email"
                value={formDataTeacher.profile_email}
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
export default TeacherForm;
