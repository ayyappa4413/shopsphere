import { useMemo } from 'react';
import '../styles/home.css';

import {
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Truck,
  RotateCcw,
  Headphones,
  ChevronRight,
} from 'lucide-react';

import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/coupons';
import ProductCard from '../components/common/ProductCard';

export default function HomePage() {
  const {
    products,
    navigate,
    setQuickViewProduct,
  } = useApp();

  const featuredList = useMemo(
    () =>
      products
        .filter((product) => product.featured)
        .slice(0, 8),
    [products]
  );

  const bestsellerList = useMemo(
    () =>
      products
        .filter((product) => product.bestseller)
        .slice(0, 4),
    [products]
  );

  return (
    <div className="home-page">

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="container hero-grid">

          <div className="hero-content">

            <div className="hero-tag">
              <ShieldCheck size={16} />
              <span>100% Genuine Certified Tech & Apparel</span>
            </div>

            <h1 className="hero-title">
              Elevate Your Lifestyle with{' '}
              <span>Premium Picks</span>
            </h1>

            <p className="hero-desc">
              Discover over 30+ handpicked flagship electronics,
              timeless designer fashion, ultra-comfortable footwear,
              and everyday essentials curated for modern living.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => navigate('shop')}
              >
                Explore Catalogue
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={() =>
                  navigate('shop', {
                    category: 'Electronics',
                  })
                }
              >
                Shop Electronics
              </button>
            </div>

          </div>

          <div className="hero-image-box">

            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
              alt="Premium headphones"
              className="hero-img-main"
            />

            <div className="hero-floating-card">
              <div className="hero-floating-icon">
                <TrendingUp size={22} />
              </div>

              <div>
                <div className="hero-floating-title">
                  Bestseller 2026
                </div>

                <div className="hero-floating-text">
                  Over 14,000+ happy buyers
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="benefits-bar">
        <div className="container benefits-grid">

          <div className="benefit-card">
            <div className="benefit-icon">
              <Truck size={24} />
            </div>

            <div className="benefit-text">
              <h4>Complimentary Express</h4>
              <p>
                Free shipping on orders above ₹5,000
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <ShieldCheck size={24} />
            </div>

            <div className="benefit-text">
              <h4>2-Year Warranty</h4>
              <p>
                Direct manufacturer guarantee included
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <RotateCcw size={24} />
            </div>

            <div className="benefit-text">
              <h4>15-Day Easy Returns</h4>
              <p>
                No questions asked doorstep pickup
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <Headphones size={24} />
            </div>

            <div className="benefit-text">
              <h4>24/7 Expert Help</h4>
              <p>
                Live audio & tech assistance anytime
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="section categories-section">
        <div className="container">

          <div className="section-header">
            <div>
              <span className="section-eyebrow">
                EXPLORE COLLECTION
              </span>

              <h2 className="section-title">
                Shop by Curated Categories
              </h2>

              <p className="section-subtitle">
                Find high performance products designed for work
                and leisure.
              </p>
            </div>
          </div>

          <div className="category-pills">
            {CATEGORIES.slice(1).map((category) => (
              <button
                type="button"
                key={category}
                className="category-pill"
                onClick={() =>
                  navigate('shop', {
                    category,
                  })
                }
              >
                {category}
                <ChevronRight size={15} />
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ================= TRENDING ================= */}
      <section className="section trending-section">
        <div className="container">

          <div className="section-header">
            <div>
              <span className="section-eyebrow">
                SHOPPER FAVOURITES
              </span>

              <h2 className="section-title">
                Trending Now
              </h2>

              <p className="section-subtitle">
                Most viewed items based on this week's shopper activity.
              </p>
            </div>

            <button
              type="button"
              className="view-all-link"
              onClick={() => navigate('shop')}
            >
              View All
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="products-grid">
            {featuredList.length > 0 ? (
              featuredList.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))
            ) : (
              <p className="empty-products">
                No featured products available.
              </p>
            )}
          </div>

        </div>
      </section>

      {/* ================= PROMO ================= */}
      <section className="section promo-section">
        <div className="container">

          <div className="promo-banner">

            <div className="promo-content">
              <span className="promo-eyebrow">
                LIMITED TIME OFFER
              </span>

              <h2 className="promo-title">
                Upgrade Your Workspace with Flagship Audio
              </h2>

              <p className="promo-description">
                Get up to 30% discount on noise-cancelling
                headphones, ergonomic setups, and productivity
                boosters.
              </p>

              <button
                type="button"
                className="promo-btn"
                onClick={() =>
                  navigate('shop', {
                    category: 'Electronics',
                  })
                }
              >
                Claim Discount Now
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="promo-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80"
                alt="Premium audio headphones"
                className="promo-image"
              />
            </div>

          </div>

        </div>
      </section>

      {/* ================= BESTSELLERS ================= */}
      <section className="section bestsellers-section">
        <div className="container">

          <div className="section-header">
            <div>
              <span className="section-eyebrow">
                TOP RATED
              </span>

              <h2 className="section-title">
                ShopSphere Bestsellers
              </h2>

              <p className="section-subtitle">
                Consistent five-star rated products backed by warranty.
              </p>
            </div>
          </div>

          <div className="products-grid">
            {bestsellerList.length > 0 ? (
              bestsellerList.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))
            ) : (
              <p className="empty-products">
                No bestseller products available.
              </p>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}