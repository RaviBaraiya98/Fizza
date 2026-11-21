import React, { useState } from 'react';
import './assets/Admin.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('pizzas');

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <nav className="admin-nav">
        <button className={activeTab === 'pizzas' ? 'active' : ''} onClick={() => setActiveTab('pizzas')}>Manage Pizzas</button>
        <button className={activeTab === 'categories' ? 'active' : ''} onClick={() => setActiveTab('categories')}>Manage Categories</button>
        <button className={activeTab === 'customers' ? 'active' : ''} onClick={() => setActiveTab('customers')}>Manage Customers</button>
      </nav>

      <section className="admin-content">
        {activeTab === 'pizzas' && <div><h2>Pizzas Management</h2>{/* Pizza management UI here */}</div>}
        {activeTab === 'categories' && <div><h2>Categories Management</h2>{/* Category management UI here */}</div>}
        {activeTab === 'customers' && <div><h2>Customers Management</h2>{/* Customer management UI here */}</div>}
      </section>
    </div>
  );
};

export default AdminDashboard;
