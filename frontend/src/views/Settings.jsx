//Children help generates unique key.
import { React, useEffect, useState, Children } from "react";
import Popup from "reactjs-popup";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import "../styles/settings.css";
import profile_pic from "../images/profile_pic.jpg";
import card_pic from "../images/card.jpg";
import axios from "axios";
import CreditCardComponent from "./components/CreditCardComponent";
import CreditCardForm from "./components/CreditCardForm";

import {
  alphaCheck,
  alphaCheckWithSpaces,
  alphaNumCheckWithSpaces,
  numCheck,
  emailCheck,
  stateCheck,
  zipCodeCheck,
} from "../helpers/fieldValidator.js";
import Cookies, { remove } from "js-cookie";
import "../styles/button.css";
import "../styles/forms.css";
import { width } from "@mui/system";
import { useHistory } from "react-router";

function Settings() {
  const url = "http://localhost:5000/api";

  const TOTAL_FIELDS = 13;

  // Current user info
  // NOTE: Don't allow updates to username for now since other DB tables
  // make use of it as the user identifier (ref. FOREIGN KEY constraints)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [phone, setPhone] = useState("");

  const USERNAME = 0;
  const EMAIL = 1;
  const FIRST_NAME = 2;
  const LAST_NAME = 3;
  const DOB = 4;
  const PHONE = 5;
  const PASSWORD = 6;
  const CONFIRM_PW = 7;

  const history = useHistory();

  useEffect(() => {
    if (!Cookies.get("accessToken")) {
      history.push("/Login");
    }
  });

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

  // User info to change
  const [newUsername, changeUserName] = useState("");
  const [newEmail, changeEmail] = useState("");
  const [newFirstName, changeFirstName] = useState("");
  const [newLastName, changeLastName] = useState("");
  const [newDOB, changeDOB] = useState("");
  const [newPhone, changePhone] = useState("");
  const [newPassword, changePassword] = useState("");
  const [confirmPW, changeConfirmPW] = useState("");

  // Field validation text
  const [usernameHelp, setUsernameHelp] = useState("");
  const [emailHelp, setEmailHelp] = useState("");
  const [fnameHelp, setFnameHelp] = useState("");
  const [lnameHelp, setLnameHelp] = useState("");
  const [phoneHelp, setPhoneHelp] = useState("");
  const [password1Help, setPassword1Help] = useState("");
  const [password2Help, setPassword2Help] = useState("");

  const ADD_LINE_1 = 8;
  const ADD_LINE_2 = 9;
  const STATE = 10;
  const CITY = 11;
  const ZIP_CODE = 12;
  const INCOMPLETE_ADD_FIELDS = 13;

  // Current addresses
  const [addressSelect, setAddressSelect] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [addLine1, setaddLine1] = useState("");
  const [addLine2, setaddLine2] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Address to add or existing address to change
  const [newAddLine1, changeAddLine1] = useState("");
  const [newAddLine2, changeAddLine2] = useState("");
  const [newState, changeState] = useState("");
  const [newCity, changeCity] = useState("");
  const [newZipCode, changeZipCode] = useState("");

  // Field validation text
  const [addLine1Help, setAddLine1Help] = useState("");
  const [addLine2Help, setAddLine2Help] = useState("");
  const [stateHelp, setStateHelp] = useState("");
  const [cityHelp, setCityHelp] = useState("");
  const [zipCodeHelp, setZipCodeHelp] = useState("");

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

  useEffect(() => {
    try {
      let accessToken = Cookies.get("accessToken");

      if (accessToken) {
        axios
          .get(url + "/getUserData", {
            headers: {
              authorization: "Basic " + accessToken,
            },
          })
          .then((response) => {
            let user = response.data;

            setUsername(user.username);
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setEmail(user.email);
            setDOB(user.dob.substring(0, 10));
            setPhone(user.phone);
          });

        getShippingAddresses(username);
      } else {
        return <h1>NO USER FOUND</h1>;
      }
    } catch (e) {
      alert(
        "ERROR: Error occurred while fetching information of the currently logged-in user."
      );
    }
  }, [firstName, lastName, email, dob, phone]);

  function makeChanges() {
    let allFields = [
      USERNAME,
      EMAIL,
      FIRST_NAME,
      LAST_NAME,
      DOB,
      PHONE,
      PASSWORD,
      CONFIRM_PW,
      ADD_LINE_1,
      ADD_LINE_2,
      STATE,
      CITY,
      ZIP_CODE,
    ];

    let changedFields = getChangedFields();
    let validChangedFields = [];
    let validChangedFieldsIndex = []; // fields that are valid that need to be changed
    let toRemoveError = []; // blank fields (also valid) that should NOT change

    if (noChangesMade(changedFields)) {
      removeErrors(allFields);
      outputErrors([-1]);
      return null;
    }

    let errors = [];
    let addFieldCount = 0;
    let maxAddFieldCount = 5;

    for (let i = 0; i < changedFields.length; i++) {
      if (changedFields[i] != 0 && (i != PASSWORD || i != CONFIRM_PW)) {
        if (isValid([i, changedFields[i]])) {
          validChangedFields.push(changedFields[i]);
          validChangedFieldsIndex.push(i);
        } else {
          errors.push(i);
        }
        if (i >= ADD_LINE_1) {
          addFieldCount += 1;
        }
      } else {
        toRemoveError.push(i);
      }
    }

    if (addFieldCount > 0 && addFieldCount < maxAddFieldCount) {
      errors.push(INCOMPLETE_ADD_FIELDS);
    }

    if (passwordsAreValid()) {
      if (newPassword != "") {
        validChangedFields.push(newPassword);
        validChangedFieldsIndex.push(PASSWORD);
        toRemoveError.push(PASSWORD);
      }
    } else {
      errors.push(PASSWORD);
    }

    removeErrors(validChangedFieldsIndex);
    removeErrors(toRemoveError);

    let errorsExist = errors.length > 0;

    if (errorsExist) {
      outputErrors(errors);
    } else {
      issueChange(validChangedFieldsIndex, validChangedFields);
    }
  }

  function noChangesMade(fields) {
    for (let i = 0; i < fields.length; i++) {
      if (fields[i] != 0) {
        return false;
      }
    }

    return true;
  }

  async function issueChange(indices, inputs) {
    let accountIndices = [];
    let accountInputs = [];
    let addressInputs = [];

    for (let i = 0; i < indices.length; i++) {
      if (indices[i] <= CONFIRM_PW) {
        accountIndices.push(indices[i]);
        accountInputs.push(inputs[i]);
      } else {
        addressInputs.push(inputs[i]);
      }
    }

    if (accountIndices.length > 0) {
      updateUser(accountIndices, accountInputs);
      getUser();
    }

    if (addressInputs.length > 0) {
      updateShipping(addressInputs);
      getShippingAddresses(username);
    }
  }

  function getThisUser() {
    let thisUser = [username, firstName, lastName, email, dob, phone];

    if (newUsername != "") {
      thisUser[0] = newUsername;
    }
    if (newFirstName != "") {
      thisUser[1] = newFirstName;
    }
    if (newLastName != "") {
      thisUser[2] = newLastName;
    }
    if (newEmail != "") {
      thisUser[3] = newEmail;
    }
    if (newDOB != "") {
      thisUser[4] = newDOB;
    }
    if (newPhone != "") {
      thisUser[5] = newPhone;
    }

    return thisUser;
  }

  async function updateUser(indices, inputs) {
    try {
      let thisUser = getThisUser();
      await axios
        .post(url + "/updateUser", {
          username: username,
          indices: indices,
          inputs: inputs,
          user: thisUser,
        })
        .then((response) => {
          Cookies.set("accessToken", response.data.accessToken);
          alert(response.data.message);
        });
    } catch (e) {
      console.log("Error issuing POST request to update user info.");
    }
  }

  async function updateShipping(inputs) {
    try {
      let addressID = 0; // New Address

      let addSelect = parseInt(addressSelect);
      if (addSelect >= 0) {
        // Existing Address
        addressID = addresses[addSelect].address_id;
      }
      console.log("CAPTURE: " + username);

      await axios
        .post(url + "/updateAddress", {
          username: username,
          inputs: inputs,
          addressID: addressID,
        })
        .then((response) => {
          console.log(response.data.message);
          alert(response.data.message);
        });
    } catch (e) {
      console.log("Error issuing POST request to update address.");
    }
  }

  async function getShippingAddresses(user) {
    try {
      let res = await axios.post(url + "/getShippingAddresses", {
        username: user,
      });

      let shippingAddresses = res.data.shippingAddresses;
      setAddresses(shippingAddresses);
      console.log("addresses: ");
      console.log(addresses);
    } catch (e) {
      console.log(
        "Error: Could not issue API request to get shipping addresses."
      );
    }
  }

  async function getUser() {
    try {
      let accessToken = Cookies.get("accessToken");
      if (accessToken) {
        axios
          .get(url + "/getUserData", {
            headers: {
              authorization: "Basic " + accessToken,
            },
          })
          .then((response) => {
            let user = response.data;

            setUsername(user.username);
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setEmail(user.email);
            setDOB(user.dob.substring(0, 10));
            setPhone(user.phone);
          });
      } else {
        return <h1>NO USER FOUND</h1>;
      }
    } catch (e) {
      alert(
        "ERROR: Error occurred while fetching information of the currently logged-in user."
      );
    }
  }

  function passwordsAreValid() {
    if (newPassword != confirmPW) {
      outputErrors([PASSWORD]);
      return false;
    } else {
      return newPassword == "" || isValid([PASSWORD, newPassword]);
    }
  }

  function removeErrors(select) {
    for (let i = 0; i < select.length; i++) {
      let fieldIndex = select[i];
      switch (fieldIndex) {
        case USERNAME:
          setUsernameHelp("");
          continue;
        case EMAIL:
          setEmailHelp("");
          continue;
        case FIRST_NAME:
          setFnameHelp("");
          continue;
        case LAST_NAME:
          setLnameHelp("");
          continue;
        case PHONE:
          setPhoneHelp("");
          continue;
        case ADD_LINE_1:
          setAddLine1Help("");
          continue;
        case ADD_LINE_2:
          setAddLine2Help("");
          continue;
        case STATE:
          setStateHelp("");
          continue;
        case CITY:
          setCityHelp("");
          continue;
        case ZIP_CODE:
          setZipCodeHelp("");
          continue;
        default:
          // PASSWORD
          setPassword1Help("");
          setPassword2Help("");
      }
    }
  }

  function outputErrors(errors) {
    const alphaError =
      "Sorry, only letters are allowed, and it cannot be your previous ";
    const alphaNumSpaceError =
      "Sorry, only letters, numbers, and spaces are allowed";

    for (let i = 0; i < errors.length; i++) {
      let errorCode = errors[i];
      switch (errorCode) {
        case USERNAME:
          setUsernameHelp(alphaError + "username");
          continue;
        case EMAIL:
          setEmailHelp("Please enter a new and valid email");
          continue;
        case FIRST_NAME:
          setFnameHelp(alphaError + "first name");
          continue;
        case LAST_NAME:
          setLnameHelp(alphaError + "last name");
          continue;
        case PHONE:
          setPhoneHelp("Please enter a new and valid phone number");
          continue;
        case PASSWORD:
        case CONFIRM_PW:
          setPassword1Help("New password must have at least 8 characters");
          setPassword2Help("Passwords do not match");
          continue;
        case ADD_LINE_1:
          setAddLine1Help(alphaNumSpaceError);
          continue;
        case ADD_LINE_2:
          setAddLine2Help(alphaNumSpaceError);
          continue;
        case CITY:
          setCityHelp("Sorry, only letters and spaces are allowed.");
          continue;
        case STATE:
          setStateHelp(
            "Use official US 2-state abbreviations (e.g. CA, WI, IA)"
          );
          continue;
        case ZIP_CODE:
          setZipCodeHelp("Please enter 5-digit US zip code");
          continue;
        case INCOMPLETE_ADD_FIELDS:
          alert(
            "All address form fields must be filled out to make address changes"
          );
          continue;
        default:
          // no changes were made
          alert("No changes have been made");
      }
    }
  }

  function getChangedFields() {
    let changedFields = [];
    for (let i = 0; i < TOTAL_FIELDS; i++) {
      changedFields.push(0);
    }

    // Account Fields
    if (newUsername != "") changedFields[USERNAME] = newUsername;
    if (newEmail != "") changedFields[EMAIL] = newEmail;
    if (newFirstName != "") changedFields[FIRST_NAME] = newFirstName;
    if (newLastName != "") changedFields[LAST_NAME] = newLastName;
    if (newDOB != "") changedFields[DOB] = newDOB;
    if (newPhone != "") changedFields[PHONE] = newPhone;
    if (newPassword != "") changedFields[PASSWORD] = newPassword;

    // Shipping Address Fields
    if (newAddLine1 != "") changedFields[ADD_LINE_1] = newAddLine1;
    if (newAddLine2 != "") changedFields[ADD_LINE_2] = newAddLine2;
    if (newState != "") changedFields[STATE] = newState;
    if (newCity != "") changedFields[CITY] = newCity;
    if (newZipCode != "") changedFields[ZIP_CODE] = newZipCode;

    return changedFields;
  }

  function isValid(field) {
    let fieldType = field[0];
    let fieldInput = field[1];

    switch (fieldType) {
      case USERNAME:
        return alphaCheck(fieldInput) && fieldInput != username;
      case FIRST_NAME:
        return alphaCheck(fieldInput) && fieldInput != firstName;
      case LAST_NAME:
        return alphaCheck(fieldInput) && fieldInput != lastName;
      case EMAIL:
        return emailCheck(fieldInput) && fieldInput != email;
      case DOB:
        return fieldInput != dob;
      case PHONE:
        return (
          fieldInput.length === 10 &&
          numCheck(fieldInput) &&
          fieldInput != phone
        );
      case ADD_LINE_1:
        return alphaNumCheckWithSpaces(fieldInput);
      case ADD_LINE_2:
        return alphaNumCheckWithSpaces(fieldInput);
      case STATE:
        return stateCheck(fieldInput);
      case CITY:
        return alphaCheckWithSpaces(fieldInput);
      case ZIP_CODE:
        return zipCodeCheck(fieldInput);
      default:
        // PASSWORD
        return fieldInput.length >= 8;
    }
  }

  function selectAddress(e) {
    setAddressSelect(e);
    let index = parseInt(e);

    if (index >= 0) {
      // Existing Address
      let theAddress = addresses[index];
      setaddLine1(theAddress.address_line_1);
      setaddLine2(theAddress.address_line_2);
      setState(theAddress.state);
      setCity(theAddress.city);
      setZipCode(theAddress.zip_code);
    } else {
      // New/Blank Address Form
      setaddLine1("");
      setaddLine2("");
      setState("");
      setCity("");
      setZipCode("");
    }
  }

  function noUserError(props) {
    return (
      <Container>
        <h1>Invalid access to 'Settings' page.</h1>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="mt-3 main-font">Account</h1>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <img src={profile_pic} />
          </Form.Group>

          <Form.Group as={Col} controlId="formFile" className="mb-3 mt-5">
            <Form.Control className="mt-5" type="file" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label className="main-font">Username</Form.Label>
            <Form.Control
              id="formUsername"
              type="text"
              placeholder={username}
              // onChange={(e) => {
              //   changeUserName(e.target.value);
              // }}
            />
            <Form.Text id="usernameHelpBlock" className="text-danger">
              {usernameHelp}
            </Form.Text>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label className="main-font">Email</Form.Label>
            <Form.Control
              id="formEmail"
              type="email"
              placeholder={email}
              onChange={(e) => {
                changeEmail(e.target.value);
              }}
            />
            <Form.Text id="emailHelpBlock" className="text-danger">
              {emailHelp}
            </Form.Text>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label className="main-font">First Name</Form.Label>
            <Form.Control
              id="formFirstName"
              type="text"
              placeholder={firstName}
              onChange={(e) => {
                changeFirstName(e.target.value);
              }}
            />
            <Form.Text id="fnameHelpBlock" className="text-danger">
              {fnameHelp}
            </Form.Text>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label className="main-font">Last Name</Form.Label>
            <Form.Control
              id="formLastName"
              type="text"
              placeholder={lastName}
              onChange={(e) => {
                changeLastName(e.target.value);
              }}
            />
            <Form.Text id="lnameHelpBlock" className="text-danger">
              {lnameHelp}
            </Form.Text>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label className="main-font">Date of Birth</Form.Label>
            <Form.Control
              id="formDOB"
              type="date"
              defaultValue={dob}
              onChange={(e) => {
                changeDOB(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label className="main-font">Phone Number</Form.Label>
            <Form.Control
              id="formPhone"
              type="text"
              placeholder={phone}
              onChange={(e) => {
                changePhone(e.target.value);
              }}
            />
            <Form.Text id="phoneHelpBlock" className="text-danger">
              {phoneHelp}
            </Form.Text>
          </Form.Group>
        </Row>

        <Row className="mb-5">
          <Form.Group as={Col}>
            <Form.Label className="main-font">Password</Form.Label>
            <Form.Control
              id="formPassword"
              type="password"
              placeholder=""
              onChange={(e) => {
                changePassword(e.target.value);
              }}
            />
            <Form.Text id="password1HelpBlock" className="text-danger">
              {password1Help}
            </Form.Text>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label className="main-font">Confirm Password</Form.Label>
            <Form.Control
              id="formConfirmPassword"
              type="password"
              placeholder=""
              onChange={(e) => {
                changeConfirmPW(e.target.value);
              }}
            />
            <Form.Text id="password2HelpBlock" className="text-danger">
              {password2Help}
            </Form.Text>
          </Form.Group>
        </Row>

        <h2 className="main-font">Shipping Addresses</h2>
        <Row className="mb-3">
          <DropdownButton
            as={Col}
            className="mt-2 main-font"
            title="My Shipping Addresses"
            onSelect={selectAddress}
          >
            <Dropdown.Item eventKey="-1" className="main-font">
              Add New Address
            </Dropdown.Item>
            <Dropdown.Divider />
            {addresses.map((address, index) => (
              <Dropdown.Item eventKey={index} className="main-font">
                {address.address_line_1}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          <Form.Group as={Col}>
            <Form.Label className="main-font">Address Line 1</Form.Label>
            <Form.Control
              id="formAddLine1"
              type="text"
              placeholder={addLine1}
              onChange={(e) => {
                changeAddLine1(e.target.value);
              }}
            />
            <Form.Text id="addLine1HelpBlock" className="text-danger">
              {addLine1Help}
            </Form.Text>

            <Form.Label className="main-font mt-2">Address Line 2</Form.Label>
            <Form.Control
              id="formAddLine2"
              type="text"
              placeholder={addLine2}
              onChange={(e) => {
                changeAddLine2(e.target.value);
              }}
            />
            <Form.Text id="addLine2HelpBlock" className="text-danger">
              {addLine2Help}
            </Form.Text>

            <Row className="mt-1">
              <Form.Group as={Col}>
                <Form.Label className="main-font">State</Form.Label>
                <Form.Control
                  id="formState"
                  type="text"
                  placeholder={state}
                  onChange={(e) => {
                    changeState(e.target.value);
                  }}
                />
                <Form.Text id="stateHelpBlock" className="text-danger">
                  {stateHelp}
                </Form.Text>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label className="main-font">City</Form.Label>
                <Form.Control
                  id="formCity"
                  type="text"
                  placeholder={city}
                  onChange={(e) => {
                    changeCity(e.target.value);
                  }}
                />
                <Form.Text id="cityHelpBlock" className="text-danger">
                  {cityHelp}
                </Form.Text>
              </Form.Group>
            </Row>

            <Form.Label className="main-font mt-2">Zip Code</Form.Label>
            <Form.Control
              id="formZipCode"
              type="text"
              placeholder={zipCode}
              onChange={(e) => {
                changeZipCode(e.target.value);
              }}
            />
            <Form.Text id="zipCodeHelpBlock" className="text-danger">
              {zipCodeHelp}
            </Form.Text>
          </Form.Group>
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

        <div>
          <input
            id="makeChangesBtn"
            className="light-mode-button ps-2 pe-2 pt-2 pb-2 mt-5 mb-5"
            type="button"
            value="Make Changes"
            onClick={makeChanges}
          />
        </div>
      </Form>
    </Container>
  );
}

export default Settings;
