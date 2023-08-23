require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.ACCESS_TOKEN_SECRET;

let strategy = new JWTstrategy(jwtOptions, function (jwt_payload, next) {
  console.log("payload received", jwt_payload);
  // usually this would be a database call:
  var user = users[_.findIndex(users, { id: jwt_payload.id })];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

const app = express();
const port = 5000;

let bankName = [
  "JPMorgan",
  "Bank of America",
  "Wells Fargo",
  "US Bank",
  "Citigroup",
  "HSBC",
  "Citizens",
  "Discover",
  "HexGroup",
];

let creditCards = [
  {
    bankName: "Well Fargo",
    cardNumber: 2357111317192329,
    cardHolderName: "Leyuan Loh",
    cardExpirationYear: 22,
    cardExpirationMonth: 5,
    cvv: 912,
    default_card: true,
  },
  {
    bankName: "Bank Murica",
    cardNumber: 2357123317114899,
    cardHolderName: "Gip Me Wan Dollar",
    cardExpirationYear: 24,
    cardExpirationMonth: 12,
    cvv: 313,
    default_card: false,
  },
  {
    bankName: "Bank Meta",
    cardNumber: 2357123317112313,
    cardHolderName: "Mark",
    cardExpirationYear: 21,
    cardExpirationMonth: 2,
    cvv: 123,
    default_card: false,
  },
];

const connection = mysql.createConnection({
  host: "coms-319-g11.cs.iastate.edu",
  user: "backend",
  password: "back3nd",
  database: "mercatus",
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

connection.connect();

app.post("/api/signin", async (req, res) => {
  connection.query(
    "SELECT * FROM User WHERE username = ?",
    [req.body.username],
    async (err, user) => {
      if (err) throw err;
      if (user.length === 0) {
        return res.status(401).send();
      }
      try {
        console.log(await bcrypt.compare(req.body.password, user[0].password));
        if (await bcrypt.compare(req.body.password, user[0].password)) {
          thisUser = {
            username: user[0].username,
            first_name: user[0].first_name,
            last_name: user[0].last_name,
            email: user[0].email,
            dob: user[0].dob,
          };
          const accessToken = jwt.sign(
            thisUser,
            process.env.ACCESS_TOKEN_SECRET
          );
          console.log(accessToken);
          res.status(200).send({ accessToken: accessToken });
        }
        res.status(401).send();
      } catch (e) {
        console.log("ERROR");
        console.log(e);
      }
    }
  );
});

app.post("/api/forgotpw", async (req, res) => {
  connection.query(
    "SELECT * FROM User WHERE email = ?",
    [req.body.email],
    async (err, user) => {
      if (err) throw err;
      if (user.length === 0) {
        return res.status(200).send({
          message: "Email not found",
        });
      } else {
        return res.status(200).send({
          message: "Email found",
        });
      }
    }
  );
});

app.post("/api/signup", async (req, res) => {
  let str = "";
  await connection.query(
    "SELECT * FROM User WHERE username = ?",
    [req.body.username],
    async (err, user) => {
      if (err) throw err;
      if (user.length > 0) {
        console.log("Username already exists");
        str += "Username ";
      }
      await connection.query(
        "SELECT * FROM User WHERE email = ?",
        [req.body.email],
        async (err, user) => {
          if (err) throw err;
          if (user.length > 0) {
            console.log("Email already exists");
            if (str.length === 0) {
              str += "Email ";
            } else {
              str += "and Email ";
            }
          }
          if (str.length > 0) {
            str += "already exist";
            res.status(403).send({
              error: {
                status: 403,
                error: "user_create_conflict",
                message: str,
              },
            });
          } else {
            try {
              const hashedPassword = await bcrypt.hash(req.body.password, 10);
              let sql =
                "INSERT INTO User (username, first_name, last_name, email, dob, password, phone) VALUES (?, ?, ?, ?, ?, ?, ?)";
              await connection.query(
                sql,
                [
                  req.body.username,
                  req.body.first_name,
                  req.body.last_name,
                  req.body.email,
                  req.body.dob,
                  hashedPassword,
                  req.body.phone,
                ],
                async function (err, row) {
                  if (err) {
                    console.log("ERROR");
                    res.status(500).send();
                  } else {
                    res.status(200).send({
                      data: {
                        message: "User successfully inserted",
                      },
                    });
                  }
                }
              );
            } catch (e) {
              console.log("ERROR");
              res.send(500);
            }
          }
        }
      );
    }
  );
});

app.post("/api/updateWishlist", authenticateToken, async (req, res) => {
  console.log("User: " + req.user.username + " itemId: " + req.body.itemId);
  let username = req.user.username;
  let itemId = req.body.itemId;
  await connection.query(
    "SELECT * FROM Wishlist WHERE user = ? AND item = ?",
    [username, itemId],
    async function (err, row) {
      if (err) {
        console.log("ERROR");
        res.status(500).send();
      } else {
        if (row.length === 0) {
          let str = "INSERT INTO Wishlist (user, item) VALUES (?, ?)";
          await connection.query(
            str,
            [username, itemId],
            async function (err, row) {
              if (err) {
                console.log("ERROR");
                res.status(500).send();
              } else {
                console.log("SUCCESSFULLY INSERTED");
                res.status(200).send();
              }
            }
          );
        } else {
          let str = "DELETE FROM Wishlist WHERE user = ? AND item = ?";
          await connection.query(
            str,
            [username, itemId],
            async function (err, row) {
              if (err) {
                console.log("ERROR");
                console.log(err);
                res.status(500).send();
              } else {
                console.log("SUCCESSFULLY DELETED");
                res.status(200).send();
              }
            }
          );
        }
        console.log("SUCCESS");
        res.status(200).send(row);
      }
    }
  );
});

app.post("/api/isWishlist", authenticateToken, async (req, res) => {
  await connection.query(
    "SELECT * FROM Wishlist WHERE user = ? AND item = ?",
    [req.user.username, req.body.itemId],
    async function (err, row) {
      if (err) {
        console.log("ERROR");
        res.status(500).send();
      } else {
        console.log("SUCCESS");
        console.log(req.user.username);
        console.log(req.body.itemId);
        console.log(row);
        res.status(200).send(row);
      }
    }
  );
});

app.post("/api/getWishlist", async (req, res) => {
  await connection.query(
    "SELECT item FROM Wishlist WHERE user = ?",
    [req.body.username],
    async function (err, row) {
      if (err) {
        console.log("ERROR");
        res.status(500).send();
      } else {
        console.log(row);
        let temp = [];
        for (let i = 0; i < row.length; i++) {
          temp.push(row[i].item);
        }
        console.log(temp);
        res.status(200).send(temp);
      }
    }
  );
});

app.post("/api/getCart", async (req, res) => {
  await connection.query(
    "SELECT item FROM Cart WHERE user = ?",
    [req.body.username],
    async function (err, row) {
      if (err) {
        console.log("ERROR");
        res.status(500).send();
      } else {
        console.log(row);
        let temp = [];
        for (let i = 0; i < row.length; i++) {
          temp.push(row[i].item);
        }
        console.log(temp);
        res.status(200).send(temp);
      }
    }
  );
});

app.post("/api/getItemInfo", async (req, res) => {
  await connection.query(
    "SELECT * FROM Item WHERE item_id = ?",
    [req.body.iid],
    async function (err, row) {
      if (err) {
        console.log("ERROR");
        res.status(500).send();
      } else {
        console.log(row[0]);
        res.status(200).send(row[0]);
      }
    }
  );
});

app.post("/api/updateCart", authenticateToken, async (req, res) => {
  console.log("User: " + req.user.username + " itemId: " + req.body.itemId);
  let username = req.user.username;
  let itemId = req.body.itemId;
  await connection.query(
    "SELECT * FROM Cart WHERE user = ? AND item = ?",
    [username, itemId],
    async function (err, row) {
      if (err) {
        console.log("ERROR");
        console.log(err);
        res.status(500).send();
      } else {
        if (row.length === 0) {
          let str = "INSERT INTO Cart (user, item, amount) VALUES (?, ?, ?)";
          await connection.query(
            str,
            [username, itemId, 1],
            async function (err, row) {
              if (err) {
                console.log("ERROR");
                console.log(err);
                res.status(500).send();
              } else {
                console.log("SUCCESSFULLY INSERTED");
                res.status(200).send();
              }
            }
          );
        } else {
          let str = "DELETE FROM Cart WHERE user = ? AND item = ?";
          await connection.query(
            str,
            [username, itemId],
            async function (err, row) {
              if (err) {
                console.log("ERROR");
                console.log(err);
                res.status(500).send();
              } else {
                console.log("SUCCESSFULLY DELETED");
                res.status(200).send();
              }
            }
          );
        }
        console.log("SUCCESS");
        res.status(200).send(row);
      }
    }
  );
});

app.post("/api/isCart", authenticateToken, async (req, res) => {
  await connection.query(
    "SELECT * FROM Cart WHERE user = ? AND item = ?",
    [req.user.username, req.body.itemId],
    async function (err, row) {
      if (err) {
        console.log("ERROR");
        res.status(500).send();
      } else {
        console.log("SUCCESS");
        console.log(req.user.username);
        console.log(req.body.itemId);
        console.log(req.body.amount);
        console.log(row);
        res.status(200).send(row);
      }
    }
  );
});

// TODO: Return relevant searches tied to an item
app.get("/api/relevantSearches", async (req, res) => {
  res.json({
    // Return dummy information for now
    relevant_searches: [
      "shimmer potions",
      "vi's goggles",
      "shampoo",
      "caitlyn's sniper rifle",
      "jericho's fishes",
      "Arcane Season 2",
    ],
  });
});

app.get("/api/getuser", async (req, res) => {
  res.json({
    accessToken: accessToken,
    currentUser: thisUser,
  });
});

app.post("/api/updateUser", async (req, res) => {
  const SQL_USER_COLS = [
    "username",
    "email",
    "first_name",
    "last_name",
    "dob",
    "phone",
    "password",
  ];
  const SQL_STRING_USER_COLS = [
    "username",
    "email",
    "first_name",
    "last_name",
    "dob",
    "password",
  ];
  const PASSWORD_COL = 6;

  let username = req.body.username;
  let indices = req.body.indices;
  let inputs = req.body.inputs;
  let user = req.body.user;

  let updatedCols = "";
  let SQL_SET_STR = "SET ";

  for (let i = 0; i < indices.length; i++) {
    if (i > 0) {
      SQL_SET_STR += ", ";
    }

    let col = SQL_USER_COLS[indices[i]];
    let val = inputs[i];

    if (PASSWORD_COL == indices[i]) {
      const hashedPassword = await bcrypt.hash(inputs[i], 10);
      val = hashedPassword;
    }

    updatedCols += "* " + col + "\n";

    if (SQL_STRING_USER_COLS.includes(col)) {
      SQL_SET_STR += col + "='" + val + "'";
    } else {
      SQL_SET_STR += col + "=" + val;
    }
  }

  let sql =
    "UPDATE User " + SQL_SET_STR + " WHERE username='" + username + "';";
  console.log(sql); // debug
  try {
    await connection.query(sql, async function (err, row) {
      if (err) {
        console.log("ERROR: Error with issuing SQL command.");
        if (err.sqlMessage) {
          console.log("sqlMessage: " + err.sqlMessage);
          console.log("code: " + err.code);
          console.log("sqlState: " + err.sqlState);
          console.log("sql: " + sql);
        } else {
          console.log(err);
        }
        res.status(500).send();
      } else {
        let thisUser = {
          username: user[0],
          first_name: user[1],
          last_name: user[2],
          email: user[3],
          dob: user[4],
          phone: user[5],
        };

        let accessToken = jwt.sign(thisUser, process.env.ACCESS_TOKEN_SECRET);

        res.status(200).send({
          message: "Successfully updated the following:\n" + updatedCols,
          accessToken: accessToken,
        });
      }
    });
  } catch (e) {
    console.log("ERROR: Could not update record in User table.");
    res.send(500);
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello world!",
  });
});

app.get("/api/getUserData", authenticateToken, (req, res) => {
  res.json(req.user);
});

app.post("/api/getShippingAddresses", async (req, res) => {
  let username = req.body.username;
  let sql = "SELECT * FROM Address WHERE username='" + username + "';";

  try {
    connection.query(sql, async function (err, results, fields) {
      if (err) {
        if (err.sqlMessage) {
          console.log("sqlMessage: " + err.sqlMessage);
          console.log("code: " + err.code);
          console.log("sqlState: " + err.sqlState);
          console.log("sql: " + sql);
        } else {
          console.log(err);
          res.status(500).send({
            message: err,
          });
        }
      } else {
        let shippingAddresses = JSON.parse(JSON.stringify(results));
        res.status(200).send({
          shippingAddresses: shippingAddresses,
        });
      }
    });
  } catch (e) {
    console.log("ERROR: Could not fetch the user's shipping addresses.");
    res.send(500);
  }
});

app.post("/api/updateAddress", async (req, res) => {
  const SQL_ADDRESS_COLS = [
    "address_line_1",
    "address_line_2",
    "state",
    "city",
    "zip_code",
    "username",
  ];
  const USERNAME_COL = 5;

  let username = req.body.username;
  let inputs = req.body.inputs;
  let addressID = req.body.addressID;
  let newAddress = addressID < 1;

  let SQL_STR = "";

  if (newAddress) {
    inputs.push(username);
    SQL_STR +=
      "INSERT INTO Address(address_line_1, address_line_2, state, city, zip_code, username)\nVALUES\n";
  } else {
    SQL_STR += "UPDATE Address\nSET ";
  }

  for (let i = 0; i < SQL_ADDRESS_COLS.length; i++) {
    let col = SQL_ADDRESS_COLS[i];
    let val = inputs[i];

    if (i > 0) {
      if (!newAddress && i == USERNAME_COL) {
        // don't add comma
      } else {
        SQL_STR += ", ";
      }
    }

    if (newAddress) {
      if (i == 0) {
        SQL_STR += "(";
      }

      SQL_STR += "'" + val + "'";

      if (i == USERNAME_COL) {
        SQL_STR += ");";
      }
    } else {
      if (i != USERNAME_COL) {
        SQL_STR += col + "='" + val + "'";
      }
    }
  }

  let sql = "";
  if (newAddress) {
    sql = SQL_STR;
  } else {
    sql = SQL_STR + " WHERE address_id=" + addressID + ";";
  }

  console.log(sql); // debug

  try {
    await connection.query(sql, async function (err, row) {
      if (err) {
        console.log("ERROR: Error with issuing SQL command.");
        if (err.sqlMessage) {
          console.log("sqlMessage: " + err.sqlMessage);
          console.log("code: " + err.code);
          console.log("sqlState: " + err.sqlState);
          console.log("sql: " + sql);
        } else {
          console.log(err);
        }
        res.status(500).send();
      } else {
        res.status(200).send({
          message: "Successfully updated address",
        });
      }
    });
  } catch (e) {
    console.log("ERROR: Could not update record in User table.");
    res.send(500);
  }
});

app.get("/api/getItems", async (req, res) => {
  const pinguImg =
    "https://www.kindpng.com/picc/m/166-1666623_transparent-pingu-png-png-download.png";
  const laptopImg =
    "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8NjQxNzh8aW1hZ2UvcG5nfGhjNi9oMjgvMTAwMTQwNzg4OTQxMTAucG5nfDZiNmQyMmVlZDQ1MmUwYzI0ZWM1YTIyZTU4ZjU1NTFlOWZhYjE2ODBiYTc4MmQxYTU3ZDhiYWMwZGFmMjU2ZDE/lenovo-ideapad-S145-15-amd-platinum-grey-hero.png";
  const teaImg =
    "https://cdn.vox-cdn.com/thumbor/4uKouR2s17FBK1SDLJ4WxQS8WBk=/0x0:864x864/1200x900/filters:focal(363x363:501x501):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/67696682/61602215_1967395886721236_5626592103346733056_n.0.jpg";
  const gemstoneImg =
    "https://lh5.googleusercontent.com/dTb0qmgfmjhP-Umt5_E_pFRAp4Ft6-PD-W6_EunM1o3hPDU29jl411jHY0xHvjso1qKnONgq36i6TTpMah0wdrr8PoNCo-_oVFBhQUYPaKd7KW9r4hEwumJShT7Bcv0pWNEe5KGB";
  const cupcakeImg =
    "https://preview.redd.it/3fskuk1let281.jpg?width=640&crop=smart&auto=webp&s=1c482bf1a83ed399c61a312855a0d6f0d4aaeb4d";
  const heimerdingerImg =
    "https://images.contentstack.io/v3/assets/blt5bbf09732528de36/bltbb5ff4a21272d749/5f593ff05a02e758c950bf22/2018-09-07_2000_06_16.185_image_75.png";
  const shimmerImg =
    "https://cdn1.dotesports.com/wp-content/uploads/2021/11/15015306/image-26-1024x431.png";
  const gauntletImg = "https://pbs.twimg.com/media/FFERRWcVgAAoyMw.jpg";
  const viktorCaneImg =
    "https://cdna.artstation.com/p/assets/images/images/043/207/594/smaller_square/szymon-borowik-cane.jpg?1636605773";
  const jayceHammerImg =
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/deb4b58a-04df-460f-a857-90813143a858/dapw125-061553c9-e77c-45b2-a50d-cabc21f503b8.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RlYjRiNThhLTA0ZGYtNDYwZi1hODU3LTkwODEzMTQzYTg1OFwvZGFwdzEyNS0wNjE1NTNjOS1lNzdjLTQ1YjItYTUwZC1jYWJjMjFmNTAzYjguanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.WU_xguoBaYuRL0-dC_M_X7InwLPzfDtbYTNHWotgptM";

  res.json({
    itemTitle: [
      "Pingu Figurine",
      "Lenovo IdeaPad, Chromebook, Laptop",
      "Super Tea",
      "Gemstone",
      "Cupcake",
      "Heimerdinger Figurine",
      "Shimmer 12oz",
      "Hextech Gauntlet",
      "Viktor's Cane",
      "Jayce's Hammer",
    ],
    itemDescription: [
      "Limited edition Pingu figurine.",
      "No setup required. Log in to your Chromebook laptop with your Google account and you're ready to go",
      "It's some powerful tea.",
      "Build any hextech device with this.",
      "(aka Matilda)",
      "Little hamster dude",
      "Take in moderation (side effects include death)",
      "For mining purposes *wink* *wink*",
      "He got shimmer legs now",
      "Not safe for children lol",
    ],
    itemPrice: [
      999.99, 123.75, 20.0, 150.0, 9999, 880.0, 0.5, 5550.6, 100.0, 13.5,
    ],
    itemRating: [5.0, 5.0, 4.5, 3.5, 5.0, 5.0, 2.3, 5.0, 3.2, 2.6],
    itemImg: [
      pinguImg,
      laptopImg,
      teaImg,
      gemstoneImg,
      cupcakeImg,
      heimerdingerImg,
      shimmerImg,
      gauntletImg,
      viktorCaneImg,
      jayceHammerImg,
    ],
  });
});

app.get(
  "/test2",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.send(req);
  }
);

app.get("/api/getCreditCards", (req, res) => {
  res.json(JSON.stringify({ creditCards: creditCards }));
});

function setDefaultCardFalse() {
  for (let i = 0; i < creditCards.length; i++) {
    creditCards[i].default_card = false;
  }
  return true;
}

function getFindMaxIdCreditCard() {
  let max = 0;
  for (let i = 0; i < creditCards.length; i++) {
    if (creditCards[i].id > max) {
      max = creditCards[i].id;
    }
  }
  return max + 1;
}

app.post("/api/editCreditCard", (req, res) => {
  console.log(req.body);
  if (req.cardDefault) {
    setDefaultCardFalse();
  }
  for (let i = 0; i < creditCards.length; i++) {
    //Intended using ==
    if (creditCards[i].id === req.body.id) {
      creditCards[i].cardNumber = req.body.cardNumber;
      creditCards[i].cardHolderName = req.body.cardName;
      creditCards[i].cardExpirationMonth = req.body.cardExpirationMonth;
      creditCards[i].cardExpirationYear = req.body.cardExpirationYear;
      creditCards[i].cvv = req.body.cardCVV;
      creditCards[i].default_card = req.body.cardDefault;
      res.status(200).send();
      break;
    }
  }
  res.status(500).send();
});

app.post("/api/deleteCreditCard", (req, res) => {
  for (let i = 0; i < creditCards.length; i++) {
    console.log();
    if (req.body.id === creditCards[i].id) {
      creditCards.splice(i, 1);
      res.status(200).send();
      return;
    }
  }
  res.status(500).send({ err: "Can't find the credit card with the id." });
});

app.post("/api/createCreditCard", (req, res) => {
  if (req.cardDefault) {
    setDefaultCardFalse();
  }
  let newCreditCard = {};
  newCreditCard.id = getFindMaxIdCreditCard();
  newCreditCard.cardNumber = req.body.cardNumber;
  newCreditCard.cardHolderName = req.body.cardName;
  newCreditCard.cardExpirationMonth = req.body.cardExpirationMonth;
  newCreditCard.cardExpirationYear = req.body.cardExpirationYear;
  newCreditCard.cvv = req.body.cardCVV;
  newCreditCard.default_card = req.body.cardDefault;
  let randNumber = Math.floor(Math.random() * bankName.length);
  console.log(randNumber);
  newCreditCard.bankName = bankName[randNumber];
  console.log(newCreditCard.bankName);
  creditCards.push(newCreditCard);
  res.status(200).send();
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/api/getpayment", async (req, res) => {
  connection.query(
    'SELECT * FROM Payment WHERE username = "agbier"',
    function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    }
  );
});
