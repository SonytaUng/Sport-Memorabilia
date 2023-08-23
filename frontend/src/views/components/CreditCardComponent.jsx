import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/creditCardComponent.css";
import Popup from 'reactjs-popup'
import CreditCardForm from "./CreditCardForm";
import axios from "axios";



export default function CreditCardComponent({id, bankName, cardNumber, cardExpirationYear, cardExpirationMonth, cardHolderName, cvv, default_card}) {
    const url = "http://localhost:5000/api";

    function breakCreditNumberToFour(newValue){
        //first regrex remove space, and second regrex non 0 - 9
        if(typeof newValue === typeof 123){
            newValue = newValue.toString();
        }
        let v = newValue.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let matches = v.match(/\d{4,16}/g);
        let match = matches && matches[0] || ''
        let parts = []

        for (let i=0, len=match.length; i<len; i+=4) {
            parts.push(match.substring(i, i+4))
        }
        if (parts.length) {
            return parts.join(' ')
        } else {
            return newValue
        }
    }

    async function removeCreditCard(){
        try{
            await axios.post(url+"/deleteCreditCard", {
                id: id
            })
        }catch(e){
            alert("Failed to delete");
            console.log(e);
        }
    }

    return(
        <div className= "credit-card">
            <p className= "light-mode-header-3  bank_name">{bankName}</p>
            <p className="light-mode-body card_number" >{breakCreditNumberToFour(cardNumber)}</p>
            <span className= "light-mode-header-3 card_holder_name">{cardHolderName}</span>
            <Popup trigger={<span className= "light-mode-body edit light-mode">Edit</span>}
                modal
            >
                {close => (
                    <div>
                        <CreditCardForm close = {close}
                        id = {id}
                        cardNumber = {cardNumber}
                        cardName = {cardHolderName}
                        cardExpirationYear = {cardExpirationYear}
                        cardExpirationMonth = {cardExpirationMonth}
                        cvv = {cvv}
                        default_card = {default_card}
                        newCard = {false}
                        ></CreditCardForm>
                    </div>
                )}
            
            </Popup>
            <span className= "light-mode-body remove light-mode-color-error" onClick = {removeCreditCard}>Remove</span>           
        </div>
    );
}