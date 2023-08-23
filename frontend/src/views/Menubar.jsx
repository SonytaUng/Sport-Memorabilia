import React from "react";
import { Row, Col, Navbar, Nav } from "react-bootstrap";

function Menubar() {
    return (
      <Row className="text-center">
        <Col>
          <Nav.Link href="/home"><h5 className="main-font">All</h5></Nav.Link>
        </Col>
        <Col>
          <Nav.Link href="/Items"><h5 className="main-font">Health + Wellness</h5></Nav.Link>         
        </Col>
        <Col>
          <Nav.Link href="/Items"><h5 className="main-font">Epic Ham Deals</h5></Nav.Link>  
        </Col>       
        <Col>
          <Nav.Link href="/Items"><h5 className="main-font">Hextech Tools</h5></Nav.Link>       
        </Col>
        <Col>
          <Nav.Link href="/Items"><h5 className="main-font">Triforce Shards</h5></Nav.Link>          
        </Col>
        <Col>
          <Nav.Link href="/Items"><h5 className="main-font">Swords + Sandals</h5></Nav.Link>         
        </Col>
        <Col>
          <Nav.Link href="/Items"><h5 className="main-font">Soups/Potions</h5></Nav.Link>          
        </Col>
        <Col>
          <Nav.Link href="/Items"><h5 className="main-font">Boba Things</h5></Nav.Link>          
        </Col>
      </Row>
  );
}
export default Menubar;
