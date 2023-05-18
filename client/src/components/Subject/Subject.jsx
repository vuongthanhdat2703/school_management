import { faPenToSquare, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { Table } from "react-bootstrap";
import AuthLayout from "../../layout/AuthLayout";
import { request } from "../../utils/request";
import SubjectForm from "./SubjectForm";
import { AppContext } from "../../App";
import './Subject.css'
import Pagination from 'react-bootstrap/Pagination';


function Subject() {
  const [subjects, setSubjects] = useState([]);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [subjectData, setSubjectData] = useState(null);
  const { isAdmin } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // console.log(subjects)

  useEffect(() => {
    request.get("/get_subject").then((response) => {
      setSubjects(response.data);
    });
  }, []);

  const handleDelete = (subject_id) => {
    const newSubjects = [...subjects];
    request.delete(`/subject/${subject_id}`).then((response) => {
      setSubjects(subjects.filter((item) => item.subject_id !== subject_id));
      message.success("Delete Subject success!");
    });
  };

  const handleEdit = (body) => {
    setSubjectData(body);
    setShowSubjectForm(true);
  };

  const handleAddSubject = () => {
    setShowSubjectForm(true);
    setSubjectData(undefined);
  };

  const handleCloseSubjectForm = () => {
    setShowSubjectForm(false);
  };

  const handleSaveSubjectForm = (newSubject) => {
    if (newSubject && subjectData && newSubject.id === subjectData.id) {
      setSubjects(
        subjects.map((item) => (item.id === newSubject.id ? newSubject : item))
      );
      message.success("Edit Subject success!");
    } else {
      setSubjects([newSubject, ...subjects]);
      message.success("Add Subject success!");
    }
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subjects.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <AuthLayout>
      <div className="container subject_form">
        <div className="subject_form_text d-flex mb-5">
          <h1 className="">Subject</h1>
          {isAdmin && (
            <button className="btn btn-primary" onClick={handleAddSubject}>
              <i className="mr-2">
                <FontAwesomeIcon icon={faPlus} />
              </i>
              Add Subject
            </button>
          )}

        </div>
        <SubjectForm
          show={showSubjectForm}
          onClose={handleCloseSubjectForm}
          onSave={handleSaveSubjectForm}
          subjectData={subjectData}
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject Name</th>
              <th>Credit Units</th>
              <th>Semeter</th>
              <th>Class Name</th>
              <th>Teacher Name</th>
              {isAdmin && (
                <th>Actions</th>
              )}

            </tr>
          </thead>
          <tbody>
            {currentItems.map((body) => (
              <tr key={body.subject_id}>
                <td>{body.subject_id}</td>
                <td>{body.subject_name}</td>
                <td>{body.credit_units}</td>
                <td>{body.semeter}</td>
                <td>{body.class_name}</td>
                <td>{`${body.firstname} ${body.lastname}`}</td>
                {isAdmin && (
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
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {subjects.length > 0 && (
            <>
              {subjects.map((_, index) => (
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
            disabled={indexOfLastItem >= subjects.length}
          />
        </Pagination>
      </div>
    </AuthLayout>
  );
}

export default Subject;
