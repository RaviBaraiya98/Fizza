import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./assets/OrderDetails.css";
import { link } from "../public/address";

function OrderDetail() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`${link}/orders/${userId}`);
                if (response.status === 200) {
                    const foundOrder = response.data.find(order => order._id === orderId);
                    if (foundOrder) {
                        setOrder(foundOrder);
                    }
                }
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        };

        if (userId) {
            fetchOrder();
        }
    }, [userId, orderId]);

    const steps = [
        { key: 'Order Placed', label: 'ORDER PLACED', icon: 'fa-solid fa-clipboard-check' },
        { key: 'Prepared', label: 'PREPARING', icon: 'fa-solid fa-utensils' },
        { key: 'Shipped', label: 'READY FOR PICKUP', icon: 'fa-solid fa-box' },
        { key: 'Delivered', label: 'COMPLETED', icon: 'fa-solid fa-circle-check' },
    ];

    const getStepIndex = () => {
        if (!order) return -1;
        const statusMap = {
            'Order Placed': 0,
            'Prepared': 1,
            'Shipped': 2,
            'Out of Delivery': 2,
            'Delivered': 3
        };
        return statusMap[order.Status] ?? -1;
    };

    const currentStepIndex = getStepIndex();

    return (
        <div className="order-detail-page">
            <div className="order-detail-container">
                <div className="od-header">
                    <span className="od-badge">TRACK ORDER</span>
                    <div className="od-progress-line"></div>
                </div>
                <h1 className="od-title">Delivery Status</h1>
                <p className="od-order-id">Order #{orderId.slice(-8).toUpperCase()}</p>

                {/* Progress Stepper */}
                <div className="od-stepper">
                    {steps.map((step, idx) => (
                        <div className={`od-step ${idx <= currentStepIndex ? 'active' : ''}`} key={step.key}>
                            <div className="od-step-icon">
                                <i className={step.icon}></i>
                            </div>
                            {idx < steps.length - 1 && (
                                <div className={`od-step-line ${idx < currentStepIndex ? 'active' : ''}`}></div>
                            )}
                            <span className="od-step-label">{step.label}</span>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <h2 className="od-section-title">Order Summary</h2>
                {order && (
                    <div className="od-summary-card">
                        <div className="od-summary-row">
                            <span className="od-summary-label">ADDRESS</span>
                            <span className="od-summary-value">{order.Address}</span>
                        </div>
                        <div className="od-summary-row">
                            <span className="od-summary-label">PHONE</span>
                            <span className="od-summary-value">{order.Phone}</span>
                        </div>
                        <div className="od-summary-row">
                            <span className="od-summary-label">PLACED AT</span>
                            <span className="od-summary-value">{order.Ordered_Time}</span>
                        </div>
                    </div>
                )}

                {/* Order Items */}
                {order && order.Ordered_Items && (
                    <div className="od-items-list">
                        {order.Ordered_Items.map((item, index) => (
                            <div key={index} className="od-item-card">
                                <img src={item.src} alt={item.pizzaName} className="od-item-img" />
                                <div className="od-item-info">
                                    <h3 className="od-item-name">{item.pizzaName}</h3>
                                    <span className="od-item-size">{item.size}</span>
                                    <span className="od-item-qty">Qty: {item.quantity}</span>
                                </div>
                                <span className="od-item-price">₹{item.price.toString().replace('₹', '')}</span>
                            </div>
                        ))}
                    </div>
                )}

                {order && (
                    <div className="od-total-bar">
                        <span>Total Amount</span>
                        <span className="od-total-amount">₹{order.Total_Amount}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderDetail;
