import React from 'react';
import {Container}  from "react-bootstrap";

function About() {
  return (
    <Container>
      <h1 className="main-font text-center mt-5">About</h1>
      <p className="mt-4 sub-font">
        Mercatus is an online shopping application that allows users to buy and/or sell items. 
        Buyers and sellers can connect with each other based on their location preferences. 
        While sellers can post a list price, they are also able to negotiate the price with 
        buyers with the built-in messaging feature.
      </p>
     </Container>
  );
}

export default About;