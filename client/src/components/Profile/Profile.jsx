import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Profile.css'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastname: 'Nguyen',
            firstname: 'Van A',
            gender: 'male',
            phone: '123456789',
            address: '123 ABC street',
            email: 'example@gmail.com',
        };
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Profile</h1>
                        <div className="profile_user">
                            <div className="avt">
                                <img className="img-profile rounded-circle h-25 w-25"
                                    src="img/undraw_profile.svg" />
                                <p>
                                    <strong>Full Name: </strong>
                                    {this.state.lastname} {this.state.firstname}
                                </p>
                            </div>
                            <div className="information">
                                <p>
                                    <strong>Gender: </strong>
                                    {this.state.gender}
                                </p>
                                <p>
                                    <strong>Phone: </strong>
                                    {this.state.phone}
                                </p>
                                <p>
                                    <strong>Address: </strong>
                                    {this.state.address}
                                </p>
                                <p>
                                    <strong>Email: </strong>
                                    {this.state.email}
                                </p>
                            </div>
                        </div>

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Profile;
