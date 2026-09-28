import React, { useState, useEffect, useMemo } from 'react';
import '../styles/shop.css';

import {
  Filter,
  LayoutGrid,
  List,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  SlidersHorizontal,
} from 'lucide-react';

import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/coupons';
import { formatINR } from '../utils/formatters';
import ProductCard from '../components/common/ProductCard';

export default function ShopPage() {
  const {
    products,
    setQuickViewProduct,
    routeParams,
    globalSearchTerm,
    setGlobalSearchTerm,
    navigate,
  } = useApp();

  /* =========================================
     FILTER STATE
  ========================================= */

  const [selectedCategory, setSelectedCategory] = useState(
    routeParams?.category || 'All'
  );

  const [selectedBrand, setSelectedBrand] = useState(
    routeParams?.brand || 'All'
  );

  const [maxPrice, setMaxPrice] = useState(
    routeParams?.maxPrice
      ? Number(routeParams.maxPrice)
      : 50000
  );

  const [minRating, setMinRating] = useState(
    routeParams?.rating
      ? Number(routeParams.rating)
      : 0
  );

  const [inStockOnly, setInStockOnly] = useState(
    routeParams?.stock === 'in-stock'
  );

  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  /* =========================================
     SYNC FILTER STATE FROM URL
  ========================================= */

  useEffect(() => {
    setSelectedCategory(
      routeParams?.category || 'All'
    );

    setSelectedBrand(
      routeParams?.brand || 'All'
    );

    setMaxPrice(
      routeParams?.maxPrice
        ? Number(routeParams.maxPrice)
        : 50000
    );

    setMinRating(
      routeParams?.rating
        ? Number(routeParams.rating)
        : 0
    );

    setInStockOnly(
      routeParams?.stock === 'in-stock'
    );

    setCurrentPage(1);
  }, [
    routeParams?.category,
    routeParams?.brand,
    routeParams?.maxPrice,
    routeParams?.rating,
    routeParams?.stock,
  ]);

  /* =========================================
     UPDATE SHOP URL
  ========================================= */

  const updateShopRoute = ({
    category = selectedCategory,
    brand = selectedBrand,
    price = maxPrice,
    rating = minRating,
    stock = inStockOnly,
  } = {}) => {
    const params = {};

    if (category && category !== 'All') {
      params.category = category;
    }

    if (brand && brand !== 'All') {
      params.brand = brand;
    }

    if (price && Number(price) < 50000) {
      params.maxPrice = Number(price);
    }

    if (rating && Number(rating) > 0) {
      params.rating = Number(rating);
    }

    if (stock) {
      params.stock = 'in-stock';
    }

    navigate('shop', params);
  };

  /* =========================================
     GET UNIQUE BRANDS
  ========================================= */

  const brands = useMemo(() => {
    const list = new Set(
      products
        .map((product) => product.brand)
        .filter(Boolean)
    );

    return ['All', ...Array.from(list)];
  }, [products]);

  /* =========================================
     FILTER + SORT PRODUCTS
  ========================================= */

  const filteredProducts = useMemo(() => {
    const searchTerm = globalSearchTerm.trim().toLowerCase();

    return products
      .filter((product) => {
        const searchMatch =
          !searchTerm ||
          product.name?.toLowerCase().includes(searchTerm) ||
          product.brand?.toLowerCase().includes(searchTerm) ||
          product.category?.toLowerCase().includes(searchTerm) ||
          product.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm)
          );

        const categoryMatch =
          selectedCategory === 'All' ||
          product.category === selectedCategory;

        const brandMatch =
          selectedBrand === 'All' ||
          product.brand === selectedBrand;

        const priceMatch =
          product.price <= maxPrice;

        const ratingMatch =
          product.rating >= minRating;

        const stockMatch =
          !inStockOnly || product.stock > 0;

        return (
          searchMatch &&
          categoryMatch &&
          brandMatch &&
          priceMatch &&
          ratingMatch &&
          stockMatch
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return a.price - b.price;
        }

        if (sortBy === 'price-high') {
          return b.price - a.price;
        }

        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }

        if (sortBy === 'discount') {
          return b.discount - a.discount;
        }

        return 0;
      });
  }, [
    products,
    globalSearchTerm,
    selectedCategory,
    selectedBrand,
    maxPrice,
    minRating,
    inStockOnly,
    sortBy,
  ]);

  /* =========================================
     PAGINATION
  ========================================= */

  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  const paginatedProducts = useMemo(() => {
    const start =
      (currentPage - 1) * itemsPerPage;

    return filteredProducts.slice(
      start,
      start + itemsPerPage
    );
  }, [filteredProducts, currentPage]);

  /* =========================================
     RESET FILTERS
  ========================================= */

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setMaxPrice(50000);
    setMinRating(0);
    setInStockOnly(false);
    setGlobalSearchTerm('');
    setCurrentPage(1);

    navigate('shop');
  };

  /* =========================================
     CATEGORY CHANGE
  ========================================= */

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);

    updateShopRoute({
      category,
      brand: selectedBrand,
      price: maxPrice,
      rating: minRating,
      stock: inStockOnly,
    });
  };

  /* =========================================
     BRAND CHANGE
  ========================================= */

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    setCurrentPage(1);

    updateShopRoute({
      category: selectedCategory,
      brand,
      price: maxPrice,
      rating: minRating,
      stock: inStockOnly,
    });
  };

  /* =========================================
     PRICE CHANGE
  ========================================= */

  const handlePriceChange = (price) => {
    setMaxPrice(price);
    setCurrentPage(1);

    updateShopRoute({
      category: selectedCategory,
      brand: selectedBrand,
      price,
      rating: minRating,
      stock: inStockOnly,
    });
  };

  /* =========================================
     RATING CHANGE
  ========================================= */

  const handleRatingChange = (rating) => {
    setMinRating(rating);
    setCurrentPage(1);

    updateShopRoute({
      category: selectedCategory,
      brand: selectedBrand,
      price: maxPrice,
      rating,
      stock: inStockOnly,
    });
  };

  /* =========================================
     STOCK CHANGE
  ========================================= */

  const handleStockChange = (checked) => {
    setInStockOnly(checked);
    setCurrentPage(1);

    updateShopRoute({
      category: selectedCategory,
      brand: selectedBrand,
      price: maxPrice,
      rating: minRating,
      stock: checked,
    });
  };

  /* =========================================
     LIST PRODUCT CLICK
  ========================================= */

  const handleListProductClick = (product) => {
    navigate('product', {
      id: product.id,
    });
  };

  return (
    <div className="container">
      <div className="shop-layout">

        {/* =========================
            FILTER SIDEBAR
        ========================== */}

        <aside className="filter-card">

          <div className="filter-header">
            <h3 className="filter-heading">
              <Filter size={18} />
              Filters
            </h3>

            <button
              type="button"
              className="reset-filter-btn"
              onClick={resetFilters}
            >
              Reset All
            </button>
          </div>

          {/* Active Filter Summary */}

          <div className="filter-summary">
            <SlidersHorizontal size={15} />

            <span>
              {filteredProducts.length} matching products
            </span>
          </div>

          {/* Category */}

          <div className="filter-group">
            <h4 className="filter-title">
              Category
            </h4>

            <div className="filter-options-list">
              {CATEGORIES.map((category) => (
                <label
                  key={category}
                  className="filter-checkbox-label"
                >
                  <input
                    type="radio"
                    name="category-filter"
                    checked={
                      selectedCategory === category
                    }
                    onChange={() =>
                      handleCategoryChange(category)
                    }
                  />

                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand */}

          <div className="filter-group">
            <h4 className="filter-title">
              Brand
            </h4>

            <select
              className="select-input filter-select"
              value={selectedBrand}
              onChange={(e) =>
                handleBrandChange(e.target.value)
              }
            >
              {brands.map((brand) => (
                <option
                  key={brand}
                  value={brand}
                >
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}

          <div className="filter-group">

            <div className="price-filter-header">
              <h4 className="filter-title price-title">
                Max Price
              </h4>

              <span className="max-price-value">
                {formatINR(maxPrice)}
              </span>
            </div>

            <input
              className="price-range"
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={maxPrice}
              onChange={(e) =>
                handlePriceChange(
                  Number(e.target.value)
                )
              }
              aria-label="Maximum product price"
            />

            <div className="price-range-labels">
              <span>{formatINR(1000)}</span>
              <span>{formatINR(50000)}</span>
            </div>
          </div>

          {/* Rating */}

          <div className="filter-group">
            <h4 className="filter-title">
              Minimum Rating
            </h4>

            <div className="filter-options-list">
              {[4.5, 4.0, 3.0, 0].map((rating) => (
                <label
                  key={rating}
                  className="filter-checkbox-label"
                >
                  <input
                    type="radio"
                    name="rating-filter"
                    checked={
                      minRating === rating
                    }
                    onChange={() =>
                      handleRatingChange(rating)
                    }
                  />

                  <span>
                    {rating === 0
                      ? 'All Ratings'
                      : `${rating} Stars & up`}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Stock */}

          <div className="filter-group stock-filter-group">
            <label className="filter-checkbox-label stock-label">

              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) =>
                  handleStockChange(
                    e.target.checked
                  )
                }
              />

              <span>In Stock Only</span>
            </label>
          </div>

        </aside>

        {/* =========================
            PRODUCTS SECTION
        ========================== */}

        <section className="shop-products-section">

          {/* Toolbar */}

          <div className="shop-toolbar">

            <div className="products-count">
              Showing{' '}
              <strong>
                {filteredProducts.length}
              </strong>{' '}
              products

              {selectedCategory !== 'All' &&
                ` in ${selectedCategory}`}
            </div>

            <div className="toolbar-controls">

              {/* Sort */}

              <div className="sort-control">
                <span className="sort-label">
                  Sort by:
                </span>

                <select
                  className="select-input"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  aria-label="Sort products"
                >
                  <option value="recommended">
                    Featured / Recommended
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="rating">
                    Highest Rated
                  </option>

                  <option value="discount">
                    Biggest Savings
                  </option>
                </select>
              </div>

              {/* View Mode */}

              <div
                className="view-mode-controls"
                aria-label="Product view mode"
              >
                <button
                  type="button"
                  className={`icon-btn ${
                    viewMode === 'grid'
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    setViewMode('grid')
                  }
                  title="Grid Layout"
                  aria-label="Grid Layout"
                  aria-pressed={
                    viewMode === 'grid'
                  }
                >
                  <LayoutGrid size={17} />
                </button>

                <button
                  type="button"
                  className={`icon-btn ${
                    viewMode === 'list'
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    setViewMode('list')
                  }
                  title="List Layout"
                  aria-label="List Layout"
                  aria-pressed={
                    viewMode === 'list'
                  }
                >
                  <List size={17} />
                </button>
              </div>

            </div>
          </div>

          {/* No Products */}

          {paginatedProducts.length === 0 ? (

            <div className="no-products">

              <div className="no-products-icon-wrapper">
                <AlertCircle
                  size={48}
                  className="no-products-icon"
                />
              </div>

              <h3>
                No products match your criteria
              </h3>

              <p>
                Try clearing your filters or search
                for something else.
              </p>

              <button
                type="button"
                className="btn btn-primary"
                onClick={resetFilters}
              >
                Clear All Filters
              </button>

            </div>

          ) : viewMode === 'grid' ? (

            /* Grid View */

            <div className="products-grid">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>

          ) : (

            /* List View */

            <div className="products-list">

              {paginatedProducts.map((product) => (
                <article
                  key={product.id}
                  className="product-card-list"
                >

                  <button
                    type="button"
                    className="product-list-image-wrapper"
                    onClick={() =>
                      handleListProductClick(product)
                    }
                    aria-label={`View ${product.name}`}
                  >
                    {product.discount > 0 && (
                      <span className="list-discount-badge">
                        {product.discount}% OFF
                      </span>
                    )}

                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-list-image"
                    />
                  </button>

                  <div className="product-list-content">

                    <span className="card-category">
                      {product.category} •{' '}
                      {product.brand}
                    </span>

                    <h3
                      className="product-list-title"
                      onClick={() =>
                        handleListProductClick(product)
                      }
                    >
                      {product.name}
                    </h3>

                    <p className="product-list-description">
                      {product.description}
                    </p>

                    <div className="product-list-meta">

                      <span className="list-rating">
                        ★ {product.rating}
                      </span>

                      <span className="list-reviews">
                        {product.reviewCount} reviews
                      </span>

                      {product.stock > 0 && (
                        <span className="list-stock">
                          In Stock
                        </span>
                      )}

                    </div>

                    <div className="product-list-bottom">

                      <div className="list-price-wrapper">

                        <span className="current-price list-price">
                          {formatINR(product.price)}
                        </span>

                        {product.originalPrice >
                          product.price && (
                          <span className="list-original-price">
                            {formatINR(
                              product.originalPrice
                            )}
                          </span>
                        )}

                      </div>

                      <div className="list-actions">

                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() =>
                            handleListProductClick(product)
                          }
                        >
                          View Product
                        </button>

                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            setQuickViewProduct(product)
                          }
                        >
                          Quick View
                        </button>

                      </div>

                    </div>

                  </div>

                </article>
              ))}

            </div>
          )}

          {/* Pagination */}

          {totalPages > 1 && (
            <div
              className="pagination"
              aria-label="Product pagination"
            >

              <button
                type="button"
                className="icon-btn pagination-btn"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.max(1, prev - 1)
                  )
                }
                aria-label="Previous page"
              >
                <ArrowLeft size={16} />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((pageNumber) => (
                <button
                  type="button"
                  key={pageNumber}
                  className={`pagination-number ${
                    currentPage === pageNumber
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    setCurrentPage(pageNumber)
                  }
                  aria-label={`Page ${pageNumber}`}
                  aria-current={
                    currentPage === pageNumber
                      ? 'page'
                      : undefined
                  }
                >
                  {pageNumber}
                </button>
              ))}

              <button
                type="button"
                className="icon-btn pagination-btn"
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      totalPages,
                      prev + 1
                    )
                  )
                }
                aria-label="Next page"
              >
                <ArrowRight size={16} />
              </button>

            </div>
          )}

        </section>
      </div>
    </div>
  );
}