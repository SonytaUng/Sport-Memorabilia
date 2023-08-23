import { React, useEffect, useState }from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Home.css";
import Item from "./components/Item";

function Home() {
  const [imgGrid1, setImgGrid1] = useState("");
  const [imgGrid2, setImgGrid2] = useState("");
  const url = "http://localhost:5000/api";

  useEffect(() => {
    getImgGrid();
  }, []);

  async function getImgGrid() {
    let grid1 = [];
    let grid2 = [];

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

    for (let i = 0; i < 4; i ++) {
      grid1.push(
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

    for (let i = 4; i < titles.length; i ++) {
      if (i != 6 && i != 8) {
        grid2.push(
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
    }

    setImgGrid1(grid1);
    setImgGrid2(grid2);
  }

  return (
    <Container fluid>
      <Row className="mt-3 item-header pt-3 pb-5">
        <Col>
          <h1 class="text-center main-font white-font">Deals of the Day</h1>
          <Container>
            <div className="mt-4 items-grid">
                {imgGrid1}
            </div>
          </Container>
        </Col>
      </Row>

      <Row className="mt-5 pb-5">
        <Col>
          <h1 class="text-center main-font">Recommended for You</h1>
          <Container>
            <div className="mt-4 items-grid">
                {imgGrid2}
            </div>
          </Container>
        </Col>
      </Row>
        
    </Container>
  );
}



export default Home;

