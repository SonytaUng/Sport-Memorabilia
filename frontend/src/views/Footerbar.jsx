import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

var margin = {
  display: 'block',
  padding: '5%',
  height: '60px',
  width: '100%',
  marginleft: '20px',
  marginleft: '20px',
}

function Footer() {
  return (
      <div>
        <div style={margin} />
        <Container>
          <Row className="text-center">
            <Col>
              <Nav.Link href="/About"><h4 className="main-font">About</h4></Nav.Link>
            </Col>
            <Col>
              <Nav.Link href="/Items"><h4 className="main-font">Buy</h4></Nav.Link>       
            </Col>
            <Col>
              <Nav.Link href="/Sell"><h4 className="main-font">Sell</h4></Nav.Link>       
            </Col>
            <Col>
              <Nav.Link href="/help"><h4 className="main-font">Help</h4></Nav.Link>
            </Col>       
          </Row>
        </Container>
      </div>
  )
}

export default Footer