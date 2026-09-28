// import React, { useState, useMemo } from 'react';
// import '../styles/product-detail.css';
// import { ChevronRight, Star, Minus, Plus, ShoppingCart, Heart } from 'lucide-react';
// import { useApp } from '../context/AppContext';
// import { formatINR } from '../utils/formatters';
// import ProductCard from '../components/common/ProductCard';

// export default function ProductDetailPage({ productId }) {
//   const { products, addToCart, toggleWishlist, wishlist, navigate } = useApp();
//   const product = products.find(p => p.id === Number(productId)) || products[0];

//   const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
//   const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
//   const [qty, setQty] = useState(1);
//   const [activeTab, setActiveTab] = useState("specs");

//   const isWishlisted = wishlist.some(item => item.id === product.id);

//   const related = useMemo(() => {
//     return products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
//   }, [products, product]);

//   return (
//     <div className="container" style={{ padding: '2rem 1.25rem 4rem' }}>
//       <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
//         <span style={{ cursor: 'pointer' }} onClick={() => navigate('home')}>Home</span>
//         <ChevronRight size={14} />
//         <span style={{ cursor: 'pointer' }} onClick={() => navigate('shop', { category: product.category })}>{product.category}</span>
//         <ChevronRight size={14} />
//         <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{product.name}</span>
//       </div>

//       <div className="product-detail-grid">
//         <div className="product-gallery">
//           <div className="gallery-main">
//             <img src={product.image} alt={product.name} />
//           </div>
//           <div className="gallery-thumbs">
//             <div className="thumb-btn active">
//               <img src={product.image} alt={product.name} />
//             </div>
//           </div>
//         </div>

//         <div>
//           <div className="detail-brand">{product.brand}</div>
//           <h1 className="detail-title">{product.name}</h1>

//           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: '#fef3c7', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
//               <Star size={15} fill="#d97706" color="#d97706" />
//               <strong style={{ fontSize: '0.85rem', color: '#92400e' }}>{product.rating}</strong>
//             </div>
//             <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{product.reviewCount} customer reviews</span>
//             <span style={{ fontSize: '0.85rem', color: product.stock > 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 700 }}>
//               {product.stock > 0 ? `In Stock (${product.stock} units)` : "Out of stock"}
//             </span>
//           </div>

//           <div className="detail-price-box">
//             <span className="detail-current-price">{formatINR(product.price)}</span>
//             {product.originalPrice > product.price && (
//               <span className="original-price" style={{ fontSize: '1.25rem' }}>{formatINR(product.originalPrice)}</span>
//             )}
//             {product.discount > 0 && (
//               <span className="detail-discount-tag">{product.discount}% OFF</span>
//             )}
//           </div>

//           <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
//             {product.description}
//           </p>

//           {product.colors && product.colors.length > 0 && (
//             <div className="option-selector">
//               <span className="option-label">Select Finish / Color: {selectedColor}</span>
//               <div className="chips-group">
//                 {product.colors.map(col => (
//                   <button 
//                     key={col} 
//                     className={`chip ${selectedColor === col ? 'active' : ''}`}
//                     onClick={() => setSelectedColor(col)}
//                   >
//                     {col}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {product.sizes && product.sizes.length > 0 && (
//             <div className="option-selector">
//               <span className="option-label">Select Size / Fit: {selectedSize}</span>
//               <div className="chips-group">
//                 {product.sizes.map(sz => (
//                   <button 
//                     key={sz} 
//                     className={`chip ${selectedSize === sz ? 'active' : ''}`}
//                     onClick={() => setSelectedSize(sz)}
//                   >
//                     {sz}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div style={{ margin: '1.5rem 0' }}>
//             <span className="option-label">Quantity</span>
//             <div className="qty-counter">
//               <button className="qty-btn" onClick={() => setQty(prev => Math.max(1, prev - 1))}><Minus size={15} /></button>
//               <span className="qty-value">{qty}</span>
//               <button className="qty-btn" onClick={() => setQty(prev => Math.min(product.stock, prev + 1))}><Plus size={15} /></button>
//             </div>
//           </div>

//           <div className="detail-actions">
//             <button 
//               className="btn btn-primary btn-lg" 
//               style={{ flex: 1 }}
//               onClick={() => addToCart(product, qty, { selectedColor, selectedSize })}
//             >
//               <ShoppingCart size={18} /> Add to Cart
//             </button>
//             <button 
//               className={`icon-btn ${isWishlisted ? 'active' : ''}`} 
//               style={{ width: '3.25rem', height: '3.25rem' }}
//               onClick={() => toggleWishlist(product)}
//               title="Save to Wishlist"
//             >
//               <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
//             </button>
//           </div>
//         </div>
//       </div>

//       <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
//         <div className="product-detail-tabs">
//           <button
//             type="button"
//             className={`product-detail-tab ${
//               activeTab === 'specs' ? 'active' : ''
//             }`}
//             onClick={() => setActiveTab('specs')}
//           >
//             Technical Specifications
//           </button>

//           <button
//             type="button"
//             className={`product-detail-tab ${
//               activeTab === 'reviews' ? 'active' : ''
//             }`}
//             onClick={() => setActiveTab('reviews')}
//           >
//             Verified Customer Reviews ({product.reviewCount})
//           </button>
//         </div>

//         <div style={{ padding: '2rem 0' }}>
//           {activeTab === 'specs' ? (
//             <div style={{ maxWidth: '600px' }}>
//               {product.specs ? (
//                 Object.entries(product.specs).map(([key, val]) => (
//                   <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)' }}>
//                     <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{key}</span>
//                     <span style={{ fontWeight: 600 }}>{val}</span>
//                   </div>
//                 ))
//               ) : (
//                 <p>Standard official manufacturer warranty and specifications apply.</p>
//               )}
//             </div>
//           ) : (
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
//               <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
//                   <strong>Rohit Mehra</strong>
//                   <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Purchase • 3 days ago</span>
//                 </div>
//                 <div style={{ color: '#f59e0b', display: 'flex', gap: '2px', marginBottom: '0.5rem' }}>
//                   <Star size={14} fill="#f59e0b" /><Star size={14} fill="#f59e0b" /><Star size={14} fill="#f59e0b" /><Star size={14} fill="#f59e0b" /><Star size={14} fill="#f59e0b" />
//                 </div>
//                 <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Outstanding build quality! Delivery was prompt, packed neatly, and sounds better than expected.</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {related.length > 0 && (
//         <div style={{ marginTop: '4rem' }}>
//           <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>You May Also Like</h2>
//           <div className="products-grid">
//             {related.map(p => (
//               <ProductCard key={p.id} product={p} onQuickView={() => {}} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useMemo } from 'react';
import '../styles/product-detail.css';

import {
  ChevronRight,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
} from 'lucide-react';

import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/formatters';
import ProductCard from '../components/common/ProductCard';

export default function ProductDetailPage({ productId }) {
  const {
    products,
    addToCart,
    toggleWishlist,
    wishlist,
    navigate,
  } = useApp();

  const product =
    products.find((p) => p.id === Number(productId)) ||
    products[0];

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || ''
  );

  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0] || ''
  );

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const related = useMemo(() => {
    return products
      .filter(
        (p) =>
          p.category === product.category &&
          p.id !== product.id
      )
      .slice(0, 4);
  }, [products, product]);

  return (
    <div className="container product-detail-page">
      {/* Breadcrumb */}
      <div className="product-breadcrumb">
        <button
          type="button"
          className="breadcrumb-link"
          onClick={() => navigate('home')}
        >
          Home
        </button>

        <ChevronRight size={14} />

        <button
          type="button"
          className="breadcrumb-link"
          onClick={() =>
            navigate('shop', {
              category: product.category,
            })
          }
        >
          {product.category}
        </button>

        <ChevronRight size={14} />

        <span className="breadcrumb-current">
          {product.name}
        </span>
      </div>

      {/* Product Detail */}
      <div className="product-detail-grid">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="gallery-main">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>

          <div className="gallery-thumbs">
            <div className="thumb-btn active">
              <img
                src={product.image}
                alt={product.name}
              />
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="product-information">
          <div className="detail-brand">
            {product.brand}
          </div>

          <h1 className="detail-title">
            {product.name}
          </h1>

          {/* Rating / Reviews / Stock */}
          <div className="product-meta-row">
            <div className="product-rating-box">
              <Star
                size={15}
                fill="currentColor"
              />

              <strong>
                {product.rating}
              </strong>
            </div>

            <span className="review-count-text">
              {product.reviewCount} customer reviews
            </span>

            <span
              className={`stock-status ${
                product.stock > 0
                  ? 'in-stock'
                  : 'out-of-stock'
              }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock} units)`
                : 'Out of stock'}
            </span>
          </div>

          {/* Price */}
          <div className="detail-price-box">
            <span className="detail-current-price">
              {formatINR(product.price)}
            </span>

            {product.originalPrice >
              product.price && (
              <span className="original-price">
                {formatINR(product.originalPrice)}
              </span>
            )}

            {product.discount > 0 && (
              <span className="detail-discount-tag">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Description */}
          <p className="detail-description">
            {product.description}
          </p>

          {/* Colors */}
          {product.colors &&
            product.colors.length > 0 && (
              <div className="option-selector">
                <span className="option-label">
                  Select Finish / Color:{' '}
                  <strong>{selectedColor}</strong>
                </span>

                <div className="chips-group">
                  {product.colors.map((color) => (
                    <button
                      type="button"
                      key={color}
                      className={`chip ${
                        selectedColor === color
                          ? 'active'
                          : ''
                      }`}
                      onClick={() =>
                        setSelectedColor(color)
                      }
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* Sizes */}
          {product.sizes &&
            product.sizes.length > 0 && (
              <div className="option-selector">
                <span className="option-label">
                  Select Size / Fit:{' '}
                  <strong>{selectedSize}</strong>
                </span>

                <div className="chips-group">
                  {product.sizes.map((size) => (
                    <button
                      type="button"
                      key={size}
                      className={`chip ${
                        selectedSize === size
                          ? 'active'
                          : ''
                      }`}
                      onClick={() =>
                        setSelectedSize(size)
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* Quantity */}
          <div className="quantity-section">
            <span className="option-label">
              Quantity
            </span>

            <div className="qty-counter">
              <button
                type="button"
                className="qty-btn"
                onClick={() =>
                  setQty((prev) =>
                    Math.max(1, prev - 1)
                  )
                }
                disabled={qty <= 1}
                aria-label="Decrease quantity"
              >
                <Minus size={15} />
              </button>

              <span className="qty-value">
                {qty}
              </span>

              <button
                type="button"
                className="qty-btn"
                onClick={() =>
                  setQty((prev) =>
                    Math.min(
                      product.stock,
                      prev + 1
                    )
                  )
                }
                disabled={qty >= product.stock}
                aria-label="Increase quantity"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="detail-actions">
            <button
              type="button"
              className="btn btn-primary btn-lg detail-cart-btn"
              onClick={() =>
                addToCart(product, qty, {
                  selectedColor,
                  selectedSize,
                })
              }
              disabled={product.stock <= 0}
            >
              <ShoppingCart size={18} />
              {product.stock > 0
                ? 'Add to Cart'
                : 'Out of Stock'}
            </button>

            <button
              type="button"
              className={`icon-btn detail-wishlist-btn ${
                isWishlisted ? 'active' : ''
              }`}
              onClick={() =>
                toggleWishlist(product)
              }
              title="Save to Wishlist"
              aria-label="Save to Wishlist"
            >
              <Heart
                size={20}
                fill={
                  isWishlisted
                    ? 'currentColor'
                    : 'none'
                }
              />
            </button>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <section className="product-information-section">
        {/* Tabs */}
        <div className="product-detail-tabs">
          <button
            type="button"
            className={`product-detail-tab ${
              activeTab === 'specs'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setActiveTab('specs')
            }
          >
            Technical Specifications
          </button>

          <button
            type="button"
            className={`product-detail-tab ${
              activeTab === 'reviews'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setActiveTab('reviews')
            }
          >
            Verified Customer Reviews (
            {product.reviewCount})
          </button>
        </div>

        {/* Tab Content */}
        <div className="product-tab-content">
          {activeTab === 'specs' ? (
            <div className="specifications-list">
              {product.specs ? (
                Object.entries(
                  product.specs
                ).map(([key, value]) => (
                  <div
                    key={key}
                    className="specification-row"
                  >
                    <span className="specification-key">
                      {key}
                    </span>

                    <span className="specification-value">
                      {value}
                    </span>
                  </div>
                ))
              ) : (
                <p className="specifications-fallback">
                  Standard official manufacturer
                  warranty and specifications
                  apply.
                </p>
              )}
            </div>
          ) : (
            <div className="review-list">
              <article className="review-card">
                <div className="review-header">
                  <strong className="review-name">
                    Rohit Mehra
                  </strong>

                  <span className="review-meta">
                    Verified Purchase • 3 days ago
                  </span>
                </div>

                <div
                  className="review-stars"
                  aria-label="5 star review"
                >
                  <Star
                    size={14}
                    fill="currentColor"
                  />
                  <Star
                    size={14}
                    fill="currentColor"
                  />
                  <Star
                    size={14}
                    fill="currentColor"
                  />
                  <Star
                    size={14}
                    fill="currentColor"
                  />
                  <Star
                    size={14}
                    fill="currentColor"
                  />
                </div>

                <p className="review-text">
                  Outstanding build quality!
                  Delivery was prompt, packed
                  neatly, and sounds better than
                  expected.
                </p>
              </article>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="related-products">
          <h2 className="related-products-title">
            You May Also Like
          </h2>

          <div className="products-grid">
            {related.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onQuickView={() => {}}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}