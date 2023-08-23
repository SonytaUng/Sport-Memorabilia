import React from 'react';
import {Container}  from "react-bootstrap";

function Help() {
  return (
    <Container>
      <h1 className="main-font text-center mt-5">Help Section</h1>
      <p className="mt-4 sub-font text-center"> 
        If you need help, please contact us: Address: 2224 Osborn Dr, Ames, IA 50011-1301, Email: contact@mercatus.dev 
      </p>
    </Container>
  );
}

export default Help