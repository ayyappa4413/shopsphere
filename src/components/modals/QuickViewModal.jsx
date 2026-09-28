import {
  X,
  ShoppingCart,
  Heart,
  Star,
  Package,
} from 'lucide-react';

import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/formatters';

export default function QuickViewModal({
  product,
  onClose,
}) {
  const {
    addToCart,
    wishlist,
    toggleWishlist,
  } = useApp();

  if (!product) {
    return null;
  }

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <div
      className="modal-overlay quick-view-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content quick-view-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header quick-view-header">
          <div>
            <span className="modal-eyebrow">
              QUICK VIEW
            </span>

            <h2>{product.name}</h2>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close quick view"
            title="Close"
          >
            <X size={21} />
          </button>
        </div>

        {/* Product */}
        <div className="quick-view-body">

          {/* Image */}
          <div className="quick-view-image-wrapper">
            {product.discount > 0 && (
              <span className="discount-badge">
                {product.discount}% OFF
              </span>
            )}

            <img
              src={product.image}
              alt={product.name}
              className="quick-view-image"
            />
          </div>

          {/* Information */}
          <div className="quick-view-details">

            {/* Category + Brand */}
            <div className="quick-view-meta">
              <span>{product.category}</span>
              <span>•</span>
              <span>{product.brand}</span>
            </div>

            {/* Product Name */}
            <h3 className="quick-view-title">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="quick-view-rating">
              <span className="quick-view-rating-star">
                <Star
                  size={16}
                  fill="currentColor"
                />
              </span>

              <strong>
                {product.rating}
              </strong>

              <span>
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="quick-view-price">
              <span className="quick-view-current-price">
                {formatINR(product.price)}
              </span>

              {product.originalPrice >
                product.price && (
                <span className="quick-view-original-price">
                  {formatINR(product.originalPrice)}
                </span>
              )}

              {product.discount > 0 && (
                <span className="quick-view-saving">
                  Save {product.discount}%
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="quick-view-description">
                {product.description}
              </p>
            )}

            {/* Stock */}
            <div className="quick-view-stock">
              <Package size={17} />

              {product.stock > 0 ? (
                <span>
                  {product.stock} items available
                </span>
              ) : (
                <span className="out-of-stock">
                  Out of stock
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="quick-view-actions">

              <button
                type="button"
                className="modal-primary-btn"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                <ShoppingCart size={18} />

                {product.stock > 0
                  ? 'Add to Cart'
                  : 'Out of Stock'}
              </button>

              <button
                type="button"
                className={`quick-view-wishlist-btn ${
                  isWishlisted
                    ? 'wishlisted'
                    : ''
                }`}
                onClick={handleWishlist}
              >
                <Heart
                  size={18}
                  fill={
                    isWishlisted
                      ? 'currentColor'
                      : 'none'
                  }
                />
                

                {isWishlisted
                  ? 'Remove Wishlist'
                  : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}