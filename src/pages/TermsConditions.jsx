
import {
  ArrowLeft,
  FileText,
  UserCheck,
  ShoppingCart,
  CreditCard,
  ShieldCheck,
  Package,
  RefreshCcw,
  Settings,
  Mail,
  Info
} from 'lucide-react';

import { useApp } from '../context/AppContext';
import '../styles/policy-page.css';

export default function TermsConditions() {
  const { navigate } = useApp();

  return (
    <main className="policy-page">
      <div className="policy-container">

        {/* Back Button */}
        <button
          className="policy-back-button"
          onClick={() => navigate('home')}
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        {/* Header */}
        <div className="policy-header">
          <div className="policy-icon">
            <FileText size={32} />
          </div>

          <span className="policy-label">
            SHOPSPHERE POLICY
          </span>

          <h1>Terms & Conditions</h1>

          <p>
            These terms describe the general rules for using
            the ShopSphere website and purchasing products
            through the platform.
          </p>
        </div>

        {/* 1. Using ShopSphere */}
        <section className="policy-card">
          <div className="policy-section-heading">
            <div className="policy-section-icon">
              <UserCheck size={21} />
            </div>

            <h2>1. Using ShopSphere</h2>
          </div>

          <p>
            By accessing or using ShopSphere, you agree to
            use the platform responsibly and in accordance
            with applicable laws and these terms.
          </p>
        </section>

        {/* 2. Products & Information */}
        <section className="policy-card">
          <div className="policy-section-heading">
            <div className="policy-section-icon">
              <Package size={21} />
            </div>

            <h2>2. Products & Information</h2>
          </div>

          <p>
            We aim to display product information as
            accurately as possible. Product availability,
            descriptions, images, specifications, and prices
            may change from time to time.
          </p>
        </section>

        {/* 3. Orders */}
        <section className="policy-card">
          <div className="policy-section-heading">
            <div className="policy-section-icon">
              <ShoppingCart size={21} />
            </div>

            <h2>3. Orders</h2>
          </div>

          <p>
            When you place an order, you are submitting a
            request to purchase the selected products.
            Orders may be subject to availability and
            verification.
          </p>
        </section>

        {/* 4. Payments */}
        <section className="policy-card">
          <div className="policy-section-heading">
            <div className="policy-section-icon">
              <CreditCard size={21} />
            </div>

            <h2>4. Payments</h2>
          </div>

          <p>
            Payments must be completed using the payment
            methods made available during checkout. You are
            responsible for providing accurate billing and
            payment information.
          </p>
        </section>

        {/* 5. Returns & Warranty */}
        <section className="policy-card">
          <div className="policy-section-heading">
            <div className="policy-section-icon">
              <ShieldCheck size={21} />
            </div>

            <h2>5. Returns & Warranty</h2>
          </div>

          <p>
            Returns, replacements, and warranty requests are
            subject to the applicable ShopSphere policy and
            product-specific conditions.
          </p>
        </section>

        {/* 6. User Responsibilities */}
        <section className="policy-card">
          <div className="policy-section-heading">
            <div className="policy-section-icon">
              <Settings size={21} />
            </div>

            <h2>6. User Responsibilities</h2>
          </div>

          <ul className="policy-list">
            <li>
              Provide accurate account and order information.
            </li>

            <li>
              Keep your account credentials secure.
            </li>

            <li>
              Use the website only for legitimate purposes.
            </li>

            <li>
              Do not attempt to interfere with or misuse the
              ShopSphere platform.
            </li>
          </ul>
        </section>

        {/* 7. Changes to These Terms */}
        <section className="policy-card">
          <div className="policy-section-heading">
            <div className="policy-section-icon">
              <RefreshCcw size={21} />
            </div>

            <h2>7. Changes to These Terms</h2>
          </div>

          <p>
            ShopSphere may update these terms when necessary.
            Updated versions will be reflected on this page.
          </p>
        </section>

        {/* 8. Contact */}
        <section className="policy-card">
          <div className="policy-section-heading">
            <div className="policy-section-icon">
              <Mail size={21} />
            </div>

            <h2>8. Contact</h2>
          </div>

          <p>
            If you have questions about these Terms &
            Conditions, please contact ShopSphere customer
            support.
          </p>
        </section>

        {/* Information Notice */}
        <section className="policy-card policy-info-card">
          <div className="policy-section-heading">
            <div className="policy-section-icon">
              <Info size={21} />
            </div>

            <h2>Important Information</h2>
          </div>

          <p>
            This page contains general terms for the
            ShopSphere frontend project. Product-specific
            policies and actual business terms may vary.
          </p>
        </section>

      </div>
    </main>
  );
}
