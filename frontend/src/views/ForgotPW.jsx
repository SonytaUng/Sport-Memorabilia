import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Form } from "react-bootstrap";
import "../App.css";
import "../styles/forgotPW.css";
import "../styles/button.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router";

function ForgotPW() {
  const [email, setEmail] = useState("");
  const [emailHelp, setEmailHelp] = useState("");

  const url = "http://localhost:5000/api";
  const history = useHistory();

  async function ForgotPW() {
    let show = 1;
    if (email.length <= 0) {
      setEmailHelp("Please enter your email");
      show = 0;
    }

    if (show === 1) {
      console.log(Validation());
      if (Validation()) {
        try {
          let res = await axios.post(url + "/forgotpw", {
            email: email,
          });
          console.log(res.data);
          if (res.data.message === "Email found") {
            alert(
              "Please follow the link in your email to reset your password!"
            );
            history.push("/Login");
          } else if (res.data.message === "Email not found") {
            setEmailHelp("Email not found");
          }
        } catch (e) {
          setEmailHelp("");
          console.log(e);
        }
      }
    }
  }

  function Validation() {
    let valEmail = emailCheck(email);
    if (!valEmail) {
      setEmailHelp("Please enter a valid email(example: johndoe@abc.com)");
    } else {
      setEmailHelp("");
    }
    return !!valEmail;
  }

  function emailCheck(entry) {
    let regex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (entry != null && entry.match(regex)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      <Container>
        <div className="form-div">
          <h1 className="main-font text-center mt-5">Forgot password</h1>
          <div className="page-title">
            <Form>
              <div className="form-flex">
                <div className="form-text">
                  <Form.Group className="form-row">
                    <Col sm="">
                      <Form.Floating className="">
                        <Form.Control
                          id="floatingEmail"
                          type="email"
                          placeholder="abc2@example.comm"
                          aria-describedby="emailHelpBlock"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        <label htmlFor="floatingEmail">Email</label>
                        <label htmlFor="floatingEmail">Email address</label>
                        <Form.Text id="emailHelpBlock" className="text-danger">
                          {emailHelp}
                        </Form.Text>
                      </Form.Floating>
                    </Col>
                    <br />
                    <div className="button-form">
                      <input
                        type="button"
                        value="Forgot Password"
                        className="light-mode-button ps-2 pe-2 pt-2 pb-2"
                        onClick={ForgotPW}
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ForgotPW;
