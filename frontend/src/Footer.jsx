import React from "react";
import "./assets/Footer.css"

function Footer() {
    return(
        <footer className="footer">
            <div className="footer-divider"></div>
            <div className="footer-content">
                <div className="footer-section about">
                    <h2 className="footer-logo">F!ZZA</h2>
                    <p className="footer-tagline">Fire-baked pizza, delivered fast.<br/>Order now and taste the difference.</p>
                    <div className="social-icons">
                        <a href="#" className="social-icon"><i className="fa-brands fa-github"></i></a>
                        <a href="#" className="social-icon"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#" className="social-icon"><i className="fa-brands fa-twitter"></i></a>
                    </div>
                </div>
                <div className="footer-section links">
                    <h3 className="footer-heading">QUICK LINKS</h3>
                    <ul>
                        <li><a href="/menu">Menu</a></li>
                        <li><a href="/offers">Offers</a></li>
                        <li><a href="/orders">My Orders</a></li>
                        <li><a href="/cart">Cart</a></li>
                    </ul>
                </div>
                <div className="footer-section company">
                    <h3 className="footer-heading">COMPANY</h3>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Press</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h3 className="footer-heading">CONTACT</h3>
                    <ul>
                        <li><span className="contact-icon">✉</span> contact@fizza.in</li>
                        <li><span className="contact-icon"><i className="fa-solid fa-phone"></i></span> +91 98765 43210</li>
                        <li><span className="contact-icon"><i className="fa-solid fa-location-dot"></i></span> Ahmedabad, India</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;