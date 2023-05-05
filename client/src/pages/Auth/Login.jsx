import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, setToken } from "../../utils/localstorage";
import { request } from "../../utils/request";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/home");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter full information");
    }
    request
      .post("/user/signin", { username, password })
      .then(({ data }) => {
        if (data.access_token) {
          setToken(data.access_token);
          setTimeout(() => {
            message.success("Login success!");
            navigate("/home");
          }, 500);
        }
      })
      .catch((e) => {
        message.error("Username or Password not found!");
      });
  };

  return (
    <div className="bg-logins">
      <div className="container bg-login">
        <div className="row d-flex justify-content-center ">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card py-3 px-2 ">
              <p className="text-center mb-3 mt-2">Login Other Device</p>
              <div className="row mx-auto ">
                <div className="col-4">
                  <i className="fab fa-twitter"></i>
                </div>
                <div className="col-4">
                  <i className="fab fa-facebook"></i>
                </div>
                <div className="col-4">
                  <i className="fab fa-google"></i>
                </div>
              </div>
              <div className="division">
                <div className="row">
                  <div className="col-3">
                    <div className="line l"></div>
                  </div>
                  <div className="col-6">
                    <span></span>SIGNIN
                  </div>
                  <div className="col-3">
                    <div className="line r"></div>
                  </div>
                </div>
              </div>
              <form className="myform" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="UserName"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {error && <div>{error}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error && <div>{error}</div>}
                </div>
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <label className="form-check-label" for="exampleCheck1">
                        Remember
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 bn">Change Password</div>
                </div>
                <div className="form-group mt-3">
                  <button
                    type="submit"
                    className="btn btn-block btn-primary btn-lg"
                  >
                    <small>
                      <i className="far fa-user pr-2"></i>SIGNIN
                    </small>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
