import { React, useState, useEffect, Children } from "react";
import Popup from "reactjs-popup";

import {
  Container,
  Form,
  Row,
  Col,
  Button,
  FormGroup,
  InputGroup,
  Card,
} from "react-bootstrap";
import axios from "axios";
import {
  alphaCheck,
  alphaCheckWithSpaces,
  alphaNumCheckWithSpaces,
  numCheck,
  emailCheck,
  stateCheck,
  zipCodeCheck,
} from "..";
import CreditCardComponent from "./components/CreditCardComponent";
import CreditCardForm from "./components/CreditCardForm";
import Cookies from "js-cookie";
import Item from "./components/Item";

// Helpfer function to map creditCard info into two columns.
function convertCreditCards(creditCardList) {
  let result = [];
  let i = 1;
  while (i <= creditCardList.length) {
    if (i % 2 == 0) {
      result[result.length - 1].push(creditCardList[i - 1]);
    } else {
      result.push([creditCardList[i - 1]]);
    }
    i++;
  }
  return result;
}

function Checkout() {
  const url = "http://localhost:5000/api";

  const USERNAME = 0;

  const [validated, setValidated] = useState(false);
  const [grid, setGrid] = useState();
  const [totalPrice, setTotalPrice] = useState();

  async function getCart() {
    console.log(Cookies.get("accessToken"));
    try {
      let res = await axios.post(
        process.env.REACT_APP_API_URL + "api/getCart",
        {
          username: "testuser",
        }
      );
      console.log(res.data);
      let tempdata = res.data;
      // console.log(res.data[0].item);
      let temparr = [];
      for (let i = 0; i < tempdata.length; i++) {
        try {
          let res = await axios.post("http://localhost:5000/api/getItemInfo", {
            iid: tempdata[i],
          });
          temparr.push(res.data);
          // console.log(res.data);
        } catch (e) {
          console.log(e);
        }
      }
      console.log(temparr);
      let grid = [];
      let totalPrice = 0;
      for (let i = 0; i < temparr.length; i++) {
        totalPrice += temparr[i].price;
        grid.push(
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0 sub-font">{temparr[i].title}</h6>
              <small class="text-muted sub-font">
                {temparr[i].description}
              </small>
            </div>
            <span class="text-muted main-font">${temparr[i].price}</span>
          </li>
        );
      }
      setGrid(grid);
      setTotalPrice(totalPrice);
      // setwlgrid(grid);
      // setwlid(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [creditCards, setCreditCards] = useState(["button"]);
  useEffect(async () => {
    try {
      let res = await axios.get(url + "/getCreditCards");
      let response = JSON.parse(res.data);
      setCreditCards([...response["creditCards"], "button"]);
    } catch (e) {
      alert("Failed to issue GET request for credit cards.");
    }
  });

  return (
    <Container>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="pb-5"
      >
        <Row className="mt-5">
          <Col>
            <h2 className="main-font">Shipping Address</h2>
            <Form.Group
              as={Col}
              className="mb-3 mt-5"
              controlId="validationStreet"
              name="streetB"
            >
              <Row>
                <Form.Label className="main-font">Address Line 1</Form.Label>
                <Col>
                  <InputGroup hasValidation>
                    <Form.Control
                      id="AddLine1"
                      type="text"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a valid Address.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group
              className="mb-3 main-font"
              controlId="validationAddress"
              name="addB"
            >
              <Row>
                <Form.Label>Address Line 2</Form.Label>
                <Col>
                  <InputGroup hasValidation>
                    <Form.Control
                      id="AddLine2"
                      type="text"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a valid Address.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationZIP" name="zipB">
              <Row>
                <Form.Label className="main-font">ZIP Code</Form.Label>
                <Col>
                  <InputGroup hasValidation>
                    <Form.Control
                      id="Zip"
                      type="number"
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 5);
                      }}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a valid ZIP code.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group
              as={Col}
              className="mb-3"
              controlId="validationState"
              name="stateB"
            >
              <Row>
                <Form.Label className="main-font">State</Form.Label>
                <Col>
                  <InputGroup hasValidation>
                    <Form.Control
                      id="State"
                      type="text"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a valid State.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>

            <FormGroup></FormGroup>

            <Form.Group as={Col} className="mb-3 mt-5">
              <h2 className="main-font"> Billing Address</h2>
            </Form.Group>

            <Form.Group
              as={Col}
              className="mb-3 mt-5"
              controlId="validationStreet"
              name="streetB"
            >
              <Row>
                <Form.Label className="main-font">Address Line 1</Form.Label>
                <Col>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a valid Address.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="validationAddress"
              name="addB"
            >
              <Row>
                <Form.Label className="main-font">Address Line 2</Form.Label>
                <Col>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a valid Address.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationZIP" name="zipB">
              <Row>
                <Form.Label className="main-font">ZIP Code</Form.Label>
                <Col>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="number"
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 5);
                      }}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a valid ZIP code.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group
              as={Col}
              className="mb-3"
              controlId="validationState"
              name="stateB"
            >
              <Row>
                <Form.Label className="main-font">State</Form.Label>
                <Col>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a valid State.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>

            <FormGroup></FormGroup>
          </Col>

          <Col class="col-4">
            <h2 className="main-font">Your Cart</h2>
            <Card>
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  {/*<li class="list-group-item d-flex justify-content-between lh-condensed">*/}
                  {/*  <div>*/}
                  {/*    <h6 class="my-0 sub-font">*/}
                  {/*      Lenovo IdeaPad, Chromebook, Laptop*/}
                  {/*    </h6>*/}
                  {/*    <small class="text-muted sub-font">*/}
                  {/*      No setup required. Log in to your Chromebook laptop...*/}
                  {/*    </small>*/}
                  {/*  </div>*/}
                  {/*  <span class="text-muted main-font">$123.75</span>*/}
                  {/*</li>*/}
                  {grid}
                  {/* <li class="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                      <h6 class="my-0">Item 2</h6>
                                      <small class="text-muted">Brief description</small>
                                    </div>
                                    <span class="text-muted">$20</span>
                                  </li>

                                  <li class="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                      <h6 class="my-0">Item 3</h6>
                                      <small class="text-muted">Brief description</small>
                                    </div>
                                    <span class="text-muted">$5</span>
                                  </li>

                                  <li class="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                      <h6 class="my-0">Item 4</h6>
                                      <small class="text-muted">Brief description</small>
                                    </div>
                                    <span class="text-muted">$100</span>
                                  </li>

                                  <li class="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                      <h6 class="my-0">Item 3</h6>
                                      <small class="text-muted">Brief description</small>
                                    </div>
                                    <span class="text-muted">$5</span>
                                  </li> */}

                  <li
                    class="list-group-item d-flex justify-content-between lh-condensed"
                    style={{ fontSize: 20 }}
                  >
                    <div>
                      <h6 className="my-0 main-font" style={{ fontSize: 30 }}>
                        Total(USD){" "}
                      </h6>
                    </div>
                    <span className="text-muted main-font">${totalPrice}</span>
                  </li>
                </ul>
              </div>
            </Card>
          </Col>
        </Row>

        <h2 className="main-font">Cards</h2>
        <div className="mt-5">
          {Children.toArray(
            convertCreditCards(creditCards).map((row) => {
              return (
                <Row>
                  {Children.toArray(
                    row.map((col) => {
                      if (col === "button") {
                        return (
                          <Col className="mb-5 d-flex justify-content-center">
                            <Popup
                              trigger={
                                <input
                                  className="align-self-center light-mode-button ps-2 pe-2 pt-2 pb-2 mt-5 mb-5"
                                  type="button"
                                  value="Add A Credit Card"
                                />
                              }
                              modal
                            >
                              {(close) => (
                                <div>
                                  <CreditCardForm
                                    close={close}
                                    cardNumber=""
                                    cardName=""
                                    cardExpirationYear=""
                                    cardExpirationMonth=""
                                    cvv=""
                                    default_card={false}
                                    newCard={true}
                                  ></CreditCardForm>
                                </div>
                              )}
                            </Popup>
                          </Col>
                        );
                      } else {
                        return (
                          <Col className="mb-5 d-flex justify-content-center">
                            <CreditCardComponent
                              id={col.id}
                              bankName={col.bankName}
                              cardNumber={col.cardNumber}
                              cardHolderName={col.cardHolderName}
                              cardExpirationYear={col.cardExpirationYear}
                              cardExpirationMonth={col.cardExpirationMonth}
                              cvv={col.cvv}
                              default_card={col.default_card}
                            />
                          </Col>
                        );
                      }
                    })
                  )}
                </Row>
              );
            })
          )}
        </div>
        <input
          id="PlaceOrder"
          className="light-mode-button ps-2 pe-2 pt-2 pb-2 mt-5"
          type="button"
          value="Place Your Order"
        />
      </Form>
    </Container>
  );
}

export default Checkout;
