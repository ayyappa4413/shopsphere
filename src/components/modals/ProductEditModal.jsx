import {
  X,
  Package,
  Save,
  Image as ImageIcon,
  FileText,
  Tag,
  IndianRupee,
  Boxes,
  Layers3,
} from 'lucide-react';

import { CATEGORIES } from '../../data/coupons';
import { useApp } from '../../context/AppContext';

export default function ProductEditModal({
  product,
  setProduct,
  onSave,
  onClose,
}) {
  const { user, addToast } = useApp();

  const isAdmin = user?.role === 'admin';

  // ======================================================
  // SECURITY CHECK
  // ======================================================

  if (!isAdmin) {
    return null;
  }

  // ======================================================
  // FORM HANDLERS
  // ======================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAdmin) {
      addToast(
        'You do not have permission to manage products.',
        'info'
      );

      return;
    }

    onSave(product);
  };

  const handleChange = (field, value) => {
    if (!isAdmin) {
      return;
    }

    setProduct({
      ...product,
      [field]: value,
    });
  };

  const isEditing = Boolean(product?.id);

  return (
    <div
      className="modal-overlay product-edit-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content product-edit-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="product-modal-header">

          <div className="product-modal-heading">

            <div className="product-modal-icon">
              <Package size={21} />
            </div>

            <div>

              <span className="product-modal-eyebrow">
                PRODUCT MANAGEMENT
              </span>

              <h2>
                {isEditing
                  ? 'Edit Product'
                  : 'Add New Product'}
              </h2>

              <p>
                {isEditing
                  ? 'Update your product information and inventory details.'
                  : 'Create a new product for your ShopSphere catalogue.'}
              </p>

            </div>

          </div>

          <button
            type="button"
            className="product-modal-close"
            onClick={onClose}
            aria-label="Close product modal"
            title="Close"
          >
            <X size={20} />
          </button>

        </div>

        {/* ==================================================
            FORM
        ================================================== */}

        <form
          className="product-edit-form"
          onSubmit={handleSubmit}
        >

          {/* ==================================================
              BASIC INFORMATION
          ================================================== */}

          <div className="product-form-section">

            <div className="product-form-section-header">

              <div className="product-section-icon">
                <Tag size={17} />
              </div>

              <div>
                <h3>Basic Information</h3>

                <p>
                  Add the core details of your product.
                </p>
              </div>

            </div>

            <div className="product-form-grid">

              {/* Product Name */}

              <div className="product-form-group full">

                <label htmlFor="productName">
                  Product Name
                  <span>*</span>
                </label>

                <div className="product-input-wrapper">

                  <Package size={17} />

                  <input
                    id="productName"
                    type="text"
                    value={product?.name || ''}
                    onChange={(e) =>
                      handleChange(
                        'name',
                        e.target.value
                      )
                    }
                    placeholder="e.g. Apple AirPods Pro"
                    required
                  />

                </div>

              </div>

              {/* Category */}

              <div className="product-form-group">

                <label htmlFor="productCategory">
                  Category
                  <span>*</span>
                </label>

                <div className="product-input-wrapper">

                  <Layers3 size={17} />

                  <select
                    id="productCategory"
                    value={product?.category || ''}
                    onChange={(e) =>
                      handleChange(
                        'category',
                        e.target.value
                      )
                    }
                    required
                  >

                    <option value="">
                      Select category
                    </option>

                    {CATEGORIES.map((category) => {

                      const value =
                        typeof category === 'string'
                          ? category
                          : category.value ||
                            category.name ||
                            category.id;

                      const label =
                        typeof category === 'string'
                          ? category
                          : category.label ||
                            category.name ||
                            category.value;

                      return (
                        <option
                          key={value}
                          value={value}
                        >
                          {label}
                        </option>
                      );
                    })}

                  </select>

                </div>

              </div>

              {/* Brand */}

              <div className="product-form-group">

                <label htmlFor="productBrand">
                  Brand
                  <span>*</span>
                </label>

                <div className="product-input-wrapper">

                  <Tag size={17} />

                  <input
                    id="productBrand"
                    type="text"
                    value={product?.brand || ''}
                    onChange={(e) =>
                      handleChange(
                        'brand',
                        e.target.value
                      )
                    }
                    placeholder="e.g. Apple"
                    required
                  />

                </div>

              </div>

            </div>

          </div>

          {/* ==================================================
              PRICING & INVENTORY
          ================================================== */}

          <div className="product-form-section">

            <div className="product-form-section-header">

              <div className="product-section-icon">
                <IndianRupee size={17} />
              </div>

              <div>

                <h3>Pricing & Inventory</h3>

                <p>
                  Set the selling price and available stock.
                </p>

              </div>

            </div>

            <div className="product-form-grid">

              {/* Price */}

              <div className="product-form-group">

                <label htmlFor="productPrice">
                  Selling Price
                  <span>*</span>
                </label>

                <div className="product-input-wrapper">

                  <IndianRupee size={17} />

                  <input
                    id="productPrice"
                    type="number"
                    min="0"
                    value={product?.price ?? ''}
                    onChange={(e) =>
                      handleChange(
                        'price',
                        Number(e.target.value)
                      )
                    }
                    placeholder="24999"
                    required
                  />

                </div>

              </div>

              {/* Stock */}

              <div className="product-form-group">

                <label htmlFor="productStock">
                  Stock Count
                  <span>*</span>
                </label>

                <div className="product-input-wrapper">

                  <Boxes size={17} />

                  <input
                    id="productStock"
                    type="number"
                    min="0"
                    value={product?.stock ?? ''}
                    onChange={(e) =>
                      handleChange(
                        'stock',
                        Number(e.target.value)
                      )
                    }
                    placeholder="100"
                    required
                  />

                </div>

              </div>

            </div>

          </div>

          {/* ==================================================
              PRODUCT MEDIA
          ================================================== */}

          <div className="product-form-section">

            <div className="product-form-section-header">

              <div className="product-section-icon">
                <ImageIcon size={17} />
              </div>

              <div>

                <h3>Product Media</h3>

                <p>
                  Add a product image using a public image URL.
                </p>

              </div>

            </div>

            <div className="product-form-group">

              <label htmlFor="productImage">
                Product Image URL
                <span>*</span>
              </label>

              <div className="product-input-wrapper">

                <ImageIcon size={17} />

                <input
                  id="productImage"
                  type="url"
                  value={product?.image || ''}
                  onChange={(e) =>
                    handleChange(
                      'image',
                      e.target.value
                    )
                  }
                  placeholder="https://images.unsplash.com/..."
                  required
                />

              </div>

            </div>

            {/* Image Preview */}

            {product?.image && (
              <div className="product-image-preview">

                <div className="product-image-preview-label">
                  <span>Image Preview</span>
                </div>

                <div className="product-preview-box">

                  <img
                    src={product.image}
                    alt={
                      product.name ||
                      'Product preview'
                    }
                    onError={(e) => {
                      e.currentTarget.style.display =
                        'none';
                    }}
                  />

                </div>

              </div>
            )}

          </div>

          {/* ==================================================
              DESCRIPTION
          ================================================== */}

          <div className="product-form-section">

            <div className="product-form-section-header">

              <div className="product-section-icon">
                <FileText size={17} />
              </div>

              <div>

                <h3>Product Description</h3>

                <p>
                  Provide a short description for customers.
                </p>

              </div>

            </div>

            <div className="product-form-group">

              <label htmlFor="productDescription">
                Short Description
              </label>

              <div className="product-textarea-wrapper">

                <textarea
                  id="productDescription"
                  rows="4"
                  value={
                    product?.description || ''
                  }
                  onChange={(e) =>
                    handleChange(
                      'description',
                      e.target.value
                    )
                  }
                  placeholder="Describe the product, key features, or important details..."
                />

              </div>

            </div>

          </div>

          {/* ==================================================
              ACTIONS
          ================================================== */}

          <div className="product-modal-actions">

            <button
              type="button"
              className="product-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="product-save-btn"
            >
              <Save size={17} />

              {isEditing
                ? 'Update Product'
                : 'Add Product'}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}