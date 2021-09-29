import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart,Favorite } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import Products from './components/Products/Products'
// import Navbar from './components/Navbar/Navbar'
//import Favorite from './components/Favorite/Favorite';

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState({});
  const [favorite, setFavorite] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();
    setCategories(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const fetchFavorite = async () => {
    setFavorite(await commerce.favorite.retrieve());
  };


  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  const handleAddToFavorite = async (productId,quantity) => {
    const { favorite } = await commerce.favorite.add(productId,quantity);

    setFavorite(favorite);
  };
  const handleRemoveFromFavorite = async (productId) => {
    const { favorite } = await commerce.favorite.remove(productId);

    setFavorite(favorite);
  };

  const handleEmptyFavorite = async () => {
    const { favorite } = await commerce.favorite.empty();

    setFavorite(favorite);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCart();
    fetchFavorite();

  }, []);



  console.log(cart);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items}  favTotalItems ={favorite.total_items}/>
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} onAddToFavorite={handleAddToFavorite} categories={categories} />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/favorite">
            <Favorite
              favorite={favorite}
              handleRemoveFromFavorite={handleRemoveFromFavorite}
              handleEmptyFavorite={handleEmptyFavorite}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
