import React, { useContext, useEffect, useState } from "react";
import AuthLayout from "../../layout/AuthLayout";
import { request } from "../../utils/request";
import './Profile.css'
import { AppContext } from "../../App";


function Profile() {
    const [data, setData] = useState();
    const { profile } = useContext(AppContext)

    const getUserId = async (profile_id) => {
        await request.get(`/get_profile/${profile_id}`).then((response) => {
            setData(response.data);
        });
    };
    useEffect(() => {
        getUserId(profile.profile_id);
    }, [profile]);
    return (
        <AuthLayout>
            {data && (
                <div className="profile_user">
                    <div className="container-fluid ">
                        <div className="row ">
                            <div className="col-sm-4">
                                <div className="avt">
                                    <img
                                        className="img-profile rounded-circle h-50 w-50 mt-3 "
                                        src="/img/undraw_profile.svg"

                                    />
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="mt-5">
                                    <p className="fullname">
                                        {data.firstname}{" "}{data.lastname}

                                    </p>
                                    <p className="">
                                        <a href="/#">{data.email}</a>

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line mt-5"></div>
                    <div className="container-fluid ">
                        <div className="row mt-5">
                            <div className="col-sm-4">
                                <div className="text ml-5 ">
                                    <p>LastName</p>
                                    <p>FirstName</p>
                                    <p>Gender</p>
                                    <p>UserName *</p>
                                    <p>Password *</p>
                                    <p>Phone</p>
                                    <p>Email</p>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="information ">
                                    <p>{data.lastname}</p>
                                    <p>{data.firstname}</p>
                                    <p>{data.gender}</p>
                                    <p>{data.username}</p>
                                    <p>{data.password}</p>
                                    <p>{data.phone}</p>
                                    <p>{data.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
}

export default Profile;
