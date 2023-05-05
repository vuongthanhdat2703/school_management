import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap"
import './Class.css'
import ClassForm from './ClassForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { request } from "../../utils/request";
import { message } from "antd";
import { AppContext } from "../../App";
import AuthLayout from "../../layout/AuthLayout";

function Classes() {
    const [classes, setClasses] = useState([]);
    const [showClassForm, setShowClassForm] = useState(false);
    const [classData, setClassData] = useState(null);
    const { isAdmin } = useContext(AppContext)
    // Watch information
    useEffect(() => {
        request.get("/class")
            .then(response => {
                setClasses(response.data);
            })
    }, []);
    // Delete class
    const handleDelete = (class_id) => {
        const newClasses = [...classes];
        request.delete(`/class/${class_id}`)
            .then(response => {
                // console.log(response);
                setClasses(classes.filter(item => item.class_id !== class_id));
                message.success('Delete Class success!')
            })
    };
    const handleEdit = (class_bd) => {
        setClassData(class_bd)
        setShowClassForm(true);
    };

    const handleAddClass = () => {
        setShowClassForm(true);
        setClassData(undefined)
    };

    const handleCloseClassForm = () => {
        setShowClassForm(false);
    };

    const handleSaveClassForm = (newClass) => {
        if (newClass && classData && newClass.class_id === classData.class_id) {
            setClasses(classes.map(item => (item.class_id === newClass.class_id ? newClass : item)))
            message.success('Edit Class success!')
        } else {
            setClasses([newClass, ...classes])
            message.success('Add Class success!')
        }
    };

    return (
        <AuthLayout>
            <div className="container class_form">
                <div className="class_form_text d-flex mb-5">
                    <h1 >Class</h1>
                    {isAdmin && (
                        <Button variant="primary" onClick={handleAddClass}><i className="mr-2"><FontAwesomeIcon icon={faPlus} /></i>Add Class</Button>
                    )}

                </div>
                <ClassForm
                    show={showClassForm}
                    onClose={handleCloseClassForm}
                    onSave={handleSaveClassForm}
                    classData={classData}
                />
                <div className="table-class">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ClassID</th>
                                <th>ClassName</th>
                                <th>FacultyName</th>
                                {isAdmin && (
                                    <th>Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((class_bd) => (
                                <tr key={class_bd.class_id}>
                                    <td>{class_bd.class_id}</td>
                                    <td>{class_bd.class_name}</td>
                                    <td>{class_bd.faculty_name}</td>
                                    {isAdmin && (
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(class_bd.class_id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleEdit(class_bd)}
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </AuthLayout>
    )
}
export default Classes