import React, { useEffect, useState } from "react";
import "../styles/UserProfile.css";
import "bootstrap/dist/css/bootstrap.css";
import profile_pic from "../images/profile_pic.jpg";
import { Col } from "react-bootstrap";
import Item from "./components/Item";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router";

function UserProfile() {
  const [imgGrid, setImgGrid] = useState("");
  const [imgGrid3, setImgGrid3] = useState("");
  const [imgGrid4, setImgGrid4] = useState("");
  const [imgGrid5, setImgGrid5] = useState("");
  const [imgGrid2, setImgGrid2] = useState("");
  const [wl, setwl] = useState([]);
  const [wlgrid, setwlgrid] = useState();
  const [wlid, setwlid] = useState([]);
  const url = "http://localhost:5000/api";

  const history = useHistory();

  useEffect(() => {
    if (!Cookies.get("accessToken")) {
      history.push("/login");
    }
    getImgGrid();
    getImgGrid2();
  }, []);

  useEffect(() => {
    console.log("GRID");
    console.log(imgGrid3);
  }, [imgGrid3]);

  function signOut() {
    Cookies.remove("accessToken");
    console.log(Cookies.get("accessToken"));
    history.push("/home");
  }

  async function getImgGrid() {
    let grid = [];

    let titles = [];
    let descriptions = [];
    let prices = [];
    let rating = [];
    let images = [];

    try {
      let res = await axios.get(url + "/getItems");
      console.log(res.data);
      titles = res.data.itemTitle;
      descriptions = res.data.itemDescription;
      prices = res.data.itemPrice;
      rating = res.data.itemRating;
      images = res.data.itemImg;
    } catch (e) {
      console.log("Could not issue GET request to retrieve items");
    }

    for (let i = 0; i < 3; i++) {
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
    grid = [];
    for (let i = 3; i < 6; i++) {
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
    setImgGrid3(grid);
    grid = [];
    for (let i = 6; i < 9; i++) {
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
    setImgGrid4(grid);
    grid = [];
    for (let i = 9; i < titles.length; i++) {
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
    setImgGrid5(grid);
  }
  async function getImgGrid2() {
    let grid = [];

    let titles = [];
    let descriptions = [];
    let prices = [];
    let rating = [];
    let images = [];

    try {
      let res = await axios.get(url + "/getItems");
      console.log(res.data);
      titles = res.data.itemTitle;
      descriptions = res.data.itemDescription;
      prices = res.data.itemPrice;
      rating = res.data.itemRating;
      images = res.data.itemImg;
    } catch (e) {
      console.log("Could not issue GET request to retrieve items");
    }

    for (let i = 0; i < 3; i++) {
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
    setImgGrid2(grid);
  }

  async function doClick() {
    await getWish();
    // await temp2();
  }

  async function getWish() {
    console.log(Cookies.get("accessToken"));
    try {
      let res = await axios.post(
        process.env.REACT_APP_API_URL + "api/getWishlist",
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
      for (let i = 0; i < temparr.length; i++) {
        grid.push(
          <Item
            itemId={temparr[i].item_id}
            itemTitle={temparr[i].title}
            itemDescription={temparr[i].description}
            itemPrice={temparr[i].price}
            itemRating={temparr[i].rating}
            itemImg={temparr[i].image}
          />
        );
      }
      setwlgrid(grid);
      // setwlid(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    console.log("GRID THING");
    console.log(wlgrid);
    console.log(imgGrid3);
  }, [wlgrid]);

  useEffect(() => {
    getWish();
  });

  return (
    <div className="profile-form-flex">
      {/*<input*/}
      {/*  type="button"*/}
      {/*  value="Temp"*/}
      {/*  className="light-mode-button ps-3 pe-3 pt-2 pb-2 ms-4"*/}
      {/*  onClick={doClick}*/}
      {/*/>*/}
      <div className="col-1">
        <img src={profile_pic} className="profile-image" />
        <div className="profile-username">dogwoofwoof</div>
        <div className="profile-star-ratings">
          <div className="star-ratings-top">★★★★</div>
          <div className="star-ratings-bottom">★★★★★</div>
        </div>
        <div className="member">Member since 9-12-2021</div>
        <div className="others">Unit 19,Wakanda 31919,Murica</div>
        <div className="others">257 Items sold</div>
        <div className="others">800 Items bought</div>
      </div>
      <div className="col-3">
        <div className="color-1">
          <div className="wishList">Public Wish Lists</div>
          <div className="items-grid2">{wlgrid}</div>
          {/*<div className="items-grid2">{imgGrid2}</div>*/}
        </div>
        <br></br>
        <div className="color-3">
          <div className="wishList">Best Selling Items</div>
          {/*<div className="items-grid3">{imgGrid}</div>*/}
          <div className="items-grid3">{imgGrid3}</div>
          <div className="items-grid3">{imgGrid4}</div>
        </div>
        <div className="signout">
          <input
            type="button"
            value="Sign out"
            className="light-mode-button ps-3 pe-3 pt-2 pb-2 ms-4"
            onClick={signOut}
          />
        </div>
      </div>
    </div>
  );
}
export default UserProfile;
