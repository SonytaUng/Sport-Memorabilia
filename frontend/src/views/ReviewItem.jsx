import React from "react";
import { Container, Form, Row, Col, Button,} from "react-bootstrap";

var margin = {
  display: 'block',
  padding: '10px',
  height: '10px',
  width: '100%',
  margin: '20px',
}

function WriteReview() {
  return(
    <div>
      <div style={margin} />
        <Container>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row><h1 className="main-font">Review Item</h1></Row>
              <Row>
                <Form.Label className="sub-font"><b>Rate your item</b></Form.Label>
              </Row>
              <Row>
                <Col>
                  <img src = "https://4.bp.blogspot.com/-WFsY-5oQQbQ/VvZ5m4KPKZI/AAAAAAAAEf0/xq4Vb1wf5sEGxLINeiH9Xspm3HaCH7SFQ/s1600/Sterne.png" width="250px"/>
                </Col>
                <Col></Col>
              </Row>
              <Form.Label className="sub-font mt-3"><b>Your review title</b></Form.Label>
                <Form.Control type="review title" placeholder="Review title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="sub-font"><b>Write your review</b></Form.Label>
              <Form.Control as="textarea" rows={10} />
            </Form.Group>
            <Row>
              <Col className="text-center">
                <input
                  // className="light-mode-button ps-2 pe-2 pt-2 pb-2 mt-5 mb-5" 
                  className="light-mode-button ps-2 pe-2 pt-2 pb-2" 
                  type="button"
                  value="Submit Review"
                />
                {/* <Button variant="primary" type="submit">Submit</Button> */}
              </Col>
            </Row>
          </Form>
        </Container>
    </div>
  );
}
export default WriteReview;