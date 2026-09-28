import React from 'react';

import {
  ShoppingCart,
  ArrowRight,
  LogIn,
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
} from 'lucide-react';

import { useApp } from '../context/AppContext';

import '../styles/cart.css';

export default function CartPage() {
  const {
    user,
    cart,
    cartSubtotal,
     cartTax,
    cartTotal,
    updateCartQty,
    removeCartItem,
    navigate,
    setAuthModalOpen,
  } = useApp();

  // ==================================================
  // NOT LOGGED IN
  // ==================================================

  if (!user) {
    return (
      <div className="cart-page">
        <div className="empty-state">

          <div className="empty-state-icon">
            <ShoppingCart size={48} />
          </div>

          <h2>
            Please Sign In to View Your Cart
          </h2>

          <p>
            Your cart is linked to your account.
            Sign in to access your saved items
            and continue shopping.
          </p>

          <button
            type="button"
            className="primary-btn"
            onClick={() =>
              setAuthModalOpen(true)
            }
          >
            <LogIn size={18} />
            Sign In to Continue
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() =>
              navigate('shop')
            }
          >
            Start Shopping
            <ArrowRight size={18} />
          </button>

        </div>
      </div>
    );
  }

  // ==================================================
  // LOGGED IN BUT CART IS EMPTY
  // ==================================================

  if (!cart || cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-state">

          <div className="empty-state-icon">
            <ShoppingCart size={48} />
          </div>

          <h2>
            Your Shopping Cart is Empty
          </h2>

          <p>
            Looks like you haven't added anything
            to your cart yet. Explore our collection
            and find something you love.
          </p>

          <button
            type="button"
            className="primary-btn"
            onClick={() =>
              navigate('shop')
            }
          >
            Start Shopping Now
            <ArrowRight size={18} />
          </button>

        </div>
      </div>
    );
  }

  // ==================================================
  // CART
  // ==================================================

  return (
    <div className="cart-page">

      {/* Header */}

      <div className="page-header">
        <div>

          <h1>
            Shopping Cart
          </h1>

          <p>
            {cart.length}{' '}
            {cart.length === 1
              ? 'item'
              : 'items'}{' '}
            in your cart
          </p>

        </div>
      </div>

      <div className="cart-layout">

        {/* ============================================
            CART ITEMS
        ============================================ */}

        <div className="cart-items">

          {cart.map((item) => {
            const product =
              item.product || item;

            const quantity =
              item.quantity || 1;

            const price = Number(
              product.salePrice ??
              product.discountPrice ??
              product.price ??
              0
            );

            const itemTotal =
              price * quantity;

            return (
              <div
                className="cart-item"
                key={`${product.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`}
              >

                {/* Product Image */}

                <div className="cart-item-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                {/* Product Information */}

                <div className="cart-item-info">

                  <h3>
                    {product.name}
                  </h3>

                  {product.category && (
                    <span className="cart-item-category">
                      {product.category}
                    </span>
                  )}

                  {item.selectedColor && (
                    <span className="cart-item-category">
                      Color: {item.selectedColor}
                    </span>
                  )}

                  {item.selectedSize && (
                    <span className="cart-item-category">
                      Size: {item.selectedSize}
                    </span>
                  )}

                  <div className="cart-item-price">
                    ₹{price.toLocaleString('en-IN')}
                  </div>

                </div>

                {/* Quantity */}

                <div className="cart-item-quantity">

                  <button
                    type="button"
                    onClick={() =>
                      updateCartQty(
                        product.id,
                        quantity - 1,
                        item.selectedColor || null,
                        item.selectedSize || null
                      )
                    }
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>

                  <span>
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      updateCartQty(
                        product.id,
                        quantity + 1,
                        item.selectedColor || null,
                        item.selectedSize || null
                      )
                    }
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>

                </div>

                {/* Item Total */}

                <div className="cart-item-total">
                  ₹{itemTotal.toLocaleString('en-IN')}
                </div>

                {/* Remove */}

                <button
                  type="button"
                  className="cart-remove-btn"
                  onClick={() =>
                    removeCartItem(
                      product.id,
                      item.selectedColor || null,
                      item.selectedSize || null
                    )
                  }
                  aria-label={`Remove ${product.name}`}
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>

              </div>
            );
          })}

        </div>

        {/* ============================================
            CART SUMMARY
        ============================================ */}

        <aside className="cart-summary">

          <div className="cart-summary-header">
            <ShoppingBag size={20} />

            <h2>
              Order Summary
            </h2>
          </div>

          <div className="summary-row">

            <span>
              Subtotal:
            </span>

            <span>
              ₹{Number(
                cartSubtotal || 0
              ).toLocaleString('en-IN')}
            </span>

          </div>

          <div className="summary-row">

            <span>
              GST (18%):
            </span>

            <span>
              ₹{Math.round(
              Number(cartTax || 0)
              ).toLocaleString('en-IN')}
            </span>

          </div>    

          <div className="summary-row">

            <span>
              Shipping:
            </span>

            <span className="free-shipping">
              Free
            </span>

          </div>

          <div className="summary-divider" />

          <div className="summary-row summary-total">

            <span>
              Total
            </span>

            <span>
              ₹{Math.round(
                Number(cartTotal || cartSubtotal || 0)
              ).toLocaleString('en-IN')}
            </span>

          </div>

          <button
            type="button"
            className="checkout-btn"
            onClick={() =>
              navigate('checkout')
            }
          >
            Proceed to Checkout
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            className="continue-shopping-btn"
            onClick={() =>
              navigate('shop')
            }
          >
            Continue Shopping
          </button>

        </aside>

      </div>
    </div>
  );
}