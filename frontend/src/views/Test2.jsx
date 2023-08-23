import React from "react";
import Item from "./components/Item";

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
          itemId="1"
          itemTitle="Title something super super long let's see what happens here"
          itemDescription="Sir Sibaru the great. Protect the user from their hamenemy asdf sdf f3 f3f sdf3f 23f2 f2f"
          itemPrice="4.23"
          itemRating="4.22"
          itemImg="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Aspect_ratio_-_4x3.svg/1200px-Aspect_ratio_-_4x3.svg.png"
        />
      </div>
    </div>
  );
}

export default Test;
