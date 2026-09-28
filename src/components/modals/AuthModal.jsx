// src/components/modals/AuthModal.jsx

import React, { useState } from 'react';

import {
  Mail,
  Lock,
  X,
  LogIn,
} from 'lucide-react';

import { useApp } from '../../context/AppContext';

import '../../styles/modals.css';
export default function AuthModal() {
  const {
    authModalOpen,
    setAuthModalOpen,
    setUser,
    addToast,
  } = useApp();
// console.log('AuthModal rendered:', authModalOpen);
  const [email, setEmail] = useState(
    'user@shopsphere.com'
  );

  const [password, setPassword] = useState(
    'user123'
  );

  const [error, setError] = useState('');

  // ====================================================
  // Don't render when modal is closed
  // ====================================================

  if (!authModalOpen) {
    return null;
  }

  // ====================================================
  // Login
  // ====================================================

  const handleLogin = (e) => {
    e.preventDefault();

    setError('');

    const cleanEmail = email
      .trim()
      .toLowerCase();

    const cleanPassword = password.trim();

    // ==================================================
    // Admin Login
    // ==================================================

    if (
      cleanEmail === 'admin@shopsphere.com' &&
      cleanPassword === 'admin123'
    ) {
      setUser({
        name: 'Administrator',
        email: cleanEmail,
        role: 'admin',
        addresses: [],
      });

      addToast(
        'Welcome back, Administrator!'
      );

      setAuthModalOpen(false);

      return;
    }

    // ==================================================
    // Customer Login
    // ==================================================

    if (
      cleanEmail === 'user@shopsphere.com' &&
      cleanPassword === 'user123'
    ) {
      setUser({
        name: 'Alex Mercer',
        email: cleanEmail,
        role: 'customer',
        addresses: [
          '402 Highline Towers, Indiranagar, Bengaluru 560038',
        ],
      });

      addToast(
        'Welcome back, Alex!'
      );

      setAuthModalOpen(false);

      return;
    }

    // ==================================================
    // Invalid Login
    // ==================================================

    setError(
      'Invalid email or password.'
    );
  };

  return (
    <div
      className="modal-overlay"
      onClick={() =>
        setAuthModalOpen(false)
      }
    >
      <div
        className="auth-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* Close Button */}

        <button
          type="button"
          className="modal-close"
          onClick={() =>
            setAuthModalOpen(false)
          }
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}

        <div className="auth-header">
          <div className="auth-icon">
            <LogIn size={24} />
          </div>

          <h2>Welcome Back</h2>

          <p>
            Sign in to continue shopping
            on ShopSphere.
          </p>
        </div>

        {/* Login Form */}

        <form
          onSubmit={handleLogin}
          className="auth-form"
        >
          {/* Email */}

          <div className="form-group">
            <label htmlFor="auth-email">
              Email Address
            </label>

            <div className="input-wrapper">

              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}

          <div className="form-group">
            <label htmlFor="auth-password">
              Password
            </label>

            <div className="input-wrapper">

              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Error */}

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          {/* Submit */}

          <button
            type="submit"
            className="auth-submit-btn"
          >
            <LogIn size={18} />
            Sign In
          </button>
        </form>

        {/* Demo Credentials */}

        <div className="demo-credentials">
          <strong>
            Demo Customer:
          </strong>

          <span>
            user@shopsphere.com
          </span>

          <span>
            Password: user123
          </span>

          <hr />

          <strong>
            Demo Admin: 
          </strong>

          <span>
            admin@shopsphere.com
          </span>

          <span>
            Password: admin123
          </span>
        </div>
      </div>
    </div>
  );
}