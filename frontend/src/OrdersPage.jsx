import React from "react";
import { useHistory } from "react-router-dom";
import "../src/assets/OrdersPage.css";

function OrdersPage({ orders }) {
  const history = useHistory();

  const handleOrderClick = (orderId) => {
    history.push(`/orders/${orderId}`);
  };

  // Get first 3 pizza images from order items for thumbnails
  const getOrderThumbnails = (order) => {
    if (!order.Ordered_Items) return [];
    return order.Ordered_Items.slice(0, 4).map(item => item.src);
  };

  const getTotalItems = (order) => {
    if (!order.Ordered_Items) return 0;
    return order.Ordered_Items.reduce((acc, item) => acc + (item.quantity || 1), 0);
  };

  const getStatusClass = (status) => {
    if (status === 'Delivered') return 'status-delivered';
    if (status === 'Order Placed') return 'status-placed';
    if (status === 'Prepared') return 'status-prepared';
    return 'status-default';
  };

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <span className="orders-badge">MY ORDERS</span>
          <h1 className="orders-title">Order History</h1>
          <p className="orders-count">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
        </div>

        <div className="orders-list">
          {orders.map(order => (
            <div className="order-card" key={order._id} onClick={() => handleOrderClick(order._id)}>
              <div className="order-card-left">
                <div className="order-thumbnails">
                  {getOrderThumbnails(order).map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt="pizza"
                      className="order-thumb"
                      style={{ zIndex: 10 - idx, marginLeft: idx > 0 ? '-12px' : '0' }}
                    />
                  ))}
                  {order.Ordered_Items && order.Ordered_Items.length > 4 && (
                    <span className="thumb-more">+{order.Ordered_Items.length - 4}</span>
                  )}
                </div>
                <div className="order-info">
                  <span className="order-id-text">#{order._id.slice(-8).toUpperCase()}</span>
                  <span className="order-meta">{getTotalItems(order)} items</span>
                  <span className="order-meta">{order.Ordered_Time}</span>
                </div>
              </div>
              <div className="order-card-right">
                <span className={`order-status-badge ${getStatusClass(order.Status)}`}>
                  <i className="fa-solid fa-circle" style={{fontSize: '0.5em'}}></i> {order.Status ? order.Status.toUpperCase() : 'ORDER PLACED'}
                </span>
                <span className="order-total">₹{order.Total_Amount}</span>
                <i className="fa-solid fa-chevron-right order-arrow"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
