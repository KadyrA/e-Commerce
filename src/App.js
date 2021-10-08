import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const initialState = { likedProducts: JSON.parse(localStorage.getItem('likedProducts')) || null };

function reducer(state, action) {
  switch (action.type) {
    case 'like_action':
      const newState = {
        ...state,
        likedProducts: {
          ...state.likedProducts,
          [action.payload]: true
        }
      }
      localStorage.setItem('likedProducts', JSON.stringify(newState.likedProducts))
      return newState;
    case 'dislike_action':
      const currentState = { ...state };
      delete currentState.likedProducts[action.payload];
      localStorage.setItem('likedProducts', JSON.stringify(currentState.likedProducts))
      return currentState;
    default:
      throw new Error();
  }
}


const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');


  // Reducer for like actions
  const [likeActionState, dispatch] = React.useReducer(reducer, initialState);

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

  const handleAddToFavorite = (productId) => {
    dispatch({
      type: 'like_action',
      payload: productId
    })
  };
  const handleRemoveFromFavorite = (productId) => {
    dispatch({
      type: 'dislike_action',
      payload: productId
    })
  };

  const refreshCart = async ()=>{
    const newCart =await commerce.cart.refresh();
    setCart(newCart);
  }


  const handleCaptureCheckout = async (checkoutTokenId, newOrder)=>{
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
      
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCart();
  }, []);

  //console.log(cart);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} favTotalItems={likeActionState && likeActionState.likedProducts ? Object.keys(likeActionState.likedProducts).length : 0} />
        <Switch>
          <Route exact path="/">
            <Products
              products={products}
              onAddToCart={handleAddToCart}
              onAddToFavorite={handleAddToFavorite}
              onRemoveFromFavorite={handleRemoveFromFavorite}
              categories={categories}
              showLikedProducts={false}
              likeActionState={likeActionState}
            />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout 
            cart={cart}
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage}
            />
          </Route>
          <Route exact path="/favorite">
            <Products
              products={products}
              onAddToCart={handleAddToCart}
              onAddToFavorite={handleAddToFavorite}
              onRemoveFromFavorite={handleRemoveFromFavorite}
              categories={categories}
              showLikedProducts
              likeActionState={likeActionState}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
