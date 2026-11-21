import React, { useState } from "react";
import "./assets/CartItem.css";
import { Flip, toast } from 'react-toastify';
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { link } from "../public/address";

function CartItems({cartItems, setCartItems, clearCartItems, isLoggedIn }) {
    const [address, setAddress] = useState("");
    const [phn, setPhone] = useState("");
    const [coupon, setCoupon] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const history = useHistory();

    const parsePrice = (price) => parseInt(price.toString().replace('₹', ''));

    const getUnitPrice = (item) => {
        return Math.round(parsePrice(item.price) / item.quantity);
    };

    const handleApplyCoupon = () => {
        if (coupon.toUpperCase() === 'FIZZA10' && totalAmount >= 800) {
            setCouponApplied(true);
            toast.success("Coupon applied! 10% off", {
                autoClose: 1500,
                hideProgressBar: true,
            });
        } else {
            toast.error(totalAmount < 800 ? "Minimum order ₹800 for this coupon" : "Invalid coupon code", {
                autoClose: 1500,
                hideProgressBar: true,
            });
        }
    };

    const handleQuantityChange = (index, delta) => {
        const updatedCartItems = [...cartItems];
        const item = updatedCartItems[index];
        const unitPrice = getUnitPrice(item);
        
        const newQty = item.quantity + delta;
        if (newQty <= 0) {
            handleDeleteItem(index);
        } else {
            item.quantity = newQty;
            item.price = `₹${unitPrice * newQty}`;
            setCartItems(updatedCartItems);
        }
    };

    const handleDeleteItem = (index) => {
        const updatedCartItems = cartItems.filter((_, idx) => idx !== index);
        setCartItems(updatedCartItems);
    };

    function handleClick(event) {
        event.preventDefault();
        const resolveAfter1_5Sec = new Promise(async (resolve, reject) => {
            try {
              const userId = localStorage.getItem('userId');
                if (!isLoggedIn) {
                  reject(new Error("Please Login to Order"));
                  return;
                }

                const response = await axios.post(`${link}/cart/checkout`, {
                  Address: address,
                  Phone: phn,
                  items: cartItems,
                  userId: userId
                });

                if (response.status >= 200 && response.status < 300) {
                  resolve();
                } else {
                  reject(new Error(response.data?.error || "Order failed"));
                }
              } catch (error) {
                reject(new Error(error?.response?.data?.error || "An error occurred while placing order"));
              }
            });
      
          toast.promise(
            resolveAfter1_5Sec,
            {
              pending: 'Ordering...',
              success: 'Order placed successfully!',
              error: {
                render({ data }) {
                  return data.message;
                },
              },
            },
            {
              position: "top-center",
              autoClose: 1000,
              pauseOnHover: false,
              transition: Flip,
              hideProgressBar: true,
            }
          ).then(() => {
            clearCartItems();
            history.push('/orders');
          })
    }

    const totalAmount = cartItems.reduce((total, item) => total + parsePrice(item.price), 0);
    const deliveryFee = totalAmount >= 500 ? 0 : 40;
    const discount = couponApplied ? Math.round(totalAmount * 0.1) : 0;
    const finalTotal = totalAmount - discount + deliveryFee;

    return (
        <div className="cart-page">
            <div className="cart-layout">
                {/* Left Column - Items */}
                <div className="cart-left">
                    <div className="cart-header">
                        <span className="cart-badge">READY TO CHECKOUT</span>
                        <h1 className="cart-title"><i className="fa-solid fa-cart-shopping"></i> Order Summary</h1>
                        <p className="cart-subtitle">Review your items, then add a delivery address below.</p>
                    </div>

                    <div className="cart-items-list">
                        {cartItems.map((item, index) => (
                            <div className="cart-item-card" key={index}>
                                <img src={item.src} alt={item.pizzaName} className="cart-item-img" />
                                <div className="cart-item-info">
                                    <h3 className="cart-item-name">{item.pizzaName}</h3>
                                    <div className="cart-item-meta">
                                        <span className="cart-item-size">{item.size}</span>
                                        <span className="cart-item-unit-price">₹{getUnitPrice(item)} each</span>
                                    </div>
                                    <div className="cart-item-qty-controls">
                                        <button className="qty-btn" onClick={() => handleQuantityChange(index, -1)}>−</button>
                                        <span className="qty-value">{item.quantity}</span>
                                        <button className="qty-btn" onClick={() => handleQuantityChange(index, 1)}>+</button>
                                        <button className="delete-btn" onClick={() => handleDeleteItem(index)}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                </div>
                                <span className="cart-item-price">₹{parsePrice(item.price)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="cart-right">
                    {/* Coupon Section */}
                    <div className="cart-sidebar-card">
                        <h3 className="sidebar-title">Coupon Code</h3>
                        <div className="coupon-input-group">
                            <input
                                type="text"
                                placeholder="e.g. FIZZA10"
                                className="coupon-input"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                            />
                            <button className="coupon-apply-btn" onClick={handleApplyCoupon}>Apply</button>
                        </div>
                    </div>

                    {/* Bill Summary */}
                    <div className="cart-sidebar-card">
                        <h3 className="sidebar-title">Bill Summary</h3>
                        <div className="bill-row">
                            <span>Subtotal</span>
                            <span className="bill-value">₹{totalAmount}</span>
                        </div>
                        {discount > 0 && (
                            <div className="bill-row discount-row">
                                <span>Discount (10%)</span>
                                <span className="bill-value discount-value">-₹{discount}</span>
                            </div>
                        )}
                        <div className="bill-row">
                            <span>Delivery</span>
                            <span className="bill-value free-delivery">{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
                        </div>
                        <div className="bill-divider"></div>
                        <div className="bill-row bill-total">
                            <span>Total</span>
                            <span className="bill-total-value">₹{finalTotal}</span>
                        </div>
                    </div>

                    {/* Delivery Details */}
                    <div className="cart-sidebar-card">
                        <h3 className="sidebar-title">Delivery Details</h3>
                        <form onSubmit={handleClick}>
                            <div className="delivery-field">
                                <label><i className="fa-solid fa-phone"></i> Phone</label>
                                <input
                                    type="text"
                                    placeholder="10-digit mobile number"
                                    className="delivery-input"
                                    value={phn}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="delivery-field">
                                <label><i className="fa-solid fa-location-dot"></i> Address</label>
                                <input
                                    type="text"
                                    placeholder="Full delivery address"
                                    className="delivery-input"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="place-order-btn">
                                <i className="fa-solid fa-bag-shopping"></i> Place Order — ₹{finalTotal}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
