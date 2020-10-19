import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen'
import ShippingScreen from './Screens/ShippingScreen'
import PaymentScreen from './Screens/PaymentScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/products/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/login" component={LoginScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
