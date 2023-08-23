import React from 'react';
import { Container, Form, Col, Row, Button } from "react-bootstrap";

function Sell() {
  return (
    <div className="mt-5">
      <Container>
        <h1 className="main-font">Sell</h1>
        <p className="sub-font"> Please fill out this item information form. </p>
        <Form>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label><h5 className="main-font mt-3">Item information</h5></Form.Label>
            <Form.Control type="file" multiple />
          </Form.Group>
          <Form.Select aria-label="category" className="sub-font">
            <option>Select item category</option>
            <option value="1">Health + Wellness</option>
            <option value="2">Epic Ham Deals</option>
            <option value="3">Hextech Tools</option>
            <option value="4">Triforce Shards</option>
            <option value="5">Swords + Sandals</option>
            <option value="6">Soups/Potions</option>
            <option value="7">Boba Things</option>
            <option value="8">Other</option>
          </Form.Select>
          <Form.Select aria-label="price range" className="mt-3 mb-3 sub-font">
            <option>Select price range</option>
            <option value="1">Under $50</option>
            <option value="2">$50 - $100</option>
            <option value="3">$101 - $500</option>
            <option value="4">$501 - $1000</option>
            <option value="5">More than $1000</option>
          </Form.Select>
          <Form.Group as={Row} className="mb-3" controlId="price">
            <Form.Label column sm="2" className="sub-font">Actual Price</Form.Label>
            <Col sm="10">
              <Form.Control type="price" placeholder="$" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="price">
            <Form.Label column sm="2" className="sub-font">Quantity</Form.Label>
            <Col sm="10">
              <Form.Control type="quantity" placeholder="1" />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" controlId="item-title">
            <Form.Label><h5 className="mt-4 main-font">Item title</h5></Form.Label>
            <Form.Control type="title" placeholder="title" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="item-description">
            <Form.Label><h5 className="mt-4 main-font">Item Description</h5></Form.Label>
            <Form.Control as="textarea" rows={10} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="I agree with the terms and conditions" />
          </Form.Group>
          <input
            className="light-mode-button ps-3 pe-3 pt-2 pb-2" 
            type="button"
            value="Submit"
          />
        </Form>
      </Container>
    </div>
  );
}

export default Sell;
