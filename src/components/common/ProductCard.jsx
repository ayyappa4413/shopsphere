import '../../styles/productcard.css';
import {
  Heart,
  Eye,
  Star,
  ShoppingCart,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/formatters';

export default function ProductCard({ product, onQuickView }) {
  const {
    navigate,
    addToCart,
    wishlist,
    toggleWishlist,
  } = useApp();

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const handleProductClick = () => {
    navigate('product', { id: product.id });
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <article className="product-card">

      {/* Product Image */}
      <div
        className="product-card-image"
        onClick={handleProductClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleProductClick();
          }
        }}
        aria-label={`View ${product.name}`}
      >
        {/* Discount */}
        {product.discount > 0 && (
          <span className="discount-badge">
            {product.discount}% OFF
          </span>
        )}

        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

        {/* Image Overlay */}
        <div className="product-image-overlay" />

        {/* Product Actions */}
        <div className="product-card-actions">

          {/* Wishlist */}
          <button
            type="button"
            className={`product-action-btn ${
              isWishlisted ? 'wishlisted' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            title={
              isWishlisted
                ? 'Remove from Wishlist'
                : 'Save to Wishlist'
            }
            aria-label={
              isWishlisted
                ? 'Remove from Wishlist'
                : 'Save to Wishlist'
            }
          >
            <Heart
              size={18}
              strokeWidth={2}
              fill={isWishlisted ? 'currentColor' : 'none'}
            />
          </button>

          {/* Quick View */}
          <button
            type="button"
            className="product-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            title="Quick View"
            aria-label="Quick View"
          >
            <Eye size={18} strokeWidth={2} />
          </button>
        </div>

        {/* View Product */}
        <div className="view-product-label">
          View Product
          <ChevronRight size={15} />
        </div>
      </div>

      {/* Product Information */}
      <div className="product-card-content">

        {/* Category & Brand */}
        <div className="product-meta">
          <span>{product.category}</span>
          <span className="product-meta-dot">•</span>
          <span>{product.brand}</span>
        </div>

        {/* Product Name */}
        <h3
          className="product-name"
          onClick={handleProductClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleProductClick();
            }
          }}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="product-rating">
          <span className="rating-star">
            <Star
              size={15}
              fill="currentColor"
              strokeWidth={2}
            />
          </span>

          <span className="rating-value">
            {product.rating}
          </span>

          <span className="review-count">
            ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="product-price-container">
          <span className="product-price">
            {formatINR(product.price)}
          </span>

          {product.originalPrice > product.price && (
            <span className="product-original-price">
              {formatINR(product.originalPrice)}
            </span>
          )}

          {product.discount > 0 && (
            <span className="product-saving">
              Save {product.discount}%
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={18} strokeWidth={2.2} />
          <span>Add to Cart</span>
        </button>
      </div>
    </article>
  );
}