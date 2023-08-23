import { React }from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

var margin = {
  display: 'flex',
  padding: '50px',
  height: '60px',
  width: '100%',
  marginleft: '50px',
  marginright: '20px',
  }



function ItemPage() { 
  function addToCart() {
    alert("Item has been added to cart.");
  }

  const history = useHistory();

  const goToCheckout = () =>{ 
    let path = '/Checkout'; 
    history.push(path);
  }
  
  return (
    <div> 
      <div style={margin} />
      <Container>
        <Row>
          <Col>
            <img  src="https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8NjQxNzh8aW1hZ2UvcG5nfGhjNi9oMjgvMTAwMTQwNzg4OTQxMTAucG5nfDZiNmQyMmVlZDQ1MmUwYzI0ZWM1YTIyZTU4ZjU1NTFlOWZhYjE2ODBiYTc4MmQxYTU3ZDhiYWMwZGFmMjU2ZDE/lenovo-ideapad-S145-15-amd-platinum-grey-hero.png" width="400px"  />
          </Col>
          <Col>
            <p className="sub-font"><b>Lenovo IdeaPad, Chromebook, Laptop HDDisplay, Intel Celeron Processor,
                       4GB LPDDR4 RAM, 64GB eMMC Storage, Intel UHD Graphics, Chrome OS, Onyx White</b></p>
            <br/>
            <p className="sub-font"><b>About this item</b><br/>
              No setup required. Log in to your Chromebook laptop with your Google account and you're ready to go. Easy access to collaborative tools on G Suite and the full library of apps on Google Play
              Slim and lightweight, this notebook computer goes anywhere. Running on lightning-fast Chrome OS, it boots up in seconds, updates automatically, and keeps you safe with built-in virus protection
              Enjoy your favorite streaming videos and music. The 3-side narrow bezel HD display delivers beautiful clarity, while dual 2W stereo speakers offer crystal-clear audio
              Take it with you. With up to 10 hours of battery life, you can stay productive on the go. Stay connected with the 720p webcam, 2x2 WiFi 5 (802.11 ac), and Bluetooth 4.2 combo with WiFi card. You'll also have 2 x USB 3.1 Gen 12 (Type-C) ports, 2 x USB 3.1 Gen 12 (Type-A) ports, a microSD Card Reader, and an audio combo jack 
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <b className="sub-font">Product Review</b><br></br>
            <img src = "https://static.vecteezy.com/system/resources/previews/004/256/658/large_2x/five-star-customer-product-ratings-review-flat-icons-for-apps-and-websites-illustration-of-five-golden-yellow-stars-in-a-row-isolated-in-a-white-background-concepts-for-ratings-customers-review-free-vector.jpg" width = "200px" />
          </Col>
          <Col className="text-center main-font">
            <Form.Select aria-label="Default select example">
                <option>Quantity</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </Form.Select>
          </Col>
          <Col className="text-center">
            <input
              className="light-mode-button ps-3 pe-3 pt-2 pb-2" 
              type="button"
              value="Add to Cart"
              onClick={addToCart}
            />
          </Col>
          <Col className="text-center">
            <input
              className="light-mode-button ps-3 pe-3 pt-2 pb-2" 
              type="button"
              value="Buy Now"
              onClick={goToCheckout}
            />
          </Col>
        </Row>

        <Row>
          <Col className="sub-font">
            <Link to="/ReviewItem"> Write a review </Link> 
          </Col>
        </Row>
      </Container>
    </div>
  
  );
}

export default ItemPage;