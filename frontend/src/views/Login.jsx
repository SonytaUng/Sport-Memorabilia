import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Form, Col } from "react-bootstrap";
import "../App.css";
import "../styles/login.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "../styles/main.css";
import "../styles/button.css";
import { useHistory } from "react-router";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameHelp, setUsernameHelp] = useState("");
  const [passwordHelp, setPasswordHelp] = useState("");

  const history = useHistory();

  const url = "http://localhost:5000/api";

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      history.push("/UserProfile");
    }
  });

  async function signin() {
    let doGo = 1;
    if (username.length <= 0) {
      setUsernameHelp("Please enter a username");
      doGo = 0;
    }
    if (password.length <= 0) {
      setPasswordHelp("Please enter a password");
      doGo = 0;
    }
    if (doGo === 1) {
      try {
        let res = await axios.post(url + "/signin", {
          username: username,
          password: password,
        });
        // alert("User logged in");
        Cookies.set("accessToken", res.data.accessToken);
        console.log(Cookies.get("accessToken"));
        history.push("/UserProfile");
      } catch (e) {
        setUsernameHelp("");
        setPasswordHelp("Username and Password do not match");
        console.log(e);
      }
    }
  }

  return (
    <div>
      <Container>
        <div className="form-div mt-5">
          <h1 className="main-font text-center">Sign In</h1>
          <Form>
            <div className="form-flex">
              <div className="form-text">
                <Form.Group className="form-row">
                  <Col sm="">
                    <Form.Floating className="">
                      <Form.Control
                        id="floatingUsername"
                        type="username"
                        placeholder="Username"
                        aria-describedby="usernameHelpBlock"
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                      <Form.Text id="usernameHelpBlock" className="text-danger">
                        {usernameHelp}
                      </Form.Text>
                      <label htmlFor="floatingUsername">Username</label>
                    </Form.Floating>
                  </Col>
                  <br />
                  <Col sm="">
                    <Form.Floating className="">
                      <Form.Control
                        id="floatingPassword"
                        type="password"
                        placeholder="Password"
                        aria-describedby="passwordHelpBlock"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      <label htmlFor="floatingPassword">Password</label>
                      <Form.Text id="passwordHelpBlock" className="text-danger">
                        {passwordHelp}
                      </Form.Text>
                    </Form.Floating>
                  </Col>
                  <br />
                  <Col>
                    <Link to="/ForgotPW">
                      <input
                        type="button"
                        value="Forgot Password?"
                        className="forgot-password-button"
                      />
                    </Link>
                    <span className="ms-5">
                      <span className="ms-5">
                        <input
                          type="button"
                          value="Sign In"
                          className="light-mode-button ps-3 pe-3 pt-2 pb-2 ms-5"
                          onClick={signin}
                        />
                      </span>
                    </span>
                  </Col>
                  <Col className="">
                    <Link to="/Signup">
                      <input
                        type="button"
                        value="Don't have an account yet? Create one here."
                        className="forgot-password-button"
                      />
                    </Link>
                  </Col>
                </Form.Group>
              </div>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
