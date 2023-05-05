import { faPlus, faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import AuthLayout from "../../layout/AuthLayout";
import { request } from "../../utils/request";
import "./Student.css";
import StudentForm from "./StudentForm";

function Student() {
  const [students, setStudents] = useState([]);
  const [showStudentData, setShowStudentData] = useState(false);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    getStudent()
  }, []);
  const getStudent = () => {
    request.get("/get_student").then((response) => {
      setStudents(response.data);
    });
  }
  const handleDelete = (id) => {
    const newStudent = [...students];
    request.delete(`/student/${id}`).then((response) => {
      // console.log(response);
      setStudents(students.filter((item) => item.id !== id));
      message.success("Delete Student success!");
    });
  };
  const handleEdit = (body) => {
    setStudentData(body);
    setShowStudentData(true);
  };
  const handlAppStudent = () => {
    setShowStudentData(true);
    setStudentData(undefined);
  };
  const handleCloseClassForm = () => {
    setShowStudentData(false);
  };
  const handleSaveStudentForm = (newStudent) => {
    if (newStudent && studentData && newStudent.id === studentData.id) {
      setStudents(
        students.map((item) => (item.id === newStudent.id ? newStudent : item))
      );
      message.success("Edit Student success!");
    } else {
      setStudents([newStudent, ...students]);
      message.success("Add Student success!");
    }
  };
  return (
    <AuthLayout>
      <div className="container student_form">
        <div className="student_form_text">
          <h1>Student</h1>
          <Button variant="primary" onClick={handlAppStudent}>
            <i className="mr-2">
              <FontAwesomeIcon icon={faPlus} />
            </i>
            Add Student
          </Button>
        </div>
        <StudentForm
          show={showStudentData}
          onClose={handleCloseClassForm}
          onSave={handleSaveStudentForm}
          onRefresh={getStudent}
          studentData={studentData}
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>StudentID</th>
              <th>LastName</th>
              <th>FirstName</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Email</th>
              <th>Day Of Birth</th>
              <th>Phone</th>
              <th>ClassName</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((body) => (
              <tr key={body.id} >
                <td>{body.id}</td>
                <td>{body.student_id}</td>
                <td>{body.lastname}</td>
                <td>{body.firstname}</td>
                <td>{body.gender}</td>
                <td>{body.address}</td>
                <td>{body.email}</td>
                <td>{body.birthday}</td>
                <td>{body.phone}</td>
                <td>{body.class_name}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(body.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(body)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </td>
              </tr>
            ))}


          </tbody>
        </Table>
      </div>
    </AuthLayout>
  );
}

export default Student;
