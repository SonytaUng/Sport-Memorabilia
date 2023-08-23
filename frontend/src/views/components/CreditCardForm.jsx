import React,{ useState }from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Row, Col, Button, CloseButton } from "react-bootstrap";
import "../../styles/creditCardForm.css";
import "../../styles/button.css";
import CloseIcon from '@mui/icons-material/Close';
import {alphaCheck, alphaCheckWithSpaces, alphaNumCheckWithSpaces, numCheck, emailCheck, stateCheck, zipCodeCheck} from "../../helpers/fieldValidator.js";
import axios from "axios";
import { AlarmTwoTone, LocalConvenienceStoreOutlined } from "@mui/icons-material";


//https://react-bootstrap.github.io/components/forms/

export default function CreditCardForm({id, cardNumber, cardName, cardExpirationYear, cardExpirationMonth, cvv, default_card, close, newCard}) {
    const url = "http://localhost:5000/api";


    const [formFields, setFormFields] = useState({cardNumber:credit_card_number_format(cardNumber), cardName:card_name_format(cardName), cardExpirationYear:card_expiration_format_month(cardExpirationYear, false),cardExpirationMonth:card_expiration_format_month(cardExpirationMonth, true), cvv:cvv_format(cvv), default_card:default_card});
    const [borderColor, setborderColor] = useState({cardNumber:"", cardName:"", cardCVV:"cvv", expiration:"expiration"});


    //https://stackoverflow.com/questions/36833366/format-credit-card-number
    function credit_card_number_format(newValue){
        //first regrex remove space, and second regrex non 0 - 9

        let v = newValue.toString().replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let matches = v.match(/\d{4,16}/g);
        let match = matches && matches[0] || ''
        let parts = []

        for (let i=0, len=match.length; i<len; i+=4) {
            parts.push(match.substring(i, i+4))
        }
        if (parts.length) {
            return parts.join(' ')
        } else {
            return v
        }
    }

    function card_name_format(newValue){
        let v = newValue.replace(/[^a-z\s]*/gi, '');
        return v;
    }

    function card_expiration_format_month(newValue, month){
        let v = newValue.toString().replace(/^0+/,'').replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if(v == "0"){
            v = "";
        }
        if((!Number.isInteger(v) && numCheck(v) && Number(v)< 10)|| (Number.isInteger(v) && v < 10)){
            v = "0" + v.toString();
        }
        if(v.length > 2){
            v = v.substring(0,2);
        }
        if((!Number.isInteger(v) && numCheck(v) && month && Number(v) > 12) || (Number.isInteger(v) && month && Number(v) > 12)){
            v = "12";
        }
        if(v.length === 0 && month === true){
            return "MM";
        }
        else if(v.length === 0 && month === false){
            return "YY";
        }

        return v;
    }


    function cvv_format(newValue){
        let v = newValue.toString().replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if(v.length > 3){
            return v.substring(0,3);
        }
        return v;
    }

    function default_card_format(newValue){
        return !newValue;
    }

    async function validate(){
        let all_validate = true;
        let clean_card_number = formFields.cardNumber.split(/\s+/).join("");
        let clean_card_expiration_year = formFields.cardExpirationYear.replace(/^0+/,'');
        let clean_card_expiration_month = formFields.cardExpirationMonth.replace(/^0+/,'');
        if(!(numCheck(clean_card_number) && clean_card_number.length <= 16)){
            all_validate = false;
            setborderColor(prevBorderColor =>({...prevBorderColor, cardNumber:"errorExpiration"}))
        }else{
            setborderColor(prevBorderColor =>({...prevBorderColor, cardNumber:""}))
        }
        if(!(formFields.cardName != "" && formFields.cardName.match(/[^a-z\s]*$/i))){
            all_validate = false;
            setborderColor(prevBorderColor =>({...prevBorderColor, cardName:"errorExpiration"}))
        }else{
            setborderColor(prevBorderColor =>({...prevBorderColor, cardName:""}))
        }
        if(!(numCheck(clean_card_expiration_year) && numCheck(clean_card_expiration_month))){
            all_validate = false;
            setborderColor(prevBorderColor =>({...prevBorderColor, expiration:"expiration errorExpiration"}))
        }else{
            setborderColor(prevBorderColor =>({...prevBorderColor, expiration:"expiration"}))
        }
        if(!numCheck(formFields.cvv)){
            all_validate = false;
            setborderColor(prevBorderColor =>({...prevBorderColor, cardCVV: "cvv errorExpiration"}))
        }else{
            setborderColor(prevBorderColor =>({...prevBorderColor, cardCVV: "cvv"}))
        }
        console.log(all_validate);
        if(all_validate){
            try{
                let urlCard = "";
                if(newCard){
                    urlCard = url + "/createCreditCard";
                }else{
                    urlCard = url+"/editCreditCard";
                }
                let res = await axios.post(urlCard, {
                    id: id,
                    cardNumber : Number(clean_card_number),
                    cardName : formFields.cardName,
                    cardExpirationMonth: Number(clean_card_expiration_month),
                    cardExpirationYear: Number(clean_card_expiration_year),
                    cardCVV: Number(formFields.cvv),
                    cardDefault : formFields.default_card
                })
                close();
            }catch (e){
                alert("Why you like dis.");
                console.log(e);
            }
            return true;
        }
        return false;
    }

    
        
    return(
        <Container className="form_container">
            <button className = "mt-2 close_button" onClick = {close}>
            <CloseIcon fontSize="large" color="action" className = "close_button"/>
            </button>
            <p className= "light-mode-header-2">Card Information</p>
            <Form>
                <Form.Group as = {Row} className= "mb-3" controlId ="formCardNumber">
                    <Form.Label column sm="2">Card Number</Form.Label>
                    <Col sm ="10">
                    <Form.Control className = {borderColor.cardNumber} value = {formFields.cardNumber} 
                    onChange={(e)=>setFormFields(prevFormFields =>({
                        ...prevFormFields,
                        cardNumber: credit_card_number_format(e.target.value)
                        }))}/>
                    </Col>
                </Form.Group>

                <Form.Group as = {Row} className= "mb-3" controlId = "formCardFolderName">
                    <Form.Label column sm="2">Name on Card</Form.Label>
                    <Col sm ="10">
                    <Form.Control className = {borderColor.cardName} value = {formFields.cardName}
                        onChange={(e)=>setFormFields(prevFormFields =>({
                        ...prevFormFields,
                        cardName: card_name_format(e.target.value)
                        }))}/>
                    </Col> 
                </Form.Group>

                <Form.Group as = {Row} className= "mb-3">
                    <Form.Label column sm="2">Card Expiration</Form.Label>
                    <Col lg="10">
                    <div className = {borderColor.expiration}>
                    <Form.Control className = "card_expiration" id = "card_expiration_month"  value = {formFields.cardExpirationMonth}
                        type="text"
                        onChange={(e)=>setFormFields(prevFormFields =>({
                        ...prevFormFields,
                        cardExpirationMonth: card_expiration_format_month(e.target.value, true)
                        }))}/>
                     <span className = "slash">/</span>
                    <Form.Control className = "card_expiration" id = "card_expiration_year"  value = {formFields.cardExpirationYear}
                        type="text"
                        onChange={(e)=>setFormFields(prevFormFields =>({
                        ...prevFormFields,
                        cardExpirationYear: card_expiration_format_month(e.target.value, false)
                        }))}/>
                    </div>
                    </Col>
                </Form.Group>

                <Form.Group as = {Row} className= "mb-3" controlId = "formCVV">
                    <Form.Label column sm="2">CVV</Form.Label>
                    <Col sm ="1">
                    <Form.Control className = {borderColor.cardCVV} value = {formFields.cvv} 
                    onChange={(e)=>setFormFields(prevFormFields =>({
                        ...prevFormFields,
                        cvv: cvv_format(e.target.value)
                        }))}/>
                    </Col>
                </Form.Group>
                
                <Form.Group as = {Row} className= "mb-3" controlId = "formDefaultPayment">
                            <Form.Label column sm="3">Set card as default payment option</Form.Label>
                            <Col>
                            <Form.Check type = "checkbox" className ="mt-2"
                            onChange={(e) => setFormFields(prevFormFields=>({
                                ...prevFormFields,
                                default_card: default_card_format(prevFormFields.default_card)
                            }))}
                            checked = {formFields.default_card}
                            value = {formFields.default_card}
                            />
                            </Col>
                            </Form.Group>         

                <input className= "light-mode-button ps-2 pe-2 pt-2 pb-2 mt-5 mb-5" type = "button" value = "Submit" onClick = {validate}/>
            </Form>
        </Container>
    );
}