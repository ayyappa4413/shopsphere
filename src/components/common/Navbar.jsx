import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  Package
} from 'lucide-react';

import { useApp } from '../../context/AppContext';

import '../../styles/navbar.css';

export default function Navbar({ onOpenMobile }) {
  const {
    navigate,
    currentRoute,
    cart,
    wishlist,
    user,
    setAuthModalOpen,
    globalSearchTerm,
    setGlobalSearchTerm,
  } = useApp();

  const totalCartCount = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('shop');
  };

  const handleSignIn = () => {
    console.log('SIGN IN BUTTON CLICKED');
    setAuthModalOpen(true);
  };

  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* ==================================================
            MOBILE MENU
        =================================================== */}

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onOpenMobile}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>


        {/* ==================================================
            LOGO
        =================================================== */}

        <button
          type="button"
          className="navbar-logo"
          onClick={() => navigate('home')}
          aria-label="Go to ShopSphere home"
        >
          <span className="navbar-logo-icon">
            <Package size={22} />
          </span>

          <span className="navbar-logo-text">
            ShopSphere
          </span>
        </button>


        {/* ==================================================
            DESKTOP NAVIGATION
        =================================================== */}

        <nav
          className="navbar-links"
          aria-label="Main navigation"
        >

          <button
            type="button"
            className={
              currentRoute === 'home'
                ? 'active'
                : ''
            }
            onClick={() => navigate('home')}
          >
            Home
          </button>

          <button
            type="button"
            className={
              currentRoute === 'shop'
                ? 'active'
                : ''
            }
            onClick={() => navigate('shop')}
          >
            Shop
          </button>

          <button
            type="button"
            onClick={() =>
              navigate('shop', {
                category: 'Electronics',
              })
            }
          >
            Electronics
          </button>

          <button
            type="button"
            onClick={() =>
              navigate('shop', {
                category: 'Fashion',
              })
            }
          >
            Fashion
          </button>

          <button
            type="button"
            className={
              currentRoute === 'orders'
                ? 'active'
                : ''
            }
            onClick={() => navigate('orders')}
          >
            Track Orders
          </button>

        </nav>


        {/* ==================================================
            SEARCH
        =================================================== */}

        <form
          className="navbar-search"
          onSubmit={handleSearchSubmit}
        >
          <Search
            size={18}
            className="navbar-search-icon"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={globalSearchTerm}
            onChange={(e) =>
              setGlobalSearchTerm(e.target.value)
            }
            aria-label="Search products"
          />
        </form>


        {/* ==================================================
            ACTIONS
        =================================================== */}

        <div className="navbar-actions">

          {/* Wishlist */}

          <button
            type="button"
            className="navbar-icon-btn badge-wrapper"
            onClick={() => navigate('wishlist')}
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart size={19} />

            {wishlist.length > 0 && (
              <span className="navbar-badge">
                {wishlist.length > 99
                  ? '99+'
                  : wishlist.length}
              </span>
            )}
          </button>


          {/* Cart */}

          <button
            type="button"
            className="navbar-icon-btn badge-wrapper"
            onClick={() => navigate('cart')}
            title="Shopping Cart"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={19} />

            {totalCartCount > 0 && (
              <span className="navbar-badge">
                {totalCartCount > 99
                  ? '99+'
                  : totalCartCount}
              </span>
            )}
          </button>


          {/* Authentication */}

          {user ? (

            <button
              type="button"
              className="navbar-user-btn"
              onClick={() => navigate('profile')}
              title="My Account"
              aria-label="My Account"
            >
              <span className="navbar-user-icon">
                <User size={18} />
              </span>

              <span className="user-name">
                {user.name || 'Account'}
              </span>
            </button>

          ) : (

            <button
              type="button"
              className="signin-btn"
              onClick={handleSignIn}
            >
              <User size={17} />
              <span>Sign In</span>
            </button>

          )}


          {/* Admin */}

          {user?.role === 'admin' && (
            <button
              type="button"
              className="admin-btn"
              onClick={() => navigate('admin')}
            >
              Admin
            </button>
          )}

        </div>

      </div>

    </header>
  );
}