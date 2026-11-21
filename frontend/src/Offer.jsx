import React, { useState } from "react";
import "./assets/Offer.css";
import Footer from "./Footer";
import { Slide, toast } from "react-toastify";

function Offer() {
    const [copiedCode, setCopiedCode] = useState(null);

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            setCopiedCode(code);
            toast.success("Code copied!", {
                autoClose: 1000,
                pauseOnHover: false,
                transition: Slide,
                hideProgressBar: true,
            });
            setTimeout(() => setCopiedCode(null), 2000);
        });
    };

    return (
        <div className="offers-page">
            <div className="offers-container">
                <div className="offers-header">
                    <span className="offers-badge"><i className="fa-solid fa-fire"></i> DEALS & OFFERS</span>
                    <h1 className="offers-title">Today's Hot Deals</h1>
                    <p className="offers-subtitle">Fresh offers, every day. Save big on your next pizza order.</p>
                </div>

                <div className="deals-grid">
                    {/* Deal 1 */}
                    <div className="deal-card deal-orange">
                        <div className="deal-card-header">
                            <span className="deal-emoji">🎉</span>
                            <span className="deal-tag tag-limited">LIMITED TIME</span>
                        </div>
                        <h3 className="deal-title">10% Off on Orders ₹800+</h3>
                        <p className="deal-desc">Use code FIZZA10 at checkout to get 10% off your total bill on orders above ₹800.</p>
                        <div className="deal-code-section">
                            <div className="code-box">FIZZA10</div>
                            <button className="copy-btn" onClick={() => handleCopyCode('FIZZA10')}>
                                <i className="fa-regular fa-clipboard"></i> {copiedCode === 'FIZZA10' ? 'Copied!' : 'Copy Code'}
                            </button>
                        </div>
                    </div>

                    {/* Deal 2 */}
                    <div className="deal-card deal-green">
                        <div className="deal-card-header">
                            <span className="deal-emoji">🛵</span>
                            <span className="deal-tag tag-active">ALWAYS ACTIVE</span>
                        </div>
                        <h3 className="deal-title">Free Delivery Above ₹500</h3>
                        <p className="deal-desc">No delivery charges when your cart value crosses ₹500. Order more, save more!</p>
                    </div>

                    {/* Deal 3 */}
                    <div className="deal-card deal-purple">
                        <div className="deal-card-header">
                            <span className="deal-emoji">🍕</span>
                            <span className="deal-tag tag-weekend">WEEKEND SPECIAL</span>
                        </div>
                        <h3 className="deal-title">Buy 2 Get 1 Slice Free</h3>
                        <p className="deal-desc">Order any 2 large pizzas on weekends and get a bonus slice on the house.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Offer;
