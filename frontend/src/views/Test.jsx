import React from "react"; // DELETE TEST AT MERGE
import Item from "./components/Item";
import CreditCardComponent from "./components/CreditCardComponent";
import CreditCardForm from "./components/CreditCardForm";

function Test() {
  return (
    <div style={{ width: "50%", maxWidth: "75%" }}>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          height: "auto",
        }}
      >
        <Item
          itemName="Test Item 1"
          itemDesc="Test Item Description some random text"
          itemPrice="$3.52"
          itemRating="4.23"
          itemImg="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Aspect_ratio_-_4x3.svg/1200px-Aspect_ratio_-_4x3.svg.png"
        />
        <Item
          itemName="A very very very long item name here pay no attention"
          itemDesc="This is a very long description where I'm just rambling on and on and on and on and on about some random stuff that nobody cares about at all. I'm just trying to fill up some space here don't mind me! More random text more random text OH HEY SQUIRREL more random text and text and text and SQUIR- oh wait that's not a squirrel"
          itemPrice="$3.52"
          itemRating="4.8"
          itemImg="https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress%2Cformat&ixlib=php-3.3.0"
        />
        <Item
          itemName="Test Item 2"
          itemDesc="This is a very long description where I'm just rambling on and on and on and on and on about some random stuff that nobody cares about at all. I'm just trying to fill up some space here don't mind me! More random text more random text OH HEY SQUIRREL more random text and text and text and SQUIR- oh wait that's not a squirrel"
          itemPrice="$3.52"
          itemRating="2.4"
          itemImg="https://beta.ctvnews.ca/content/dam/ctvnews/images/2019/11/19/1_4692108.jpg"
        />
      </div>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          height: "auto",
          width: "auto",
        }}
      >
        <Item
          itemName="Test Item 1"
          itemDesc="Test Item Description some random text"
          itemPrice="$3.52"
          itemRating="3.1"
          itemImg="https://i.kym-cdn.com/entries/icons/facebook/000/034/772/Untitled-1.jpg"
        />
        <Item
          itemName="Test Item 2"
          itemDesc="This is a very long description where I'm just rambling on and on and on and on and on about some random stuff that nobody cares about at all. I'm just trying to fill up some space here don't mind me! More random text more random text OH HEY SQUIRREL more random text and text and text and SQUIR- oh wait that's not a squirrel"
          itemPrice="$3.52"
          itemRating="1.6"
          itemImg="https://imgs.xkcd.com/comics/exploits_of_a_mom.png"
        />
        <Item
          itemName="Test Item 2"
          itemDesc="This is a very long description where I'm just rambling on and on and on and on and on about some random stuff that nobody cares about at all. I'm just trying to fill up some space here don't mind me! More random text more random text OH HEY SQUIRREL more random text and text and text and SQUIR- oh wait that's not a squirrel"
          itemPrice="$3.52"
          itemRating="2"
          itemImg="https://memegenerator.net/img/instances/76600345.jpg"
        />
        <Item
          itemName="Test Item 2"
          itemDesc="This is a very long description where I'm just rambling on and on and on and on and on about some random stuff that nobody cares about at all. I'm just trying to fill up some space here don't mind me! More random text more random text OH HEY SQUIRREL more random text and text and text and SQUIR- oh wait that's not a squirrel"
          itemPrice="$3.52"
          itemRating="4.5"
          itemImg="https://moderndogmagazine.com/sites/default/files/images/articles/top_images/DogeMeme.jpg"
        />
        <Item
          itemName="Test Item 2"
          itemDesc="This is a very long description where I'm just rambling on and on and on and on and on about some random stuff that nobody cares about at all. I'm just trying to fill up some space here don't mind me! More random text more random text OH HEY SQUIRREL more random text and text and text and SQUIR- oh wait that's not a squirrel"
          itemPrice="$3.52"
          itemRating="1"
          itemImg="https://i.kym-cdn.com/entries/icons/original/000/035/692/cover1.jpg"
        />
      </div>
      <div>
        <CreditCardComponent 
          bankName = "US Bank"
          cardNumber = "1234 5678 9012 3456"
          cardHolderName = "Leyuan Loh"
        />
      </div>
      <div>
        <CreditCardForm
          cardNumber = "" cardName= "" cardExpiration= "MMYY" cvv= "" default_card= ""
        />
      </div>
    </div>
    
  );
}

export default Test;
