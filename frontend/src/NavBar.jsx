import React from 'react';
import "./assets/NavBar.css";
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Flip, toast } from 'react-toastify';

const NavBar = ({ Nos, isLoggedIn, setIsLoggedIn, clearCartItems }) => {
  const history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 1500));
        toast.promise(
            resolveAfter3Sec,
            {
              pending: 'Logging Out...',
              success: 'Log Out successfully!',
            },
            {
              position: "top-center",
              autoClose: 1000,
              pauseOnHover: false,
              transition: Flip,
              hideProgressBar: true,
            }
          ).then(() => {
            setIsLoggedIn(false);
            clearCartItems();
            history.push('/');
          })
  };

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  return (
    <header>
      <nav>
        <div className="nav-left" onClick={() => history.push("/")}>
          <img src="/Fizza_logo.png" className="pizza-img" alt="Fizza" />
          <div className="title-group">
            <h3 className="title">F!ZZA</h3>
            <span className="title-sub">FIRE BAKED FAST</span>
          </div>
        </div>
        <div className="nav-right">
          <ul>
            <li><a className={isActive('/menu')} onClick={() => history.push("/menu")}>Menu</a></li>
            <li><a className={isActive('/offers')} onClick={() => history.push("/offers")}>Offers</a></li>
            {isLoggedIn ? (
              <>
                <li><a className={isActive('/admin')} onClick={() => history.push("/admin")}>Admin Dashboard</a></li>
                <li><a className={isActive('/orders')} onClick={() => history.push("/orders")}>Orders</a></li>
                <li><a className="logout-link" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Logout</a></li>
              </>
            ) : (
              <>
                <li><a className={isActive('/register')} onClick={() => history.push("/register")}>Register</a></li>
                <li><a className={isActive('/login')} onClick={() => history.push("/login")}>Login</a></li>
              </>
            )}
            <li>
              <div className="cart-wrapper">
                <a className="cart-icon-link" onClick={() => history.push("/cart")}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </a>
                {Nos > 0 && <span className='num-of-items'>{Nos}</span>}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
