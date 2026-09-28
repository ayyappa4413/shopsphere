import { Heart, LogIn, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/common/ProductCard';
import '../styles/wishlist.css';

export default function WishlistPage() {
  const {
    user,
    wishlist,
    setAuthModalOpen,
    removeFromWishlist,
    addToCart,
  } = useApp();

  const handleSignIn = () => {
    setAuthModalOpen(true);
  };

  const handleBrowseProducts = () => {
    window.location.href = '/shop';
  };

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // ==========================================
  // LOGGED OUT
  // ==========================================
  if (!user) {
    return (
      <main className="container wishlist-page">
        <section className="empty-state">
          <div className="empty-state-icon">
            <LogIn size={42} strokeWidth={1.8} />
          </div>

          <h2>Please Sign In to View Your Wishlist</h2>

          <p>
            Sign in to save your favorite products and access your wishlist
            anytime.
          </p>

          <div className="empty-state-actions">
            <button
              type="button"
              className="primary-btn"
              onClick={handleSignIn}
            >
              <LogIn size={18} />
              Sign In to Continue
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={handleBrowseProducts}
            >
              <ShoppingBag size={18} />
              Browse Products
            </button>
          </div>
        </section>
      </main>
    );
  }

  // ==========================================
  // LOGGED IN + EMPTY WISHLIST
  // ==========================================
  if (!wishlist || wishlist.length === 0) {
    return (
      <main className="container wishlist-page">
        <section className="empty-state">
          <div className="empty-state-icon">
            <Heart size={42} strokeWidth={1.8} />
          </div>

          <h2>Your Wishlist is Empty</h2>

          <p>
            Save products you love so you never lose track of them.
          </p>

          <button
            type="button"
            className="primary-btn"
            onClick={handleBrowseProducts}
          >
            <ShoppingBag size={18} />
            Browse Products
          </button>
        </section>
      </main>
    );
  }

  // ==========================================
  // LOGGED IN + WISHLIST PRODUCTS
  // ==========================================
  return (
    <main className="container wishlist-page">
      <div className="page-header wishlist-header">
        <div>
          <span className="page-eyebrow">YOUR SAVED ITEMS</span>

          <h1>My Wishlist</h1>

          <p>
            {wishlist.length}{' '}
            {wishlist.length === 1 ? 'product' : 'products'} saved
          </p>
        </div>
      </div>

      <div className="products-grid wishlist-grid">
        {wishlist.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onRemove={() => handleRemove(product.id)}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </main>
  );
}