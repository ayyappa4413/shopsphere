import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/formatters';
import '../styles/checkout.css';

const getInitialFormData = (currentUser) => {
  const address =
    Array.isArray(currentUser?.addresses) && currentUser.addresses.length > 0
      ? currentUser.addresses[0]
      : {};

  return {
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || address?.phone || '',
    address:
      address?.address ||
      address?.street ||
      address?.line1 ||
      '',
    city: address?.city || '',
    state: address?.state || '',
    pincode:
      address?.pincode ||
      address?.zip ||
      address?.postalCode ||
      '',
  };
};

export default function CheckoutPage() {
  const {
    user,
    cart,
    cartTotal,
    cartSubtotal,
    cartTax,
    cartShipping,
    cartDiscount,
    clearCart,
    createOrder,
    navigate,
    addToast,
  } = useApp();

  const [formData, setFormData] = useState(() =>
    getInitialFormData(user)
  );

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('');

  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(getInitialFormData(user));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(.{4})/g, '$1 ')
        .trim();
    }

    if (name === 'expiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .slice(0, 4);

      if (formattedValue.length > 2) {
        formattedValue =
          formattedValue.slice(0, 2) +
          '/' +
          formattedValue.slice(2);
      }
    }

    if (name === 'cvv') {
      formattedValue = value
        .replace(/\D/g, '')
        .slice(0, 3);
    }

    setCardData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const validateCardDetails = () => {
    const cardNumber = cardData.cardNumber.replace(/\s/g, '');

    if (!cardNumber) {
      addToast('Please enter your card number.', 'error');
      return false;
    }

    if (cardNumber.length !== 16) {
      addToast('Card number must contain 16 digits.', 'error');
      return false;
    }

    if (!cardData.cardName.trim()) {
      addToast('Please enter the cardholder name.', 'error');
      return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      addToast('Please enter a valid expiry date.', 'error');
      return false;
    }

    if (!/^\d{3}$/.test(cardData.cvv)) {
      addToast('Please enter a valid 3-digit CVV.', 'error');
      return false;
    }

    return true;
  };

  const validateForm = () => {
    if (!user) {
      addToast('Please sign in before placing an order.', 'error');
      return false;
    }

    if (!formData.name.trim()) {
      addToast('Please enter your name.', 'error');
      return false;
    }

    if (!formData.email.trim()) {
      addToast('Your account email is missing.', 'error');
      return false;
    }

    if (!formData.phone.trim()) {
      addToast('Please enter your phone number.', 'error');
      return false;
    }

    if (!formData.address.trim()) {
      addToast('Please enter your delivery address.', 'error');
      return false;
    }

    if (!formData.city.trim()) {
      addToast('Please enter your city.', 'error');
      return false;
    }

    if (!formData.state.trim()) {
      addToast('Please enter your state.', 'error');
      return false;
    }

    if (!formData.pincode.trim()) {
      addToast('Please enter your pincode.', 'error');
      return false;
    }

    if (paymentMethod === 'UPI') {
      const trimmedUpiId = upiId.trim();

      if (!trimmedUpiId) {
        addToast('Please enter your UPI Virtual ID.', 'error');
        return false;
      }

      const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+$/;

      if (!upiRegex.test(trimmedUpiId)) {
        addToast('Please enter a valid UPI Virtual ID.', 'error');
        return false;
      }
    }

    if (paymentMethod === 'Card') {
      if (!validateCardDetails()) {
        return false;
      }
    }

    return true;
  };

  const handlePlaceOrder = () => {
    if (isSubmitting) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',

      customerId: user.email,

      customer: {
        ...formData,
        email: user.email,
        name: formData.name.trim() || user.name,
      },

      items: cart.map((item) => ({
        ...item,
      })),

      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      tax: cartTax,
      total: cartTotal,

      paymentMethod,

      paymentDetails:
        paymentMethod === 'UPI'
          ? {
              upiId: upiId.trim(),
            }
          : paymentMethod === 'Card'
            ? {
                cardNumber: `**** **** **** ${cardData.cardNumber
                  .replace(/\s/g, '')
                  .slice(-4)}`,
                cardName: cardData.cardName.trim(),
                expiry: cardData.expiry,
              }
            : {
                method: 'Cash on Delivery',
              },
    };

    createOrder(newOrder);

    clearCart();

    addToast('Order placed successfully!', 'success');

    setTimeout(() => {
      navigate('orders');
      setIsSubmitting(false);
    }, 500);
  };

  if (!user) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <div className="checkout-empty-icon">🔐</div>

          <h2>Sign in required</h2>

          <p>
            Please sign in to continue with your checkout.
          </p>

          <button
            className="checkout-primary-btn"
            onClick={() => navigate('home')}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <div className="checkout-empty-icon">🛒</div>

          <h2>Your cart is empty</h2>

          <p>
            Add some products to your cart before proceeding to checkout.
          </p>

          <button
            className="checkout-primary-btn"
            onClick={() => navigate('shop')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        {/* HEADER */}
        <div className="checkout-header">
          <button
            className="checkout-back-btn"
            onClick={() => navigate('cart')}
          >
            ← Back to Cart
          </button>

          <div>
            <h1>Checkout</h1>
            <p>Complete your order securely.</p>
          </div>
        </div>

        <div className="checkout-layout">

          {/* LEFT */}
          <div className="checkout-main">

            {/* DELIVERY */}
            <section className="checkout-card">
              <div className="checkout-card-header">
                <div className="checkout-step-number">1</div>

                <div>
                  <h2>Delivery Information</h2>
                  <p>Where should we deliver your order?</p>
                </div>
              </div>

              <div className="checkout-form-grid">

                <div className="form-group">
                  <label htmlFor="name">
                    Full Name <span className="required">*</span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email Address <span className="required">*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    readOnly
                    className="readonly-input"
                    autoComplete="email"
                  />

                  <small className="field-help">
                    Email is taken from your ShopSphere account.
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Phone Number <span className="required">*</span>
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">
                    Pincode <span className="required">*</span>
                  </label>

                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    maxLength="6"
                    inputMode="numeric"
                    autoComplete="postal-code"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="address">
                    Address <span className="required">*</span>
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Flat / House No., Street, Area"
                    rows="3"
                    autoComplete="street-address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">
                    City <span className="required">*</span>
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    autoComplete="address-level2"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">
                    State <span className="required">*</span>
                  </label>

                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    autoComplete="address-level1"
                  />
                </div>

              </div>
            </section>

            {/* PAYMENT */}
            <section className="checkout-card">
              <div className="checkout-card-header">
                <div className="checkout-step-number">2</div>

                <div>
                  <h2>Payment Method</h2>
                  <p>Select how you'd like to pay.</p>
                </div>
              </div>

              <div className="payment-methods">

                {/* UPI */}
                <label
                  className={`payment-option ${
                    paymentMethod === 'UPI' ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={paymentMethod === 'UPI'}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <div className="payment-option-content">
                    <div className="payment-option-title">
                      <span className="payment-icon">⚡</span>

                      <div>
                        <strong>Instant UPI</strong>

                        <span className="payment-description">
                          Google Pay / PhonePe / Paytm
                        </span>
                      </div>
                    </div>

                    <span className="payment-badge">
                      Zero transaction fees
                    </span>
                  </div>
                </label>

                {paymentMethod === 'UPI' && (
                  <div className="upi-input-container">
                    <div className="form-group">
                      <label htmlFor="upiId">
                        UPI Virtual ID{' '}
                        <span className="required">*</span>
                      </label>

                      <input
                        id="upiId"
                        type="text"
                        value={upiId}
                        onChange={(e) =>
                          setUpiId(e.target.value)
                        }
                        placeholder="example@upi"
                        autoComplete="off"
                        required
                      />

                      <small className="field-help">
                        Example: yourname@upi or 9876543210@ybl
                      </small>

                      {!upiId.trim() && (
                        <small className="field-error">
                          UPI Virtual ID is required.
                        </small>
                      )}
                    </div>
                  </div>
                )}

                {/* CARD */}
                <label
                  className={`payment-option ${
                    paymentMethod === 'Card' ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Card"
                    checked={paymentMethod === 'Card'}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <div className="payment-option-content">
                    <div className="payment-option-title">
                      <span className="payment-icon">💳</span>

                      <div>
                        <strong>Credit / Debit Card</strong>

                        <span className="payment-description">
                          Visa, Mastercard, RuPay
                        </span>
                      </div>
                    </div>
                  </div>
                </label>

                {/* CARD DETAILS */}
                {paymentMethod === 'Card' && (
                  <div className="card-details-container">

                    <div className="card-details-header">
                      <div>
                        <h3>Card Details</h3>
                        <p>Enter your card information securely.</p>
                      </div>

                      <span className="card-secure-badge">
                        🔒 Secure
                      </span>
                    </div>

                    <div className="card-form-grid">

                      <div className="form-group card-full-width">
                        <label htmlFor="cardNumber">
                          Card Number <span className="required">*</span>
                        </label>

                        <input
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          value={cardData.cardNumber}
                          onChange={handleCardChange}
                          placeholder="1234 5678 9012 3456"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          maxLength="19"
                        />
                      </div>

                      <div className="form-group card-full-width">
                        <label htmlFor="cardName">
                          Cardholder Name <span className="required">*</span>
                        </label>

                        <input
                          id="cardName"
                          name="cardName"
                          type="text"
                          value={cardData.cardName}
                          onChange={handleCardChange}
                          placeholder="Name as shown on card"
                          autoComplete="cc-name"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="expiry">
                          Expiry Date <span className="required">*</span>
                        </label>

                        <input
                          id="expiry"
                          name="expiry"
                          type="text"
                          value={cardData.expiry}
                          onChange={handleCardChange}
                          placeholder="MM/YY"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          maxLength="5"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="cvv">
                          CVV <span className="required">*</span>
                        </label>

                        <input
                          id="cvv"
                          name="cvv"
                          type="password"
                          value={cardData.cvv}
                          onChange={handleCardChange}
                          placeholder="•••"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          maxLength="3"
                        />
                      </div>

                    </div>

                    <div className="card-security-note">
                      <span>🔐</span>
                      <span>
                        Your full card number and CVV are never stored
                        with the order.
                      </span>
                    </div>
                  </div>
                )}

                {/* COD */}
                <label
                  className={`payment-option ${
                    paymentMethod === 'COD' ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <div className="payment-option-content">
                    <div className="payment-option-title">
                      <span className="payment-icon">💵</span>

                      <div>
                        <strong>Cash on Delivery</strong>

                        <span className="payment-description">
                          Pay when your order arrives
                        </span>
                      </div>
                    </div>
                  </div>
                </label>

              </div>
            </section>

            {/* SECURITY */}
            <div className="checkout-security">
              <span className="security-icon">🔒</span>

              <div>
                <strong>Secure Checkout</strong>

                <p>
                  Your personal information and payment details are
                  handled securely.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="checkout-sidebar">

            <div className="checkout-summary-card">

              <div className="summary-header">
                <h2>Order Summary</h2>

                <span>
                  {cart.length}{' '}
                  {cart.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="summary-items">
                {cart.map((item) => (
                  <div
                    className="summary-item"
                    key={item.id}
                  >
                    <div className="summary-item-image">
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    </div>

                    <div className="summary-item-details">
                      <h4>{item.name}</h4>

                      <p>Qty: {item.quantity}</p>

                      <strong>
                        {formatINR(
                          item.price * item.quantity
                        )}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-price-breakdown">

                <div className="summary-row">
                  <span>Subtotal</span>
                  <strong>
                    {formatINR(cartSubtotal)}
                  </strong>
                </div>

                {cartDiscount > 0 && (
                  <div className="summary-row discount-row">
                    <span>Discount</span>

                    <strong>
                      -{formatINR(cartDiscount)}
                    </strong>
                  </div>
                )}

                <div className="summary-row">
                  <span>Shipping</span>

                  <strong className={cartShipping === 0 ? 'free-shipping' : ''}>
                    {cartShipping === 0
                      ? 'FREE'
                      : formatINR(cartShipping)}
                  </strong>
                </div>

                <div className="summary-row">
                  <span>Tax</span>

                  <strong>
                    {formatINR(cartTax)}
                  </strong>
                </div>

              </div>

              <div className="summary-total">
                <span>Total</span>

                <strong>
                  {formatINR(cartTotal)}
                </strong>
              </div>

              <button
                className="place-order-btn"
                onClick={handlePlaceOrder}
                disabled={
                  isSubmitting ||
                  (
                    paymentMethod === 'UPI' &&
                    !upiId.trim()
                  )
                }
              >
                {isSubmitting
                  ? 'Placing Order...'
                  : `Place Order • ${formatINR(cartTotal)}`}
              </button>

              {paymentMethod === 'UPI' && !upiId.trim() && (
                <p className="place-order-hint">
                  Enter your UPI Virtual ID to continue.
                </p>
              )}

              <button
                className="continue-shopping-btn"
                onClick={() => navigate('shop')}
                disabled={isSubmitting}
              >
                Continue Shopping
              </button>

            </div>

            <div className="checkout-benefits">

              <div className="checkout-benefit">
                <span>🚚</span>

                <div>
                  <strong>Fast Delivery</strong>
                  <p>Reliable doorstep delivery</p>
                </div>
              </div>

              <div className="checkout-benefit">
                <span>↩️</span>

                <div>
                  <strong>Easy Returns</strong>
                  <p>Hassle-free return process</p>
                </div>
              </div>

              <div className="checkout-benefit">
                <span>🛡️</span>

                <div>
                  <strong>Secure Payment</strong>
                  <p>Your payment details are protected</p>
                </div>
              </div>

            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}