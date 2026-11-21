import React from 'react';
import "./assets/HomeContent.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const HomeContent = () => {
    const history = useHistory();
    return (
        <div className="hero-section">
            <div className="hero-left">
                <div className="delivery-badge">
                    <i className="fa-solid fa-truck-fast"></i>
                    DELIVERY IN 20–30 MIN
                </div>
                <h1 className="hero-heading">
                    Fire-baked pizza<br />that hits different.
                </h1>
                <p className="hero-subtitle">
                    Order from a chef-curated menu, track your delivery in real time, and enjoy premium flavours built for every craving.
                </p>
                <div className="hero-buttons">
                    <button className="btn-order" onClick={() => history.push("/menu")}>
                        <i className="fa-solid fa-pizza-slice"></i> Order Now
                    </button>
                    <button className="btn-offers" onClick={() => history.push("/offers")}>
                        See Offers
                    </button>
                </div>
                <div className="stats-bar">
                    <div className="stat-item">
                        <span className="stat-number">4.8<sub>/5</sub></span>
                        <span className="stat-label">Avg Rating</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">60k<sub>+</sub></span>
                        <span className="stat-label">Pizzas Served</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">24<sub>/7</sub></span>
                        <span className="stat-label">Ordering Open</span>
                    </div>
                </div>
            </div>
            <div className="hero-right">
                <div className="pizza-hero-wrapper">
                    <div className="pizza-glow"></div>
                    <img src="/Pizza_img.png" alt="Delicious Pizza" className="pizza-hero-img" />
                    <div className="floating-badge hot-deal">
                        <span className="badge-icon">🔥</span>
                        <div className="badge-text">
                            <span className="badge-title">Hot deal</span>
                            <span className="badge-desc">Buy 2 get 1 slice free</span>
                        </div>
                    </div>
                    <div className="floating-badge tonight-pick">
                        <span className="badge-icon star-icon">⭐</span>
                        <div className="badge-text">
                            <span className="badge-title">Tonight's pick</span>
                            <span className="badge-desc">Cheese Overload</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeContent;
