import { React, useEffect, useState }from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Dropdown, Row, Col } from "react-bootstrap";
import "../styles/itemslist.css";
import Item from "./components/Item";

function ItemsList() {  
  const [relevantSearches, setRelevantSearches] = useState("");
  const [imgGrid, setImgGrid] = useState("");
  const url = "http://localhost:5000/api";

  useEffect(() => {
    getRelevantSearches();
    getImgGrid();
  }, []);

  async function getRelevantSearches() {
    try {
      let res = await axios.get(url + "/relevantSearches");
      console.log(res.data.relevant_searches);
      let relSearches   = res.data.relevant_searches;

      let searchesList  = relSearches.map((search) => 
                                            <li className="main-font white-font" key={search}>{search}</li>
                                          );
      
      setRelevantSearches(searchesList);
    } catch (e) {
      alert("Failed to issue GET request.");
    }
  }

  async function getImgGrid() {
    let grid = [];

    let titles        = [];
    let descriptions  = [];
    let prices        = [];
    let rating        = [];
    let images        = [];

    try {
      let res = await axios.get(url + "/getItems");
      console.log(res.data);
      titles        = res.data.itemTitle;
      descriptions  = res.data.itemDescription;
      prices        = res.data.itemPrice;
      rating        = res.data.itemRating;
      images        = res.data.itemImg;  

    } catch (e) {
      console.log("Could not issue GET request to retrieve items");
    }

    for (let i = 0; i < titles.length; i ++) {
      grid.push(
        <Item 
          itemId={i + 1}
          itemTitle={titles[i]}
          itemDescription={descriptions[i]}
          itemPrice={prices[i]}
          itemRating={rating[i]}
          itemImg={images[i]}
        />
      );
    }
    setImgGrid(grid);
  }

  return (
       <Container fluid>
         <Row>
           {/** Hopefully the width of first column is just fitting its content */}
          <Col className="left-panel" md={2}>
            <div className = "affix">
              <h3 className="mt-3 main-font white-font">Sort by:</h3>
                <Dropdown className="ms-5">
                  <Dropdown.Toggle variant="light" id="dropdown-basic" className="main-font">
                    Sort Options
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" className="main-font">Relevance</Dropdown.Item>
                    <Dropdown.Item href="#/action-2" className="main-font">New and Popular</Dropdown.Item>
                    <Dropdown.Item href="#/action-3" className="main-font">Price: High to Low</Dropdown.Item>
                    <Dropdown.Item href="#/action-3" className="main-font">Price: Low to High</Dropdown.Item>
                    <Dropdown.Item href="#/action-3" className="main-font">Newest Arrivals</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

              <div className="mt-5">
                <h3 className="mt-5 main-font white-font">Related Searches:</h3>
                  <div className="mt-2 ms-5">
                    <ul className="no-bullets">
                      {relevantSearches}
                    </ul>
                  </div>
              </div>
            </div>
          </Col>
      
          <Col >
            <div className= "items-grid">
              {imgGrid}
            </div>
          </Col>
         </Row>
       </Container> 
  );
}

export default ItemsList;
