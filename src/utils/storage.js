// src/utils/storage.js

// ======================================================
// Generic Local Storage
// ======================================================

export const getStoredData = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);

    if (stored === null) {
      return defaultValue;
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error(
      `Error reading ${key} from localStorage:`,
      error
    );

    return defaultValue;
  }
};

export const setStoredData = (key, value) => {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch (error) {
    console.error(
      `Error saving ${key} to localStorage:`,
      error
    );
  }
};

export const removeStoredData = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(
      `Error removing ${key} from localStorage:`,
      error
    );
  }
};

// ======================================================
// User-Specific Storage
// ======================================================

export const getUserStorageKey = (email) => {
  if (!email) {
    return null;
  }

  return email.trim().toLowerCase();
};

// ======================================================
// Get All User Data
// ======================================================

export const getAllUserData = () => {
  return getStoredData('userData', {});
};

// ======================================================
// Save All User Data
// ======================================================

export const setAllUserData = (userData) => {
  setStoredData('userData', userData);
};

// ======================================================
// Get One User's Data
// ======================================================

export const getUserData = (
  email,
  defaultValue = null
) => {
  const userKey = getUserStorageKey(email);

  if (!userKey) {
    return defaultValue;
  }

  const allUserData = getAllUserData();

  return allUserData[userKey] ?? defaultValue;
};

// ======================================================
// Save One User's Data
// ======================================================

export const setUserData = (email, data) => {
  const userKey = getUserStorageKey(email);

  if (!userKey) {
    return;
  }

  const allUserData = getAllUserData();

  allUserData[userKey] = data;

  setAllUserData(allUserData);
};

// ======================================================
// Remove One User's Data
// ======================================================

export const removeUserData = (email) => {
  const userKey = getUserStorageKey(email);

  if (!userKey) {
    return;
  }

  const allUserData = getAllUserData();

  delete allUserData[userKey];

  setAllUserData(allUserData);
};