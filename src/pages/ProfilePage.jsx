// src/pages/ProfilePage.jsx

import React, {
  useEffect,
  useState,
} from 'react';

import {
  LogOut,
  User,
  Mail,
  ShieldCheck,
} from 'lucide-react';

import { useApp } from '../context/AppContext';

import '../styles/profile.css';

export default function ProfilePage() {
  const {
    user,
    setUser,
    navigate,
    addToast,
  } = useApp();

  const [profileName, setProfileName] =
    useState(user?.name || '');

  const [profileEmail, setProfileEmail] =
    useState(user?.email || '');

  // ====================================================
  // Synchronize Profile Form
  // ====================================================

  useEffect(() => {
    setProfileName(
      user?.name || ''
    );

    setProfileEmail(
      user?.email || ''
    );
  }, [user]);

  // ====================================================
  // Save Profile
  // ====================================================

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const newName =
      profileName.trim();

    const newEmail =
      profileEmail
        .trim()
        .toLowerCase();

    if (!newName || !newEmail) {
      addToast(
        'Name and email are required.',
        'error'
      );

      return;
    }

    // Email is used as the account's
    // localStorage identifier.
    //
    // Therefore, changing it would create
    // a different account.
    //
    // Keep email fixed for this demo.

    if (
      newEmail !==
      user.email
        .trim()
        .toLowerCase()
    ) {
      addToast(
        'Email address cannot be changed for this demo account.',
        'error'
      );

      return;
    }

    setUser((previousUser) => ({
      ...previousUser,
      name: newName,
    }));

    addToast(
      'Profile details updated!'
    );
  };

  // ====================================================
  // Logout
  // ====================================================

  const handleLogout = () => {
    setUser(null);

    addToast(
      'Logged out of session.',
      'info'
    );

    navigate('home');
  };

  // ====================================================
  // Not Logged In
  // ====================================================

  if (!user) {
    return (
      <div className="container profile-page">
        <div className="profile-card profile-empty-card">
          <div className="profile-empty-icon">
            <User size={28} />
          </div>

          <h2>
            You are not signed in.
          </h2>

          <p>
            Sign in to manage your
            ShopSphere account and
            profile details.
          </p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              navigate('home')
            }
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // ====================================================
  // Profile
  // ====================================================

  return (
    <div className="container profile-page">
      <div className="profile-card">

        {/* Header */}

        <div className="profile-header">
          <div className="profile-title-row">

            <div className="profile-user-icon">
              <User size={24} />
            </div>

            <div>
              <h1>
                Account Profile
              </h1>

              <p>
                Manage your account
                details and preferences
              </p>
            </div>

          </div>

          <button
            type="button"
            className="profile-signout-btn"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        {/* Profile Form */}

        <form
          onSubmit={handleUpdate}
          className="profile-form"
        >

          {/* Name */}

          <div className="form-field">
            <label htmlFor="profile-name">
              Display Name
            </label>

            <div className="profile-input-wrapper">
              <User size={18} />

              <input
                id="profile-name"
                type="text"
                className="form-input"
                value={profileName}
                onChange={(e) =>
                  setProfileName(
                    e.target.value
                  )
                }
                required
              />
            </div>
          </div>

          {/* Email */}

          <div className="form-field">
            <label htmlFor="profile-email">
              Email Address
            </label>

            <div className="profile-input-wrapper">
              <Mail size={18} />

              <input
                id="profile-email"
                type="email"
                className="form-input"
                value={profileEmail}
                onChange={(e) =>
                  setProfileEmail(
                    e.target.value
                  )
                }
                required
              />
            </div>
          </div>

          {/* Account Type */}

          <div className="form-field">
            <label htmlFor="profile-account-type">
              Account Type
            </label>

            <div className="profile-input-wrapper">
              <ShieldCheck size={18} />

              <input
                id="profile-account-type"
                type="text"
                disabled
                className="form-input"
                value={
                  user.role === 'admin'
                    ? 'Administrator'
                    : 'Standard Verified Shopper'
                }
                readOnly
              />
            </div>
          </div>

          {/* Account Email */}

          <div className="profile-info-box">
            <div className="profile-info-content">
              <strong>
                Account Email
              </strong>

              <span>
                {user.email}
              </span>
            </div>

            <ShieldCheck size={18} />
          </div>

          {/* Save */}

          <button
            type="submit"
            className="btn btn-primary profile-save-btn"
          >
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
}