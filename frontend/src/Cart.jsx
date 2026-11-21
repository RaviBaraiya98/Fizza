import React, { useState } from "react";
import EmptyCart from "./EmptyCart";
import CartItems from "./CartItem";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Cart({cartItems, setCartItems, clearCartItems, isLoggedIn}) {
    return (
        <div>
            {cartItems.length === 0 ? (
                <EmptyCart />
            ) : (
                <CartItems cartItems={cartItems} setCartItems={setCartItems} clearCartItems={clearCartItems} isLoggedIn={isLoggedIn}/>
            )}
            <Footer />
        </div>
    );
}

export default Cart;
