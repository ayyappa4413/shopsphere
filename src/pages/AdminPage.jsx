import { useState } from 'react';

import '../styles/admin.css';

import {
  TrendingUp,
  Package,
  Truck,
  DollarSign,
  LayoutGrid,
  Users,
  Plus,
  Edit,
  Trash2,
  BarChart3,
} from 'lucide-react';

import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/formatters';
import ProductEditModal from '../components/modals/ProductEditModal';

export default function AdminPage() {

  const {
    products,
    setProducts,

    allOrders,
    updateOrderStatus,

    addToast,
    user,
  } = useApp();

  const [adminTab, setAdminTab] =
    useState('dashboard');

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [
    isProductModalOpen,
    setIsProductModalOpen,
  ] = useState(false);

  // ======================================================
  // ADMIN ACCESS
  // ======================================================

  const isAdmin =
    user?.role === 'admin';

  // ======================================================
  // Dashboard Calculations
  // ======================================================

  const totalRevenue =
    allOrders.reduce(
      (acc, order) =>
        acc +
        Number(order.total || 0),
      0
    );

  const totalOrdersCount =
    allOrders.length;

  const totalProductsCount =
    products.length;

  /*
    This remains a catalogue-level demo metric
    because there is currently no global users
    collection in your application.
  */
  const registeredUsers = 1842;

  const weeklySales = [
    { day: 'Mon', val: 45 },
    { day: 'Tue', val: 78 },
    { day: 'Wed', val: 62 },
    { day: 'Thu', val: 110 },
    { day: 'Fri', val: 95 },
    { day: 'Sat', val: 140 },
    { day: 'Sun', val: 165 },
  ];

  // ======================================================
  // Product CRUD
  // ======================================================

  const handleDeleteProduct = (id) => {

    if (!isAdmin) {

      addToast(
        'You do not have permission to delete products.',
        'info'
      );

      return;
    }

    setProducts((prev) =>
      prev.filter(
        (product) =>
          product.id !== id
      )
    );

    addToast(
      'Product removed from inventory.',
      'info'
    );
  };

  // ======================================================
  // Save Product
  // ======================================================

  const handleSaveProduct = (product) => {

    if (!isAdmin) {

      addToast(
        'You do not have permission to manage products.',
        'info'
      );

      return;
    }

    if (product.id) {

      setProducts((prev) =>
        prev.map(
          (item) =>
            item.id === product.id
              ? product
              : item
        )
      );

      addToast(
        `Updated product "${product.name}"`
      );

    } else {

      const newProduct = {
        ...product,
        id: Date.now(),
        reviewCount: 0,
        rating: 5.0,
      };

      setProducts((prev) => [
        newProduct,
        ...prev,
      ]);

      addToast(
        `Created product "${newProduct.name}"`
      );
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  // ======================================================
  // Create Product
  // ======================================================

  const openCreateProductModal = () => {

    if (!isAdmin) {

      addToast(
        'You do not have permission to add products.',
        'info'
      );

      return;
    }

    setEditingProduct({

      name: '',
      category: 'Electronics',
      brand: '',
      price: 999,
      originalPrice: 1299,
      discount: 10,
      stock: 20,
      description: '',

      image:
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',

      colors: ['Black'],

      sizes: [],

    });

    setIsProductModalOpen(true);
  };

  // ======================================================
  // Edit Product
  // ======================================================

  const openEditProductModal = (
    product
  ) => {

    if (!isAdmin) {

      addToast(
        'You do not have permission to edit products.',
        'info'
      );

      return;
    }

    setEditingProduct({
      ...product,
    });

    setIsProductModalOpen(true);
  };

  // ======================================================
  // Close Product Modal
  // ======================================================

  const closeProductModal = () => {

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  // ======================================================
  // Update Order Status
  // ======================================================

  const handleUpdateOrderStatus = (
    orderId,
    newStatus
  ) => {

    if (!isAdmin) {

      addToast(
        'You do not have permission to update orders.',
        'info'
      );

      return;
    }

    updateOrderStatus(
      orderId,
      newStatus
    );

    addToast(
      `Order ${orderId} marked as ${newStatus}`
    );
  };

  // ======================================================
  // ACCESS PROTECTION
  // ======================================================

  if (!isAdmin) {

    return (
      <div className="admin-layout">

        <main className="admin-content">

          <section className="admin-section">

            <div className="admin-page-header">

              <div>

                <span className="admin-eyebrow">
                  ACCESS RESTRICTED
                </span>

                <h1>
                  Admin Access Required
                </h1>

                <p>
                  You do not have permission to
                  access the ShopSphere Admin Panel.
                </p>

              </div>

            </div>

            <div className="admin-summary-card">

              <div className="summary-icon">
                <Package size={20} />
              </div>

              <div>

                <strong>
                  Administrator Account Required
                </strong>

                <p>
                  Please sign in with an administrator
                  account to manage products and orders.
                </p>

              </div>

            </div>

          </section>

        </main>

      </div>
    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="admin-layout">

      {/* ==================================================
          Sidebar
      ================================================== */}

      <aside className="admin-sidebar">

        <div className="admin-sidebar-header">

          <div className="admin-sidebar-logo">
            S
          </div>

          <div>

            <strong>
              ShopSphere
            </strong>

            <span>
              Admin Panel
            </span>

          </div>

        </div>

        <div className="admin-nav-label">
          MANAGEMENT
        </div>

        <nav className="admin-navigation">

          <button
            type="button"
            className={`admin-nav-item ${
              adminTab === 'dashboard'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setAdminTab('dashboard')
            }
          >
            <TrendingUp size={18} />
            <span>
              Dashboard
            </span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${
              adminTab === 'products'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setAdminTab('products')
            }
          >
            <Package size={18} />
            <span>
              Products CRUD
            </span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${
              adminTab === 'orders'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setAdminTab('orders')
            }
          >
            <Truck size={18} />
            <span>
              Orders Manager
            </span>
          </button>

        </nav>

        <div className="admin-sidebar-footer">

          <div className="admin-status-dot" />

          <span>
            Store system online
          </span>

        </div>

      </aside>

      {/* ==================================================
          Main Content
      ================================================== */}

      <main className="admin-content">

        {/* ==================================================
            Dashboard
        ================================================== */}

        {adminTab === 'dashboard' && (

          <section className="admin-section">

            <div className="admin-page-header">

              <div>

                <span className="admin-eyebrow">
                  STORE OVERVIEW
                </span>

                <h1>
                  Executive Dashboard
                </h1>

                <p>
                  Monitor ShopSphere performance,
                  orders and catalogue activity.
                </p>

              </div>

              <div className="admin-header-date">

                <BarChart3 size={17} />

                <span>
                  Sales Overview
                </span>

              </div>

            </div>

            {/* ==================================================
                Statistics
            ================================================== */}

            <div className="admin-stats-grid">

              <div className="stat-box">

                <div className="stat-content">

                  <span className="stat-label">
                    Total Revenue
                  </span>

                  <strong className="stat-value">
                    {formatINR(
                      totalRevenue
                    )}
                  </strong>

                  <span className="stat-description">
                    From all recorded orders
                  </span>

                </div>

                <div className="stat-icon">
                  <DollarSign size={22} />
                </div>

              </div>

              <div className="stat-box">

                <div className="stat-content">

                  <span className="stat-label">
                    Orders Fulfilled
                  </span>

                  <strong className="stat-value">
                    {totalOrdersCount}
                  </strong>

                  <span className="stat-description">
                    Total store orders
                  </span>

                </div>

                <div className="stat-icon">
                  <Package size={22} />
                </div>

              </div>

              <div className="stat-box">

                <div className="stat-content">

                  <span className="stat-label">
                    Catalogue Items
                  </span>

                  <strong className="stat-value">
                    {totalProductsCount}
                  </strong>

                  <span className="stat-description">
                    Active products
                  </span>

                </div>

                <div className="stat-icon">
                  <LayoutGrid size={22} />
                </div>

              </div>

              <div className="stat-box">

                <div className="stat-content">

                  <span className="stat-label">
                    Registered Users
                  </span>

                  <strong className="stat-value">
                    {registeredUsers.toLocaleString()}
                  </strong>

                  <span className="stat-description">
                    Store accounts
                  </span>

                </div>

                <div className="stat-icon">
                  <Users size={22} />
                </div>

              </div>

            </div>

            {/* ==================================================
                Sales Chart
            ================================================== */}

            <div className="admin-chart-card">

              <div className="admin-card-header">

                <div>

                  <span className="admin-card-eyebrow">
                    PERFORMANCE
                  </span>

                  <h2>
                    Weekly Sales Performance
                  </h2>

                </div>

                <div className="chart-unit">
                  ₹ Thousands
                </div>

              </div>

              <div className="sales-chart">

                <div className="chart-grid-lines">

                  <span />
                  <span />
                  <span />
                  <span />

                </div>

                <div className="sales-bars">

                  {weeklySales.map(
                    (bar) => (

                      <div
                        className="sales-bar-column"
                        key={bar.day}
                      >

                        <div className="sales-value">
                          ₹{bar.val}k
                        </div>

                        <div className="sales-bar-track">

                          <div
                            className="sales-bar"
                            style={{
                              height:
                                `${(
                                  bar.val /
                                  180
                                ) * 100}%`,
                            }}
                          />

                        </div>

                        <span className="sales-day">
                          {bar.day}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </div>

            </div>

            <div className="admin-summary-card">

              <div className="summary-icon">
                <TrendingUp size={20} />
              </div>

              <div>

                <strong>
                  ShopSphere Store Overview
                </strong>

                <p>
                  Your catalogue currently contains{' '}
                  <strong>
                    {totalProductsCount}
                  </strong>{' '}
                  products with{' '}
                  <strong>
                    {totalOrdersCount}
                  </strong>{' '}
                  recorded orders.
                </p>

              </div>

            </div>

          </section>
        )}

        {/* ==================================================
            Products
        ================================================== */}

        {adminTab === 'products' && (

          <section className="admin-section">

            <div className="admin-page-header products-header">

              <div>

                <span className="admin-eyebrow">
                  INVENTORY
                </span>

                <h1>
                  Manage Catalogue
                </h1>

                <p>
                  Add, edit and manage your
                  ShopSphere products.
                </p>

              </div>

              <button
                type="button"
                className="admin-primary-btn"
                onClick={
                  openCreateProductModal
                }
              >
                <Plus size={18} />
                Add Product
              </button>

            </div>

            <div className="catalogue-summary">

              <div className="catalogue-summary-icon">
                <Package size={19} />
              </div>

              <div>

                <strong>
                  {products.length} Products
                </strong>

                <span>
                  Currently available in catalogue
                </span>

              </div>

            </div>

            <div className="admin-table-container table-responsive">

              <table className="admin-table">

                <thead>

                  <tr>

                    <th>
                      Product
                    </th>

                    <th>
                      Category
                    </th>

                    <th>
                      Price
                    </th>

                    <th>
                      Stock
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {products.length > 0 ? (

                    products.map(
                      (product) => (

                        <tr
                          key={product.id}
                        >

                          <td>

                            <div className="admin-product-cell">

                              <img
                                src={product.image}
                                alt={product.name}
                              />

                              <div>

                                <strong>
                                  {product.name}
                                </strong>

                                <span>
                                  {product.brand}
                                </span>

                              </div>

                            </div>

                          </td>

                          <td>

                            <span className="category-tag">
                              {product.category}
                            </span>

                          </td>

                          <td>

                            <strong className="table-price">
                              {formatINR(
                                product.price
                              )}
                            </strong>

                          </td>

                          <td>

                            <span
                              className={`stock-badge ${
                                product.stock <= 10
                                  ? 'low-stock'
                                  : ''
                              }`}
                            >
                              {product.stock} units
                            </span>

                          </td>

                          <td>

                            <div className="table-actions">

                              <button
                                type="button"
                                className="admin-icon-btn"
                                onClick={() =>
                                  openEditProductModal(
                                    product
                                  )
                                }
                                title="Edit product"
                                aria-label={`Edit ${product.name}`}
                              >
                                <Edit size={16} />
                              </button>

                              <button
                                type="button"
                                className="admin-icon-btn delete"
                                onClick={() =>
                                  handleDeleteProduct(
                                    product.id
                                  )
                                }
                                title="Delete product"
                                aria-label={`Delete ${product.name}`}
                              >
                                <Trash2 size={16} />
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="5"
                        className="empty-table"
                      >

                        <Package size={30} />

                        <strong>
                          No products found
                        </strong>

                        <span>
                          Add a product to your
                          catalogue.
                        </span>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </section>
        )}

        {/* ==================================================
            Orders Manager
        ================================================== */}

        {adminTab === 'orders' && (

          <section className="admin-section">

            <div className="admin-page-header">

              <div>

                <span className="admin-eyebrow">
                  ORDER MANAGEMENT
                </span>

                <h1>
                  Store Orders Processing
                </h1>

                <p>
                  Review customer orders and
                  update their delivery status.
                </p>

              </div>

              <div className="orders-count-badge">

                <Truck size={17} />

                {allOrders.length} Orders

              </div>

            </div>

            <div className="admin-table-container table-responsive">

              <table className="admin-table orders-table">

                <thead>

                  <tr>

                    <th>
                      Order ID
                    </th>

                    <th>
                      Customer
                    </th>

                    <th>
                      Items
                    </th>

                    <th>
                      Total
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Update Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {allOrders.length > 0 ? (

                    allOrders.map(
                      (order) => {

                        const customer =
                          order.customer ||
                          {};

                        const customerName =
                          customer.name ||
                          'Unknown Customer';

                        const customerEmail =
                          customer.email ||
                          'No email';

                        const items =
                          Array.isArray(
                            order.items
                          )
                            ? order.items
                            : [];

                        const status =
                          order.status ||
                          'Processing';

                        return (

                          <tr
                            key={order.id}
                          >

                            {/* ORDER ID */}

                            <td>

                              <strong className="order-id">
                                {order.id}
                              </strong>

                              {order.date && (
                                <span
                                  style={{
                                    display:
                                      'block',
                                    fontSize:
                                      '0.72rem',
                                    marginTop:
                                      '4px',
                                    opacity:
                                      0.65,
                                  }}
                                >
                                  {order.date}
                                </span>
                              )}

                            </td>

                            {/* CUSTOMER */}

                            <td>

                              <div className="customer-cell">

                                <div className="customer-avatar">

                                  {customerName
                                    .charAt(0)
                                    .toUpperCase()}

                                </div>

                                <div>

                                  <strong>
                                    {customerName}
                                  </strong>

                                  <span>
                                    {customerEmail}
                                  </span>

                                  {customer.phone && (
                                    <span>
                                      {customer.phone}
                                    </span>
                                  )}

                                </div>

                              </div>

                            </td>

                            {/* ITEMS */}

                            <td>

                              <span className="items-count">

                                {items.length}{' '}

                                {items.length === 1
                                  ? 'item'
                                  : 'items'}

                              </span>

                            </td>

                            {/* TOTAL */}

                            <td>

                              <strong className="table-price">

                                {formatINR(
                                  Number(
                                    order.total ||
                                    0
                                  )
                                )}

                              </strong>

                            </td>

                            {/* STATUS */}

                            <td>

                              <span
                                className={`status-pill status-${String(
                                  status
                                )
                                  .toLowerCase()
                                  .replace(
                                    /\s+/g,
                                    '-'
                                  )}`}
                              >
                                {status}
                              </span>

                            </td>

                            {/* UPDATE STATUS */}

                            <td>

                              <select
                                className="select-input"
                                value={status}
                                onChange={(e) =>
                                  handleUpdateOrderStatus(
                                    order.id,
                                    e.target.value
                                  )
                                }
                                aria-label={`Update status for ${order.id}`}
                              >

                                <option value="Processing">
                                  Processing
                                </option>

                                <option value="Confirmed">
                                  Confirmed
                                </option>

                                <option value="Shipped">
                                  Shipped
                                </option>

                                <option value="Out for Delivery">
                                  Out for Delivery
                                </option>

                                <option value="Delivered">
                                  Delivered
                                </option>

                                <option value="Cancelled">
                                  Cancelled
                                </option>

                              </select>

                            </td>

                          </tr>

                        );
                      }
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="empty-table"
                      >

                        <Truck size={30} />

                        <strong>
                          No orders found
                        </strong>

                        <span>
                          Customer orders will
                          appear here after a
                          customer places an order.
                        </span>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </section>
        )}

      </main>

      {/* ==================================================
          Product Modal
      ================================================== */}

      {isProductModalOpen &&
        editingProduct &&
        isAdmin && (

          <ProductEditModal
            product={editingProduct}
            setProduct={setEditingProduct}
            onSave={handleSaveProduct}
            onClose={closeProductModal}
          />

        )}

    </div>
  );
}