import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { INITIAL_PRODUCTS } from '../data/initialProducts';

const AppContext = createContext(null);

/* =========================================
   CONSTANTS
========================================= */

const BASE_PATH = '/shop';

const STORAGE_KEYS = {
  cart: 'shopsphere_cart',
  wishlist: 'shopsphere_wishlist',
  user: 'shopsphere_user',
  orders: 'shopsphere_orders',
  allOrders: 'shopsphere_all_orders',
  theme: 'shopsphere_theme',
};

/* =========================================
   SAFE LOCAL STORAGE
========================================= */

const getStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);

    if (value === null) {
      return fallback;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(
      `Failed to read localStorage key: ${key}`,
      error
    );

    return fallback;
  }
};

const setStorage = (key, value) => {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch (error) {
    console.error(
      `Failed to save localStorage key: ${key}`,
      error
    );
  }
};

/* =========================================
   URL HELPERS
========================================= */

/**
 * Convert current route + params into browser URL.
 */
const routeToPath = (
  route,
  params = {}
) => {
  switch (route) {
    /* -------------------------------------
       HOME
    ------------------------------------- */

    case 'home':
      return `${BASE_PATH}`;

    /* -------------------------------------
       SHOP / PRODUCTS
    ------------------------------------- */

    case 'shop': {
      const searchParams =
        new URLSearchParams();

      /*
        Category
        Example:
        ?category=Electronics
      */
      if (
        params.category &&
        params.category !== 'All'
      ) {
        searchParams.set(
          'category',
          params.category
        );
      }

      /*
        Brand
        Example:
        ?brand=Apple
      */
      if (
        params.brand &&
        params.brand !== 'All'
      ) {
        searchParams.set(
          'brand',
          params.brand
        );
      }

      /*
        Maximum price

        50000 is the default value,
        so we don't need to put it
        into the URL.
      */
      if (
        params.maxPrice !== undefined &&
        params.maxPrice !== null &&
        Number(params.maxPrice) < 50000
      ) {
        searchParams.set(
          'maxPrice',
          String(params.maxPrice)
        );
      }

      /*
        Minimum rating

        0 is the default value.
      */
      if (
        params.rating !== undefined &&
        params.rating !== null &&
        Number(params.rating) > 0
      ) {
        searchParams.set(
          'rating',
          String(params.rating)
        );
      }

      /*
        Stock filter
      */
      if (
        params.stock === 'in-stock'
      ) {
        searchParams.set(
          'stock',
          'in-stock'
        );
      }

      const queryString =
        searchParams.toString();

      return `${BASE_PATH}/products${
        queryString
          ? `?${queryString}`
          : ''
      }`;
    }

    /* -------------------------------------
       PRODUCT DETAIL
    ------------------------------------- */

    case 'product':
      return `${BASE_PATH}/product/${encodeURIComponent(
        params.id
      )}`;

    /* -------------------------------------
       CART
    ------------------------------------- */

    case 'cart':
      return `${BASE_PATH}/cart`;

    /* -------------------------------------
       CHECKOUT
    ------------------------------------- */

    case 'checkout':
      return `${BASE_PATH}/checkout`;

    /* -------------------------------------
       ORDERS
    ------------------------------------- */

    case 'orders':
      return `${BASE_PATH}/orders`;

    /* -------------------------------------
       WISHLIST
    ------------------------------------- */

    case 'wishlist':
      return `${BASE_PATH}/wishlist`;

    /* -------------------------------------
       PROFILE
    ------------------------------------- */

    case 'profile':
      return `${BASE_PATH}/profile`;

    /* -------------------------------------
       ADMIN
    ------------------------------------- */

    case 'admin':
      return `${BASE_PATH}/admin`;

    /* -------------------------------------
       RETURNS
    ------------------------------------- */

    case 'returns':
      return `${BASE_PATH}/returns`;

    /* -------------------------------------
       WARRANTY
    ------------------------------------- */

    case 'warranty':
      return `${BASE_PATH}/warranty`;

    /* -------------------------------------
       TERMS
    ------------------------------------- */

    case 'terms':
      return `${BASE_PATH}/terms`;

    /* -------------------------------------
       DEFAULT
    ------------------------------------- */

    default:
      return `${BASE_PATH}`;
  }
};

/**
 * Convert browser URL into
 * application route + parameters.
 */
const pathToRoute = () => {
  const pathname =
    window.location.pathname;

  const searchParams =
    new URLSearchParams(
      window.location.search
    );

  /* =======================================
     REMOVE BASE PATH
  ======================================= */

  let path = pathname;

  if (path === BASE_PATH) {
    path = '';
  } else if (
    path.startsWith(`${BASE_PATH}/`)
  ) {
    path = path.slice(
      BASE_PATH.length
    );
  }

  /*
    Remove trailing slash.

    /products/
    becomes
    /products
  */
  if (
    path.length > 1 &&
    path.endsWith('/')
  ) {
    path = path.slice(0, -1);
  }

  /* =======================================
     HOME
  ======================================= */

  if (
    path === '' ||
    path === '/'
  ) {
    return {
      route: 'home',
      params: {},
    };
  }

  /* =======================================
     SHOP / PRODUCTS
  ======================================= */

  if (path === '/products') {
    const category =
      searchParams.get('category');

    const brand =
      searchParams.get('brand');

    const maxPrice =
      searchParams.get('maxPrice');

    const rating =
      searchParams.get('rating');

    const stock =
      searchParams.get('stock');

    return {
      route: 'shop',

      params: {
        /*
          Defaults match ShopPage
        */
        category:
          category || 'All',

        brand:
          brand || 'All',

        maxPrice:
          maxPrice
            ? Number(maxPrice)
            : 50000,

        rating:
          rating
            ? Number(rating)
            : 0,

        stock:
          stock === 'in-stock'
            ? 'in-stock'
            : undefined,
      },
    };
  }

  /* =======================================
     PRODUCT DETAIL
  ======================================= */

  if (
    path.startsWith('/product/')
  ) {
    const id =
      decodeURIComponent(
        path.replace(
          '/product/',
          ''
        )
      );

    return {
      route: 'product',
      params: {
        id,
      },
    };
  }

  /* =======================================
     CART
  ======================================= */

  if (path === '/cart') {
    return {
      route: 'cart',
      params: {},
    };
  }

  /* =======================================
     CHECKOUT
  ======================================= */

  if (path === '/checkout') {
    return {
      route: 'checkout',
      params: {},
    };
  }

  /* =======================================
     ORDERS
  ======================================= */

  if (path === '/orders') {
    return {
      route: 'orders',
      params: {},
    };
  }

  /* =======================================
     WISHLIST
  ======================================= */

  if (path === '/wishlist') {
    return {
      route: 'wishlist',
      params: {},
    };
  }

  /* =======================================
     PROFILE
  ======================================= */

  if (path === '/profile') {
    return {
      route: 'profile',
      params: {},
    };
  }

  /* =======================================
     ADMIN
  ======================================= */

  if (path === '/admin') {
    return {
      route: 'admin',
      params: {},
    };
  }

  /* =======================================
     RETURNS
  ======================================= */

  if (path === '/returns') {
    return {
      route: 'returns',
      params: {},
    };
  }

  /* =======================================
     WARRANTY
  ======================================= */

  if (path === '/warranty') {
    return {
      route: 'warranty',
      params: {},
    };
  }

  /* =======================================
     TERMS
  ======================================= */

  if (path === '/terms') {
    return {
      route: 'terms',
      params: {},
    };
  }

  /* =======================================
     FALLBACK
  ======================================= */

  return {
    route: 'home',
    params: {},
  };
};

/* =========================================
   PROVIDER
========================================= */

export function AppProvider({
  children,
}) {
  /* =======================================
     PRODUCTS
  ======================================= */

  const products = INITIAL_PRODUCTS;

  /* =======================================
     ROUTING STATE
  ======================================= */

  const initialRoute =
    pathToRoute();

  const [
    currentRoute,
    setCurrentRoute,
  ] = useState(
    initialRoute.route
  );

  const [
    routeParams,
    setRouteParams,
  ] = useState(
    initialRoute.params
  );

  /* =======================================
     NAVIGATION
  ======================================= */

  const navigate = (
    route,
    params = {}
  ) => {
    const path =
      routeToPath(
        route,
        params
      );

    const currentPath =
      `${window.location.pathname}${window.location.search}`;

    /*
      Avoid creating a duplicate
      browser history entry.
    */
    if (
      currentPath === path
    ) {
      const parsed =
        pathToRoute();

      setCurrentRoute(
        parsed.route
      );

      setRouteParams(
        parsed.params
      );

      return;
    }

    /*
      Update browser URL
      without full page reload.
    */
    window.history.pushState(
      {},
      '',
      path
    );

    const parsed =
      pathToRoute();

    setCurrentRoute(
      parsed.route
    );

    setRouteParams(
      parsed.params
    );

    /*
      Scroll to top after
      navigation.
    */
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /* =======================================
     BROWSER BACK / FORWARD
  ======================================= */

  useEffect(() => {
    const handlePopState = () => {
      const parsed =
        pathToRoute();

      setCurrentRoute(
        parsed.route
      );

      setRouteParams(
        parsed.params
      );

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    window.addEventListener(
      'popstate',
      handlePopState
    );

    return () => {
      window.removeEventListener(
        'popstate',
        handlePopState
      );
    };
  }, []);

  /* =======================================
     CART
  ======================================= */

  const [
    cart,
    setCart,
  ] = useState(() =>
    getStorage(
      STORAGE_KEYS.cart,
      []
    )
  );

  /* =======================================
     WISHLIST
  ======================================= */

  const [
    wishlist,
    setWishlist,
  ] = useState(() =>
    getStorage(
      STORAGE_KEYS.wishlist,
      []
    )
  );

  /* =======================================
     USER
  ======================================= */

  const [
    user,
    setUser,
  ] = useState(() =>
    getStorage(
      STORAGE_KEYS.user,
      null
    )
  );

  /* =======================================
     ORDERS
  ======================================= */

  const [
    orders,
    setOrders,
  ] = useState(() =>
    getStorage(
      STORAGE_KEYS.orders,
      []
    )
  );

  /* =======================================
     ALL ORDERS - ADMIN
  ======================================= */

  const [
    allOrders,
    setAllOrders,
  ] = useState(() =>
    getStorage(
      STORAGE_KEYS.allOrders,
      []
    )
  );

  /* =======================================
     THEME
  ======================================= */

  const [
    theme,
    setTheme,
  ] = useState(() =>
    getStorage(
      STORAGE_KEYS.theme,
      'light'
    )
  );

  /* =======================================
     GLOBAL SEARCH
  ======================================= */

  const [
    globalSearchTerm,
    setGlobalSearchTerm,
  ] = useState('');

  /* =======================================
     QUICK VIEW
  ======================================= */

  const [
    quickViewProduct,
    setQuickViewProduct,
  ] = useState(null);

  /* =======================================
     AUTH MODAL
  ======================================= */

  const [
    authModalOpen,
    setAuthModalOpen,
  ] = useState(false);

  /* =======================================
     MOBILE MENU
  ======================================= */

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  /* =======================================
     TOASTS
  ======================================= */

  const [
    toasts,
    setToasts,
  ] = useState([]);

  /* =======================================
     PERSIST CART
  ======================================= */

  useEffect(() => {
    setStorage(
      STORAGE_KEYS.cart,
      cart
    );
  }, [cart]);

  /* =======================================
     PERSIST WISHLIST
  ======================================= */

  useEffect(() => {
    setStorage(
      STORAGE_KEYS.wishlist,
      wishlist
    );
  }, [wishlist]);

  /* =======================================
     PERSIST USER
  ======================================= */

  useEffect(() => {
    setStorage(
      STORAGE_KEYS.user,
      user
    );
  }, [user]);

  /* =======================================
     PERSIST ORDERS
  ======================================= */

  useEffect(() => {
    setStorage(
      STORAGE_KEYS.orders,
      orders
    );
  }, [orders]);

  /* =======================================
     PERSIST ALL ORDERS
  ======================================= */

  useEffect(() => {
    setStorage(
      STORAGE_KEYS.allOrders,
      allOrders
    );
  }, [allOrders]);

  /* =======================================
     PERSIST THEME
  ======================================= */

  useEffect(() => {
    setStorage(
      STORAGE_KEYS.theme,
      theme
    );

    document.documentElement.setAttribute(
      'data-theme',
      theme
    );
  }, [theme]);

  /* =======================================
     CART HELPERS
  ======================================= */

  const addToCart = (
    product,
    quantity = 1
  ) => {
    if (!product) {
      return;
    }

    if (
      product.stock <= 0
    ) {
      addToast(
        'Product is out of stock.',
        'error'
      );

      return;
    }

    setCart((currentCart) => {
      const existingItem =
        currentCart.find(
          (item) =>
            String(item.id) ===
            String(product.id)
        );

      if (existingItem) {
        const newQuantity =
          existingItem.quantity +
          quantity;

        if (
          product.stock &&
          newQuantity >
            product.stock
        ) {
          addToast(
            `Only ${product.stock} item(s) available.`,
            'error'
          );

          return currentCart;
        }

        return currentCart.map(
          (item) =>
            String(item.id) ===
            String(product.id)
              ? {
                  ...item,
                  quantity:
                    newQuantity,
                }
              : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity,
        },
      ];
    });

    addToast(
      `${product.name} added to cart.`,
      'success'
    );
  };

  const updateCartQuantity = (
    productId,
    quantity
  ) => {
    const newQuantity =
      Number(quantity);

    if (
      newQuantity <= 0
    ) {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map(
        (item) => {
          if (
            String(item.id) !==
            String(productId)
          ) {
            return item;
          }

          const maxStock =
            item.stock ||
            Infinity;

          return {
            ...item,
            quantity:
              Math.min(
                newQuantity,
                maxStock
              ),
          };
        }
      )
    );
  };

  const removeFromCart = (
    productId
  ) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          String(item.id) !==
          String(productId)
      )
    );

    addToast(
      'Product removed from cart.',
      'success'
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  /* =======================================
     WISHLIST HELPERS
  ======================================= */

  const isInWishlist = (
    productId
  ) => {
    return wishlist.some(
      (item) =>
        String(item.id) ===
        String(productId)
    );
  };

  const toggleWishlist = (
    product
  ) => {
    if (!product) {
      return;
    }

    setWishlist(
      (currentWishlist) => {
        const exists =
          currentWishlist.some(
            (item) =>
              String(item.id) ===
              String(product.id)
          );

        if (exists) {
          addToast(
            `${product.name} removed from wishlist.`,
            'success'
          );

          return currentWishlist.filter(
            (item) =>
              String(item.id) !==
              String(product.id)
          );
        }

        addToast(
          `${product.name} added to wishlist.`,
          'success'
        );

        return [
          ...currentWishlist,
          product,
        ];
      }
    );
  };

  const removeFromWishlist = (
    productId
  ) => {
    setWishlist(
      (currentWishlist) =>
        currentWishlist.filter(
          (item) =>
            String(item.id) !==
            String(productId)
        )
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  /* =======================================
     AUTH
  ======================================= */

  const login = (
    userData
  ) => {
    setUser(userData);
    setAuthModalOpen(false);

    addToast(
      `Welcome, ${
        userData?.name ||
        'User'
      }!`,
      'success'
    );
  };

  const logout = () => {
    setUser(null);

    addToast(
      'You have been logged out.',
      'success'
    );

    navigate('home');
  };

  const updateUser = (
    updatedData
  ) => {
    setUser(
      (currentUser) => ({
        ...currentUser,
        ...updatedData,
      })
    );
  };

  /* =======================================
     ORDER HELPERS
  ======================================= */

  const createOrder = (
    orderData
  ) => {
    const newOrder = {
      ...orderData,

      id:
        orderData?.id ||
        `ORD-${Date.now()}`,

      createdAt:
        orderData?.createdAt ||
        new Date().toISOString(),

      status:
        orderData?.status ||
        'Processing',
    };

    setOrders(
      (currentOrders) => [
        newOrder,
        ...currentOrders,
      ]
    );

    setAllOrders(
      (currentOrders) => [
        newOrder,
        ...currentOrders,
      ]
    );

    return newOrder;
  };

  const updateOrderStatus = (
    orderId,
    status
  ) => {
    setOrders(
      (currentOrders) =>
        currentOrders.map(
          (order) =>
            String(order.id) ===
            String(orderId)
              ? {
                  ...order,
                  status,
                }
              : order
        )
    );

    setAllOrders(
      (currentOrders) =>
        currentOrders.map(
          (order) =>
            String(order.id) ===
            String(orderId)
              ? {
                  ...order,
                  status,
                }
              : order
        )
    );
  };

  /* =======================================
     TOAST
  ======================================= */

  const addToast = (
    message,
    type = 'success',
    duration = 3000
  ) => {
    const id =
      Date.now() +
      Math.random();

    setToasts(
      (currentToasts) => [
        ...currentToasts,
        {
          id,
          message,
          type,
        },
      ]
    );

    window.setTimeout(() => {
      setToasts(
        (currentToasts) =>
          currentToasts.filter(
            (toast) =>
              toast.id !== id
          )
      );
    }, duration);
  };

  const removeToast = (
    toastId
  ) => {
    setToasts(
      (currentToasts) =>
        currentToasts.filter(
          (toast) =>
            toast.id !== toastId
        )
    );
  };

  /* =======================================
     CART SUMMARY
  ======================================= */

  const cartCount = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(
          item.quantity || 0
        ),
      0
    );
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(
          item.price || 0
        ) *
          Number(
            item.quantity || 0
          ),
      0
    );
  }, [cart]);

  /* =======================================
     CONTEXT VALUE
  ======================================= */

  const contextValue = {
    /* Products */
    products,

    /* Routing */
    currentRoute,
    routeParams,
    navigate,

    /* Search */
    globalSearchTerm,
    setGlobalSearchTerm,

    /* Cart */
    cart,
    setCart,
    cartCount,
    cartSubtotal,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,

    /* Wishlist */
    wishlist,
    setWishlist,
    isInWishlist,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,

    /* User / Auth */
    user,
    setUser,
    login,
    logout,
    updateUser,

    /* Orders */
    orders,
    setOrders,
    allOrders,
    setAllOrders,
    createOrder,
    updateOrderStatus,

    /* Theme */
    theme,
    setTheme,

    /* Quick View */
    quickViewProduct,
    setQuickViewProduct,

    /* Auth Modal */
    authModalOpen,
    setAuthModalOpen,

    /* Mobile Menu */
    mobileMenuOpen,
    setMobileMenuOpen,

    /* Toast */
    toasts,
    addToast,
    removeToast,
  };

  return (
    <AppContext.Provider
      value={contextValue}
    >
      {children}
    </AppContext.Provider>
  );
}

/* =========================================
   HOOK
========================================= */

export function useApp() {
  const context =
    useContext(AppContext);

  if (!context) {
    throw new Error(
      'useApp must be used inside AppProvider'
    );
  }

  return context;
}