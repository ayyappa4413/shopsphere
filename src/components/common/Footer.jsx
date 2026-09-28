import { useState } from 'react';
import {
  Package,
  ArrowUpRight,
  Mail,
  ShieldCheck
} from 'lucide-react';

import { useApp } from '../../context/AppContext';
import '../../styles/footer.css';

export default function Footer() {
  const { navigate, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Navigate to a product category
  const handleCategory = (e, category) => {
    e.preventDefault();
    navigate('shop', { category });
  };

  // Navigate to another page
  const handleNavigation = (e, route) => {
    e.preventDefault();
    navigate(route);
  };

  // Newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setIsSubscribed(true);

    if (showToast) {
      showToast(
        'Thank you for subscribing to ShopSphere!',
        'success'
      );
    } else {
      alert(`Thank you for subscribing with ${email}!`);
    }

    setEmail('');

    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="footer">

      {/* =========================
          Main Footer
      ========================== */}
      <div className="footer-main">

        <div className="footer-container">

          {/* =========================
              Brand
          ========================== */}
          <div className="footer-column footer-brand">

            <button
              className="footer-logo"
              onClick={() => navigate('home')}
              aria-label="Go to ShopSphere home"
            >
              <span className="footer-logo-icon">
                <Package size={22} />
              </span>

              <span>ShopSphere</span>
            </button>

            <p className="footer-description">
              Your modern destination for quality products, effortless
              shopping, and a seamless online experience.
            </p>

            <div className="footer-trust">

              <ShieldCheck size={20} />

              <div>
                <strong>Shop with confidence</strong>

                <span>
                  Secure payments & trusted checkout
                </span>
              </div>

            </div>

          </div>


          {/* =========================
              Departments
          ========================== */}
          <div className="footer-column">

            <h3>Departments</h3>

            <ul className="footer-links">

              <li>
                <a
                  href="#electronics"
                  onClick={(e) =>
                    handleCategory(e, 'Electronics')
                  }
                >
                  Electronics & Audio
                  <ArrowUpRight size={14} />
                </a>
              </li>

              <li>
                <a
                  href="#fashion"
                  onClick={(e) =>
                    handleCategory(e, 'Fashion')
                  }
                >
                  Designer Apparel
                  <ArrowUpRight size={14} />
                </a>
              </li>

              <li>
                <a
                  href="#shoes"
                  onClick={(e) =>
                    handleCategory(e, 'Shoes')
                  }
                >
                  Athletic Footwear
                  <ArrowUpRight size={14} />
                </a>
              </li>

              <li>
                <a
                  href="#watches"
                  onClick={(e) =>
                    handleCategory(e, 'Watches')
                  }
                >
                  Luxury Horology
                  <ArrowUpRight size={14} />
                </a>
              </li>

            </ul>

          </div>


          {/* =========================
              Customer Service
          ========================== */}
          <div className="footer-column">

            <h3>Customer Service</h3>

            <ul className="footer-links">

              {/* Orders */}
              <li>
                <a
                  href="#orders"
                  onClick={(e) =>
                    handleNavigation(e, 'orders')
                  }
                >
                  Live Order Tracking
                  <ArrowUpRight size={14} />
                </a>
              </li>


              {/* Doorstep Returns */}
              <li>
                <a
                  href="#returns"
                  onClick={(e) =>
                    handleNavigation(e, 'returns')
                  }
                >
                  Doorstep Returns
                  <ArrowUpRight size={14} />
                </a>
              </li>


              {/* Warranty */}
              <li>
                <a
                  href="#warranty"
                  onClick={(e) =>
                    handleNavigation(e, 'warranty')
                  }
                >
                  2-Year Warranty
                  <ArrowUpRight size={14} />
                </a>
              </li>


              {/* Terms */}
              <li>
                <a
                  href="#terms"
                  onClick={(e) =>
                    handleNavigation(e, 'terms')
                  }
                >
                  Terms & Conditions
                  <ArrowUpRight size={14} />
                </a>
              </li>

            </ul>

          </div>


          {/* =========================
              Newsletter
          ========================== */}
          <div className="footer-column footer-newsletter">

            <h3>Stay Connected</h3>

            <p>
              Get updates about new arrivals, exclusive offers,
              and upcoming product drops.
            </p>

            <form
              className="newsletter-form"
              onSubmit={handleSubscribe}
            >

              <div className="newsletter-input-wrapper">

                <Mail size={18} />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  aria-label="Email address"
                  required
                />

              </div>

              <button
                type="submit"
                disabled={isSubscribed}
              >
                {isSubscribed
                  ? 'Subscribed!'
                  : 'Subscribe'}
              </button>

            </form>

            <small>
              No spam. Unsubscribe anytime.
            </small>

          </div>

        </div>

      </div>


      {/* =========================
          Bottom Footer
      ========================== */}
      <div className="footer-bottom">

        <div className="footer-bottom-container">

          <p>
            © 2026 ShopSphere India Inc. All rights reserved.
          </p>

          <div className="footer-payment-info">

            <span>
              Secure 256-bit SSL
            </span>

            <span>
              UPI / RuPay / Visa
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}