import { faPlus, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { AppContext } from "../../App";
import AuthLayout from "../../layout/AuthLayout";
import { request } from "../../utils/request";
import "./User.css";
import UserForm from "./UserFrom";

function User() {
  const [userData, setUserData] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [user, setUser] = useState([]);
  const { isAdmin } = useContext(AppContext);
  // Delete user
  const handleDelete = (id) => {
    const newUser = [...user];
    request.delete(`/profile/${id}`).then((response) => {
      // console.log(response);
      setUser(user.filter((item) => item.id !== id));
      message.success("Delete User success!");
    });
  };

  // Watch information
  useEffect(() => {
    getUser()
  }, []);

  const getUser = () => {
    request.get("/get_profile").then((response) => {
      setUser(response.data);
    });
  }
  const handleEdit = (user_bd) => {
    setUserData(user_bd);
    setShowUserForm(true);
  };

  const handleAddUser = () => {
    setShowUserForm(true);
    setUserData(undefined);
  };

  const handleCloseUserForm = () => {
    setShowUserForm(false);
  };

  const handleSaveUserForm = (newUser) => {
    if (newUser && userData && newUser.id === userData.id) {
      setUser(user.map((item) => (item.id === newUser.id ? newUser : item)));
      message.success("Edit User success!");
    } else {
      setUser([newUser, ...user]);
      message.success("Add User success!");
    }
  };

  return (
    <AuthLayout>
      <div className="container user_form">
        <div className="user_form_text d-flex mb-5">
          <h1>User</h1>
          {isAdmin && (
            <Button variant="primary" onClick={handleAddUser}>
              <i className="mr-2">
                <FontAwesomeIcon icon={faPlus} />
              </i>
              Add User
            </Button>
          )}
        </div>
        <UserForm
          show={showUserForm}
          onClose={handleCloseUserForm}
          onSave={handleSaveUserForm}
          userData={userData}
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>LastName</th>
              <th>FisrtName</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Email</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {user.map((user_bd) => (
              <tr key={user_bd.id}>
                <td>{user_bd.id}</td>
                <td>{user_bd.lastname}</td>
                <td>{user_bd.firstname}</td>
                <td>{user_bd.gender}</td>
                <td>{user_bd.phone}</td>
                <td>{user_bd.email}</td>
                {isAdmin && (
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user_bd.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(user_bd)}
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
    </AuthLayout>
  );
}
export default User;
