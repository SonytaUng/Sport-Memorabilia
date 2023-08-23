import React, { useState, useEffect } from "react";

import "../../styles/item.css";
import ReactStars from "react-stars";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import "../../styles/button.css";
import Cookies from "js-cookie";
import axios from "axios";
import { RemoveShoppingCart, ShoppingCartOutlined } from "@mui/icons-material";

function Item({
  itemTitle,
  itemDescription,
  itemImg,
  itemRating,
  itemPrice,
  itemId,
}) {
  const [wishlist, setWishlist] = useState(false);
  const [cart, setCart] = useState(false);

  useEffect(() => {
    console.log("ONLOAD");
    getWishlist().then(getCart().then());
  }, []);

  useEffect(() => {
    console.log("WISHLIST: " + wishlist);
  }, [wishlist]);

  async function getWishlist() {
    if (Cookies.get("accessToken")) {
      console.log(Cookies.get("accessToken"));
      try {
        let res = await axios.post(
          process.env.REACT_APP_API_URL + "api/isWishlist",
          {
            itemId: itemId,
          },
          {
            headers: {
              authorization: "Basic " + Cookies.get("accessToken"),
            },
          }
        );
        if (res.data.length !== 0) {
          setWishlist(true);
        }
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function getCart() {
    if (Cookies.get("accessToken")) {
      console.log(Cookies.get("accessToken"));
      try {
        let res = await axios.post(
          process.env.REACT_APP_API_URL + "api/isCart",
          {
            itemId: itemId,
          },
          {
            headers: {
              authorization: "Basic " + Cookies.get("accessToken"),
            },
          }
        );
        if (res.data.length !== 0) {
          setCart(true);
        }
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function wishlistClick() {
    console.log(Cookies.get("accessToken"));
    if (Cookies.get("accessToken")) {
      try {
        let res = await axios.post(
          process.env.REACT_APP_API_URL + "api/updateWishlist",
          {
            itemId: itemId,
          },
          {
            headers: {
              authorization: "Basic " + Cookies.get("accessToken"),
            },
          }
        );
        if (wishlist) {
          alert("Successfully removed from wishlist");
        } else {
          alert("Successfully added to wishlist");
        }
        setWishlist(!wishlist);
      } catch (e) {
        alert("Error adding to wishlist");
        console.log("ERROR");
        console.log(e);
      }
    } else {
      alert("Please log in to add this item to your wishlist");
    }
  }

  async function cartClick() {
    console.log(Cookies.get("accessToken"));
    if (Cookies.get("accessToken")) {
      try {
        let res = await axios.post(
          process.env.REACT_APP_API_URL + "api/updateCart",
          {
            itemId: itemId,
          },
          {
            headers: {
              authorization: "Basic " + Cookies.get("accessToken"),
            },
          }
        );
        if (cart) {
          alert("Successfully removed from cart");
        } else {
          alert("Successfully added to cart");
        }
        setCart(!cart);
      } catch (e) {
        alert("Error adding to cart");
        console.log("ERROR");
        console.log(e);
      }
    } else {
      alert("Please log in to add this item to your cart");
    }
  }

  return (
    <div>
      <div className="card-container">
        <div className="foreground-card">
          <div className="image-card">
            <img
              src={itemImg}
              style={{
                maxHeight: "200px",
                width: "275px",
                alignItems: "center",
                borderRadius: "5px",
              }}
            />
            {wishlist ? (
              <Favorite
                className="item-favorites item-favorited"
                onClick={wishlistClick}
              />
            ) : (
              <FavoriteBorder
                className="item-favorites item-not-favorited"
                onClick={wishlistClick}
              />
            )}
          </div>
          <div className="item-title">
            <h1 className="light-mode-header-1">
              <a href="/Itempage">{itemTitle}</a>
            </h1>
          </div>
          <div className="item-pricetag light-mode-header-3">${itemPrice}</div>
          <div className="item-description">
            <p className="light-mode-body">{itemDescription}</p>
          </div>
          <div className="item-details">
            <ReactStars count={5} size={24} edit={false} value={itemRating} />
            {cart ? (
              <RemoveShoppingCart className="item-cart" onClick={cartClick} />
            ) : (
              <ShoppingCartOutlined className="item-cart" onClick={cartClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
