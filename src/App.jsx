import { useApp } from './context/AppContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import MobileDrawer from './components/common/MobileDrawer';
import ToastContainer from './components/common/ToastContainer';

import QuickViewModal from './components/modals/QuickViewModal';
import AuthModal from './components/modals/AuthModal';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

// Policy Pages
import DoorstepReturns from './pages/DoorstepReturns';
import Warranty from './pages/Warranty';
import TermsConditions from './pages/TermsConditions';

export default function App() {
  const {
    currentRoute,
    routeParams,

    quickViewProduct,
    setQuickViewProduct,

    authModalOpen,
    setAuthModalOpen,

    mobileMenuOpen,
    setMobileMenuOpen,
  } = useApp();

  const renderPage = () => {
    switch (currentRoute) {
      // =========================
      // Main Pages
      // =========================
      case 'home':
        return <HomePage />;

      case 'shop':
        return <ShopPage />;

      case 'product':
        return (
          <ProductDetailPage
            productId={routeParams?.id}
          />
        );

      case 'cart':
        return <CartPage />;

      case 'checkout':
        return <CheckoutPage />;

      case 'orders':
        return <OrdersPage />;

      case 'wishlist':
        return <WishlistPage />;

      case 'profile':
        return <ProfilePage />;

      case 'admin':
        return <AdminPage />;

      // =========================
      // Policy Pages
      // =========================
      case 'returns':
        return <DoorstepReturns />;

      case 'warranty':
        return <Warranty />;

      case 'terms':
        return <TermsConditions />;

      // =========================
      // Default
      // =========================
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app">

      {/* Navbar */}
      <Navbar
        onOpenMobile={() =>
          setMobileMenuOpen(true)
        }
      />

      {/* Page */}
      <main className="main-content">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <MobileDrawer
          onClose={() =>
            setMobileMenuOpen(false)
          }
        />
      )}

      {/* Quick View */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() =>
            setQuickViewProduct(null)
          }
        />
      )}

      {/* Authentication */}
      {authModalOpen && (
        <AuthModal
          onClose={() =>
            setAuthModalOpen(false)
          }
        />
      )}

      {/* Toast */}
      <ToastContainer />

    </div>
  );
}
