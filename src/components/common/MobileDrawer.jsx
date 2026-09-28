import {
  Package,
  X,
  Home,
  ShoppingBag,
  Smartphone,
  Shirt,
  Heart,
  User,
  ChevronRight,
} from 'lucide-react';

import { useApp } from '../../context/AppContext';
import '../../styles/mobile-drawer.css';

export default function MobileDrawer({ onClose }) {
  const {
    navigate,
    user,
    setAuthModalOpen,
  } = useApp();

  const handleNavigation = (route, options = {}) => {
    navigate(route, options);
    onClose();
  };

  const handleSignIn = () => {
    setAuthModalOpen(true);
    onClose();
  };

  return (
    <>
      {/* =====================================================
          OVERLAY
      ====================================================== */}

      <div
        className="mobile-drawer-overlay"
        onClick={onClose}
        aria-hidden="true"
      />


      {/* =====================================================
          MOBILE DRAWER
      ====================================================== */}

      <aside
        className="mobile-drawer"
        onClick={(e) => e.stopPropagation()}
        aria-label="Mobile navigation menu"
      >

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="mobile-drawer-header">

          <button
            className="mobile-drawer-logo"
            onClick={() => handleNavigation('home')}
            aria-label="Go to ShopSphere home"
          >
            <span className="mobile-logo-mark">
              S
            </span>

            <span className="mobile-logo-text">
              ShopSphere
            </span>
          </button>


          <button
            className="mobile-drawer-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>

        </div>


        {/* ===================================================
            NAVIGATION
        ==================================================== */}

        <nav
          className="mobile-drawer-nav"
          aria-label="Mobile navigation"
        >

          {/* Home */}
          <button
            onClick={() => handleNavigation('home')}
          >
            <span className="drawer-nav-icon">
              <Home size={18} />
            </span>

            <span className="drawer-nav-label">
              Home
            </span>

            <ChevronRight
              className="drawer-nav-arrow"
              size={16}
            />
          </button>


          {/* All Products */}
          <button
            onClick={() => handleNavigation('shop')}
          >
            <span className="drawer-nav-icon">
              <ShoppingBag size={18} />
            </span>

            <span className="drawer-nav-label">
              All Products
            </span>

            <ChevronRight
              className="drawer-nav-arrow"
              size={16}
            />
          </button>


          {/* Electronics */}
          <button
            onClick={() =>
              handleNavigation('shop', {
                category: 'Electronics',
              })
            }
          >
            <span className="drawer-nav-icon">
              <Smartphone size={18} />
            </span>

            <span className="drawer-nav-label">
              Electronics
            </span>

            <ChevronRight
              className="drawer-nav-arrow"
              size={16}
            />
          </button>


          {/* Fashion */}
          <button
            onClick={() =>
              handleNavigation('shop', {
                category: 'Fashion',
              })
            }
          >
            <span className="drawer-nav-icon">
              <Shirt size={18} />
            </span>

            <span className="drawer-nav-label">
              Fashion
            </span>

            <ChevronRight
              className="drawer-nav-arrow"
              size={16}
            />
          </button>


          {/* My Orders */}
          <button
            onClick={() => handleNavigation('orders')}
          >
            <span className="drawer-nav-icon">
              <Package size={18} />
            </span>

            <span className="drawer-nav-label">
              My Orders
            </span>

            <ChevronRight
              className="drawer-nav-arrow"
              size={16}
            />
          </button>


          {/* Wishlist */}
          <button
            onClick={() => handleNavigation('wishlist')}
          >
            <span className="drawer-nav-icon">
              <Heart size={18} />
            </span>

            <span className="drawer-nav-label">
              Wishlist
            </span>

            <ChevronRight
              className="drawer-nav-arrow"
              size={16}
            />
          </button>

        </nav>


        {/* ===================================================
            ACCOUNT SECTION
        ==================================================== */}

        <div className="mobile-drawer-account">

          <div className="drawer-account-heading">
            <User size={16} />
            <span>Account</span>
          </div>


          {user ? (

            <button
              className="mobile-profile-btn"
              onClick={() => handleNavigation('profile')}
            >
              <span>
                View Profile
              </span>

              <ChevronRight size={17} />
            </button>

          ) : (

            <button
              className="mobile-signin-btn"
              onClick={handleSignIn}
            >
              Sign In
            </button>

          )}

        </div>


        {/* ===================================================
            FOOTER NOTE
        ==================================================== */}

        <div className="mobile-drawer-footer">
          <span className="drawer-footer-dot" />

          <span>
            Secure &amp; seamless shopping
          </span>
        </div>

      </aside>
    </>
  );
}
