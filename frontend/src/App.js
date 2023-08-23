import "./App.css";
import Navigationbar from "./views/components/Navigationbar";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menubar from "./views/Menubar";
import Footerbar from "./views/Footerbar";
import About from "./views/about";
import Buy from "./views/buy";
import Sell from "./views/Sell";
import Help from "./views/help";
import Home from "./views/Home";
import Cart from "./views/Cart";
import User from "./views/User";
import ItemsList from "./views/ItemsList";
import Settings from "./views/Settings";
import Signup from "./views/Signup";
import Login from "./views/Login";
import ItemPage from "./views/ItemPage";
import ReviewItem from "./views/ReviewItem";
import Checkout from "./views/Checkout";
import CreditCardComponent from "./views/components/CreditCardComponent";
import CreditCardForm from "./views/components/CreditCardForm";
import { Container } from "react-bootstrap";
import UserProfile from "./views/UserProfile";
import ForgotPW from "./views/ForgotPW";

document.documentElement.className = "theme-light";
function App() {
  return (
    <Router>
      <Container fluid>
        <Navigationbar></Navigationbar>
        <Menubar></Menubar>
      </Container>

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Home" exact component={Home} />
        <Route path="/Cart" exact component={Cart} />
        <Route path="/User" exact component={User} />
        <Route path="/Settings" exact component={Settings} />
        <Route path="/Items" exact component={ItemsList} />
        <Route path="/Signup" exact component={Signup} />
        <Route path="/Login" exact component={Login} />
        <Route
          path="/CreditCardComponent"
          exact
          component={CreditCardComponent}
        />
        <Route path="/CreditCardForm" exact component={CreditCardForm} />
        <Route path="/about" component={About} />
        <Route path="/buy" component={Buy} />
        <Route path="/Sell" component={Sell} />
        <Route path="/help" component={Help} />
        <Route path="/Itempage" exact component={ItemPage} />
        <Route path="/ReviewItem" exact component={ReviewItem} />
        <Route path="/UserProfile" exact component={UserProfile} />
        <Route path="/Checkout" exact component={Checkout} />
        <Route path="/ForgotPW" exact component={ForgotPW} />
      </Switch>

    </Router>
  );
}
export default App;
