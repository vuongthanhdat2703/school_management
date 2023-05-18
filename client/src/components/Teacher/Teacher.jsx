import {
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { Button, Table } from "react-bootstrap";
import AuthLayout from "../../layout/AuthLayout";
import { request } from "../../utils/request";
import { AppContext } from "../../App";
import Pagination from 'react-bootstrap/Pagination';


import "./Teacher.css";
import TeacherForm from "./TeacherForm";
function Teacher() {
  const [teachers, setTeachers] = useState([]);
  const [showTeacherData, setShowTeacherData] = useState(false);
  const [teacherData, setTeacherData] = useState(null);
  const { isAdmin } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    request.get("/get_teacher").then((response) => {
      setTeachers(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    const newTeacher = [...teachers];
    request.delete(`/teacher/${id}`).then((response) => {
      // console.log(response);
      setTeachers(teachers.filter((item) => item.id !== id));
      message.success("Delete Teacher success!");
    });
  };

  const handleEdit = (body) => {
    setTeacherData(body);
    setShowTeacherData(true);
  };

  const handleAppTeacher = () => {
    setShowTeacherData(true);
    setTeacherData(undefined);
  };
  const handleCloseClassForm = () => {
    setShowTeacherData(false);
  };

  const handleSaveTeacherForm = (newTeacher) => {
    if (newTeacher && teacherData && newTeacher.id === teacherData.id) {
      setTeachers(
        teachers.map((item) => (item.id === newTeacher.id ? newTeacher : item))
      );
      message.success("Edit Teacher success!");
    } else {
      setTeachers([newTeacher, ...teachers]);
      message.success("Add Teacher success!");
    }
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = teachers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <AuthLayout>
      <div className="container teacher_form">
        <div className="teacher_form_text d-flex mb-5">
          <h1 >Teacher</h1>
          {isAdmin && (
            <Button variant="primary" onClick={handleAppTeacher}>
              <i className="mr-2">
                <FontAwesomeIcon icon={faPlus} />
              </i>
              Add Teacher
            </Button>
          )}
        </div>
        <TeacherForm
          show={showTeacherData}
          onClose={handleCloseClassForm}
          onSave={handleSaveTeacherForm}
          teacherData={teacherData}
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>TeacherID</th>
              <th>Evaluation</th>
              <th>LastName</th>
              <th>FirstName</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Day Of Birth</th>
              <th>Phone</th>
              {isAdmin && (
                <th>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((body) => (
              <tr key={body.id}>
                <td>{body.id}</td>
                <td>{body.teacher_id}</td>
                <td>{body.teacher_evaluation}</td>
                <td>{body.lastname}</td>
                <td>{body.firstname}</td>
                <td>{body.gender}</td>
                <td>{body.email}</td>
                <td>{body.birthday}</td>
                <td>{body.phone}</td>
                {isAdmin && (<td>
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
                </td>)}
              </tr>
            ))}

          </tbody>
        </Table>
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {teachers.length > 0 && (
            <>
              {teachers.map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </>
          )}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastItem >= teachers.length}
          />

        </Pagination>
      </div>
    </AuthLayout>
  );
}

export default Teacher;
