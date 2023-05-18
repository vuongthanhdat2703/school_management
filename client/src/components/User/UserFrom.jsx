import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { request } from '../../utils/request';

function UserForm(props) {
    const [formDataUser, setFormDataUser] = useState({});

    useEffect(() => {
        setFormDataUser({
            ...props.userData,
            username: props.userData ? props.userData.username : "",
            password: props.userData ? props.userData.password : "",
            role: props.userData ? props.userData.role : "",
            lastname: props.userData ? props.userData.lastname : "",
            firstname: props.userData ? props.userData.firstname : "",
            birthday: props.userData ? props.userData.birthday : "",
            gender: props.userData ? props.userData.gender : "",
            phone: props.userData ? props.userData.phone : "",
            email: props.userData ? props.userData.email : "",
        })
    }, [props.userData])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormDataUser({ ...formDataUser, [name]: value });
    };

    const handleSave = () => {
        if (props.userData) {
            // If userData is present, update the existing class
            request.put(`/profile/${props.userData.id}`, formDataUser)
                .then((response) => {
                    props.onSave(response.data);
                    handleClose();
                })
        } else {// If userData is not present, create a new class
            request.post("/user/signup", formDataUser)
                .then((response) => {
                    console.log(response)
                    props.onSave(response.data)
                    handleClose();
                })
        }
    };
    //cloes form
    const handleClose = () => {
        setFormDataUser({
            username: "",
            password: "",
            role: "",
            lastname: "",
            firstname: "",
            birthday: "",
            gender: "",
            phone: "",
            email: "",
        });
        props.onClose();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.userData ? 'Edit User' : 'Add User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            value={formDataUser.username}
                            onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={formDataUser.password}
                            onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            name='role'
                            value={formDataUser.role}
                            onChange={handleChange}>
                            <option value="0">Admin</option>
                            <option value="1">Student</option>
                            <option value="2">Teacher</option>
                        </Form.Select>


                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                name="lastname"
                                value={formDataUser.lastname}
                                onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                name="firstname"
                                value={formDataUser.firstname}
                                onChange={handleChange} />
                        </Form.Group>

                    </Form.Group>
                    <Form.Group controlId="formGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                            name="gender"
                            value={formDataUser.gender}
                            onChange={handleChange}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control
                            type="date"
                            name="birthday"
                            value={formDataUser.birthday}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter phone number"
                            name="phone"
                            value={formDataUser.phone}
                            onChange={handleChange} />
                    </Form.Group>


                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={formDataUser.email}
                            onChange={handleChange} />
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

export default UserForm;
