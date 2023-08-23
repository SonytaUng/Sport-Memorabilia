import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Form, Row, Col } from "react-bootstrap";
import "../styles/signup.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "../styles/main.css";
import "../styles/button.css";
import Cookies from "js-cookie";

function Signup() {
  const [username, setUsername] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [tos, setTos] = useState(false);

  const [fnameHelp, setFnameHelp] = useState("");
  const [lnameHelp, setLnameHelp] = useState("");
  const [emailHelp, setEmailHelp] = useState("");
  const [phoneHelp, setPhoneHelp] = useState("");
  const [usernameHelp, setUsernameHelp] = useState("");
  const [password1Help, setPassword1Help] = useState("");
  const [password2Help, setPassword2Help] = useState("");

  const url = "http://localhost:5000/api";

  const history = useHistory();

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      history.push("/UserProfile");
    }
  });

  async function signup() {
    console.log(inputValidation());
    if (inputValidation()) {
      try {
        let res = await axios.post(url + "/signup", {
          username: username,
          email: email,
          first_name: fName,
          last_name: lName,
          password: password1,
          dob: dob,
          phone: phone,
        });
        alert("User successfully created! Please sign in.");
        history.push("/login");
      } catch (e) {
        console.log(e.response.data.error.message);
        switch (e.response.data.error.message) {
          case "Username already exist":
            setUsernameHelp("Username already exists!");
            break;
          case "Email already exist":
            setEmailHelp("Email already exists!");
            break;
          case "Username and Email already exist":
            setUsernameHelp("Username already exists!");
            setEmailHelp("Email already exists!");
            break;
        }
      }
    }
  }

  function inputValidation() {
    let valUsername = alphaCheck(username);
    let valFName = alphaCheck(fName);
    let valLName = alphaCheck(lName);
    let valEmail = emailCheck(email);
    let valPhone = phone.length === 10 && numCheck(phone);
    let valPassword1 = password1.length >= 8;
    let valPassword2 = password1 === password2;

    if (!valUsername) {
      setUsernameHelp("Sorry, only letters and numbers are allowed.");
    } else {
      setUsernameHelp("");
    }
    if (!valFName) {
      setFnameHelp("Are you sure you entered your first name correctly?");
    } else {
      setFnameHelp("");
    }
    if (!valLName) {
      setLnameHelp("Are you sure you entered your last name correctly?");
    } else {
      setLnameHelp("");
    }
    if (!valEmail) {
      setEmailHelp("Please enter a valid email");
    } else {
      setEmailHelp("");
    }
    if (!valPassword1) {
      setPassword1Help("Please enter a password of at least length 8!");
    } else {
      setPassword1Help("");
    }
    if (!valPassword2) {
      setPassword2Help("Passwords do not match");
    } else {
      setPassword2Help("");
    }
    if (!valPhone) {
      setPhoneHelp("Please enter a valid phone number");
    } else {
      setPhoneHelp("");
    }

    return !!(
      valUsername &&
      valFName &&
      valLName &&
      valEmail &&
      valPassword1 &&
      valPassword2 &&
      valPhone &&
      tos
    );
  }

  function alphaCheck(entry) {
    let regex = /^[a-z]+$/i;
    return entry != null && entry.match(regex);
  }

  function numCheck(entry) {
    let regex = /^[0-9]+$/i;
    return entry != null && entry.match(regex);
  }

  function emailCheck(entry) {
    let regex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    return entry != null && entry.match(regex);
  }

  return (
    <div>
      <Container>
        <div className="sign-up-form-div mt-5">
          <h1 className="main-font text-center">Sign Up</h1>
          <Form>
            <div className="form-flex">
              <div className="form-text">
                <Form.Group as={Row} className="form-row">
                  <Col sm="">
                    <Form.Floating className="">
                      <Form.Control
                        id="floatingFName"
                        type="firstName"
                        placeholder="First Name"
                        aria-describedby="fnameHelpBlock"
                        onChange={(e) => {
                          setFName(e.target.value);
                        }}
                      />
                      <label htmlFor="floatingFName">First Name</label>
                      <Form.Text id="fnameHelpBlock" className="text-danger">
                        {fnameHelp}
                      </Form.Text>
                    </Form.Floating>
                  </Col>
                  <Col sm="">
                    <Form.Floating className="">
                      <Form.Control
                        id="floatingLName"
                        type="lastName"
                        placeholder="Last Name"
                        aria-describedby="lnameHelpBlock"
                        onChange={(e) => {
                          setLName(e.target.value);
                        }}
                      />
                      <label htmlFor="floatingLName">Last Name</label>
                      <Form.Text id="lnameHelpBlock" className="text-danger">
                        {lnameHelp}
                      </Form.Text>
                    </Form.Floating>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="form-row">
                  <Col>
                    <Form.Floating className="">
                      <Form.Control
                        id="floatingUsername"
                        type="username"
                        placeholder="username"
                        aria-describedby="usernameHelpBlock"
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                      <label htmlFor="floatingUsername">Username</label>
                      <Form.Text id="usernameHelpBlock" className="text-danger">
                        {usernameHelp}
                      </Form.Text>
                    </Form.Floating>
                  </Col>
                  <Col>
                    <Form.Floating className="">
                      <Form.Control
                        id="floatingEmail"
                        type="email"
                        placeholder="name@example.com"
                        aria-describedby="emailHelpBlock"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <label htmlFor="floatingEmail">Email address</label>
                      <Form.Text id="emailHelpBlock" className="text-danger">
                        {emailHelp}
                      </Form.Text>
                    </Form.Floating>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="form-row">
                  <Col>
                    <Form.Floating className="">
                      <Form.Control
                        id="floatingDOB"
                        type="date"
                        placeholder="Date of Birth"
                        onChange={(e) => {
                          setDob(e.target.value);
                        }}
                      />
                      <label htmlFor="floatingDOB">Date of Birth</label>
                    </Form.Floating>
                  </Col>
                  <Col>
                    <Form.Floating className="">
                      <Form.Control
                        id="floatingPhone"
                        type="phone"
                        placeholder="Phone number"
                        aria-describedby="phoneHelpBlock"
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      />
                      <label htmlFor="floatingPhone">Phone number</label>
                      <Form.Text id="phoneHelpBlock" className="text-danger">
                        {phoneHelp}
                      </Form.Text>
                    </Form.Floating>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="form-row">
                  <Col>
                    <Form.Floating className="">
                      <Form.Control
                        id="floatingPassword1"
                        type="password"
                        placeholder="Password"
                        aria-describedby="password1HelpBlock"
                        onChange={(e) => {
                          setPassword1(e.target.value);
                        }}
                      />
                      <label htmlFor="floatingPassword1">Password</label>
                      <Form.Text
                        id="password1HelpBlock"
                        className="text-danger"
                      >
                        {password1Help}
                      </Form.Text>
                    </Form.Floating>
                  </Col>
                  <Col>
                    <Form.Floating className="">
                      <Form.Control
                        id="floatingPassword2"
                        type="password"
                        placeholder="Confirm Password"
                        aria-describedby="password2HelpBlock"
                        onChange={(e) => {
                          setPassword2(e.target.value);
                        }}
                      />
                      <label htmlFor="floatingPassword2">
                        Confirm Password
                      </label>
                      <Form.Text
                        id="password2HelpBlock"
                        className="text-danger"
                      >
                        {password2Help}
                      </Form.Text>
                    </Form.Floating>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-row">
                  <Col>
                    <div className="check-flex">
                      <Form.Check
                        id="floatingCheckbox"
                        type="checkbox"
                        onChange={(e) => {
                          setTos(!tos);
                        }}
                      />
                      <span>I agree to the terms of use</span>
                    </div>
                  </Col>
                  <Col>
                    <input
                      type="button"
                      value="Signup"
                      className="pt-2 pb-2 ps-3 pe-3 light-mode-button"
                      onClick={signup}
                    />
                  </Col>
                </Form.Group>
                <Row>
                  <Col className="mt-3 ms-2 mb-3">
                    <Link to="/Login">
                      <input
                        type="button"
                        value="Already have an account? Sign in here."
                        className="forgot-password-button"
                      />
                    </Link>
                  </Col>
                </Row>
              </div>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Signup;
