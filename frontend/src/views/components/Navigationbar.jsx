import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Navbar,
  FormControl,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import "../../styles/main.css";
import axios from "axios";
import Item from "./Item";
import Cookies from "js-cookie";
import { useHistory } from "react-router";

function Navigationbar() {
  const history = useHistory();
  function isLoggedIn() {
    if (Cookies.get("accessToken")) {
      history.push("/UserProfile");
    } else {
      history.push("/login");
    }
    console.log(Cookies.get("accessToken"));
  }
  return (
    <Row className="mb-0 pb-0">
      <Col>
        <Navbar.Brand href="/home">
          <Navbar.Text>
            <h1 className="ms-5 mt-3 mercatus-logo">Mercatus</h1>
          </Navbar.Text>
        </Navbar.Brand>
      </Col>

      <Col className="mb-0 pb-0">
        <Form className="d-flex mt-4">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-dark">
            <SearchIcon></SearchIcon>
          </Button>
        </Form>
      </Col>

      <Col className="mt-4 mb-0 pb-0">
        <Row>
          <Col className="mb-0 pb-0"></Col>
          <Col className="mb-0 pb-0"></Col>
          <Col className="mb-0 pb-0"></Col>
          <Col className="mb-0 pb-0"></Col>
          <Col className="mb-0 pb-0"></Col>
          <Col className="mb-0 pb-0">
            {/*<Link to="/UserProfile">*/}
            {/*  <PersonIcon className="black-sun"></PersonIcon>*/}
            {/*</Link>*/}
            <PersonIcon
              className="black-sun person-hover"
              onClick={isLoggedIn}
            />
          </Col>
          <Col className="mb-0 pb-0">
            <Link to="/Checkout">
              <ShoppingCartIcon className="black-sun"></ShoppingCartIcon>
            </Link>
          </Col>
          <Col className="mb-0 pb-0">
            <Link to="/settings">
              <SettingsIcon className="black-sun"></SettingsIcon>
            </Link>
          </Col>
          <Col>
            <DropdownButton className="me-2 main-font" title="Other">
              <Dropdown.Item eventKey="1" className="main-font" href="/About">
                About
              </Dropdown.Item>
              <Dropdown.Item eventKey="2" className="main-font" href="/Items">
                Buy
              </Dropdown.Item>
              <Dropdown.Item eventKey="3" className="main-font" href="/Sell">
                Sell
              </Dropdown.Item>
              <Dropdown.Item eventKey="4" className="main-font" href="/Help">
                Help
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Navigationbar;
