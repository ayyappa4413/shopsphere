// src/pages/OrdersPage.jsx

import React, { useEffect, useState } from 'react';
import '../styles/orders.css';

import {
  Check,
  Package,
  MapPin,
  CreditCard,
  Truck,
  ShoppingBag,
} from 'lucide-react';

import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/formatters';

export default function OrdersPage() {
  const { orders, navigate } = useApp();

  const [selectedOrder, setSelectedOrder] = useState(
    orders[0] || null
  );

  // ======================================================
  // Keep selected order synchronized with orders
  // ======================================================

  useEffect(() => {
    if (!orders || orders.length === 0) {
      setSelectedOrder(null);
      return;
    }

    const currentOrderExists = orders.some(
      (order) => order.id === selectedOrder?.id
    );

    if (currentOrderExists) {
      return;
    }

    // Select the newest order
    setSelectedOrder(orders[0]);
  }, [orders, selectedOrder?.id]);

  // ======================================================
  // EMPTY ORDERS
  // ======================================================

  if (!orders || orders.length === 0) {
    return (
      <div className="container orders-page orders-empty">

        <div className="orders-empty-icon">
          <ShoppingBag size={48} strokeWidth={1.7} />
        </div>

        <h2>Your Order Journey Starts Here</h2>

        <p>
          You haven't placed your first order yet.
          <br />
          Discover something you love and it will appear here.
        </p>

        <button
          type="button"
          className="btn btn-primary"
          style={{
            marginTop: '1.25rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
          onClick={() => navigate('shop')}
        >
          <ShoppingBag size={18} />
          Start Shopping
        </button>

      </div>
    );
  }

  // ======================================================
  // TRACKING PROGRESS
  // ======================================================

  const getProgressWidth = (status) => {
    switch (status) {
      case 'Confirmed':
        return '20%';

      case 'Shipped':
        return '50%';

      case 'Out for Delivery':
        return '75%';

      case 'Delivered':
        return '92%';

      default:
        return '20%';
    }
  };

  // ======================================================
  // MAIN ORDERS PAGE
  // ======================================================

  return (
    <div className="container orders-page">

      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div className="orders-page-header">

        <div>
          <span className="orders-eyebrow">
            ORDER MANAGEMENT
          </span>

          <h1>
            My Orders & Shipments
          </h1>

          <p>
            Track your orders and view your purchase details.
          </p>
        </div>

        <div className="orders-count">
          <Package size={18} />

          <span>
            {orders.length}{' '}
            {orders.length === 1 ? 'Order' : 'Orders'}
          </span>
        </div>

      </div>

      {/* ==================================================
          ORDERS LAYOUT
      ================================================== */}

      <div className="orders-layout">

        {/* =================================================
            LEFT: ORDER LIST
        ================================================= */}

        <div className="orders-list">

          {orders.map((order) => (

            <button
              type="button"
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className={`order-card ${
                selectedOrder?.id === order.id
                  ? 'selected'
                  : ''
              }`}
            >

              {/* Order Header */}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '0.75rem',
                }}
              >

                <span
                  style={{
                    fontWeight: 800,
                  }}
                >
                  {order.id || 'Order'}
                </span>

                <span
                  className={`status-pill status-${(
                    order.status || 'Confirmed'
                  )
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`}
                >
                  {order.status || 'Confirmed'}
                </span>

              </div>

              {/* Order Date */}

              <div
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.75rem',
                }}
              >
                Date:{' '}
                {order.date
                  ? new Date(order.date).toLocaleDateString(
                      'en-IN'
                    )
                  : 'N/A'}

                {' • '}

                Method:{' '}
                {order.paymentMethod || 'N/A'}
              </div>

              {/* Order Summary */}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >

                <span
                  style={{
                    fontSize: '0.9rem',
                  }}
                >
                  {order.items?.length || 0}{' '}
                  {order.items?.length === 1
                    ? 'item'
                    : 'items'}
                </span>

                <strong
                  style={{
                    fontSize: '1.1rem',
                  }}
                >
                  {formatINR(
                    Number(order.total || 0)
                  )}
                </strong>

              </div>

            </button>

          ))}

        </div>

        {/* =================================================
            RIGHT: TRACKING DETAILS
        ================================================= */}

        {selectedOrder && (

          <div className="tracking-card">

            {/* Tracking Header */}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
                marginBottom: '0.5rem',
              }}
            >

              <div>

                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                  }}
                >
                  TRACKING ORDER
                </span>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    margin: '0.25rem 0 0',
                  }}
                >
                  {selectedOrder.id}
                </h3>

              </div>

              <Truck size={24} />

            </div>

            {/* Customer Information */}

            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                marginBottom: '1.5rem',
              }}
            >

              <strong>
                Consignee:
              </strong>{' '}

              {selectedOrder.customer?.name ||
                'Customer'}

              {' • '}

              {selectedOrder.customer?.city || ''}

              {selectedOrder.customer?.state
                ? `, ${selectedOrder.customer.state}`
                : ''}

            </p>

            {/* =================================================
                ORDER STATUS
            ================================================= */}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.9rem 1rem',
                borderRadius: '10px',
                background: 'var(--surface-secondary)',
                marginBottom: '1.5rem',
              }}
            >

              <Package size={20} />

              <div>

                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  Current Status
                </div>

                <strong>
                  {selectedOrder.status ||
                    'Confirmed'}
                </strong>

              </div>

            </div>

            {/* =================================================
                TRACKING TIMELINE
            ================================================= */}

            <div className="timeline-container">

              <div className="timeline-track" />

              <div
                className="timeline-progress"
                style={{
                  width: getProgressWidth(
                    selectedOrder.status
                  ),
                }}
              />

              {(selectedOrder.timeline || []).map(
                (step, index) => (

                  <div
                    key={`${selectedOrder.id}-${index}`}
                    className="timeline-step"
                  >

                    <div
                      className={`timeline-node ${
                        step.done ? 'done' : ''
                      }`}
                    >
                      {step.done ? (
                        <Check size={16} />
                      ) : (
                        index + 1
                      )}
                    </div>

                    <span className="timeline-label">
                      {step.label}
                    </span>

                    <small
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {step.date}
                    </small>

                  </div>

                )
              )}

            </div>

            {/* =================================================
                DIVIDER
            ================================================= */}

            <hr
              style={{
                borderColor:
                  'var(--border-color)',
                margin: '1.5rem 0',
              }}
            />

            {/* =================================================
                DELIVERY DETAILS
            ================================================= */}

            <div
              style={{
                marginBottom: '1.5rem',
              }}
            >

              <h4
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                }}
              >
                Delivery Details
              </h4>

              <div
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'flex-start',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                }}
              >

                <MapPin size={18} />

                <div>

                  <strong
                    style={{
                      color:
                        'var(--text-primary)',
                    }}
                  >
                    {selectedOrder.customer
                      ?.name || 'Customer'}
                  </strong>

                  <br />

                  {selectedOrder.customer
                    ?.address || 'Address not available'}

                  <br />

                  {selectedOrder.customer
                    ?.city || ''}

                  {selectedOrder.customer
                    ?.state
                    ? `, ${selectedOrder.customer.state}`
                    : ''}

                  {' '}

                  {selectedOrder.customer
                    ?.pincode || ''}

                </div>

              </div>

            </div>

            {/* =================================================
                PAYMENT
            ================================================= */}

            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'center',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                marginBottom: '1.5rem',
              }}
            >

              <CreditCard size={18} />

              <span>

                Payment:{' '}

                <strong
                  style={{
                    color:
                      'var(--text-primary)',
                  }}
                >
                  {selectedOrder.paymentMethod ||
                    'N/A'}
                </strong>

              </span>

            </div>

            {/* =================================================
                ORDERED ITEMS
            ================================================= */}

            <h4
              style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                marginBottom: '0.75rem',
              }}
            >
              Ordered Items
            </h4>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >

              {selectedOrder.items?.length > 0 ? (

                selectedOrder.items.map(
                  (item, index) => (

                    <div
                      key={`${item.id || item.productId || 'item'}-${index}`}
                      style={{
                        display: 'flex',
                        justifyContent:
                          'space-between',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >

                      <div
                        style={{
                          display: 'flex',
                          alignItems:
                            'center',
                          gap: '0.75rem',
                        }}
                      >

                        {item.image ? (

                          <img
                            src={item.image}
                            alt={
                              item.name ||
                              'Product'
                            }
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius: 8,
                              objectFit:
                                'cover',
                            }}
                          />

                        ) : (

                          <div
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius: 8,
                              display: 'flex',
                              alignItems:
                                'center',
                              justifyContent:
                                'center',
                              background:
                                'var(--surface-secondary)',
                            }}
                          >
                            <Package size={22} />
                          </div>

                        )}

                        <div>

                          <div
                            style={{
                              fontSize:
                                '0.85rem',
                              fontWeight: 700,
                            }}
                          >
                            {item.name ||
                              'Product'}
                          </div>

                          <div
                            style={{
                              fontSize:
                                '0.75rem',
                              color:
                                'var(--text-muted)',
                            }}
                          >
                            Qty:{' '}
                            {item.quantity ||
                              1}
                          </div>

                          {item.selectedColor && (
                            <div
                              style={{
                                fontSize:
                                  '0.72rem',
                                color:
                                  'var(--text-muted)',
                              }}
                            >
                              Color:{' '}
                              {item.selectedColor}
                            </div>
                          )}

                          {item.selectedSize && (
                            <div
                              style={{
                                fontSize:
                                  '0.72rem',
                                color:
                                  'var(--text-muted)',
                              }}
                            >
                              Size:{' '}
                              {item.selectedSize}
                            </div>
                          )}

                        </div>

                      </div>

                      <strong
                        style={{
                          fontSize: '0.9rem',
                        }}
                      >
                        {formatINR(
                          Number(
                            item.price || 0
                          ) *
                            Number(
                              item.quantity || 1
                            )
                        )}
                      </strong>

                    </div>

                  )
                )

              ) : (

                <p
                  style={{
                    color:
                      'var(--text-muted)',
                    fontSize: '0.85rem',
                  }}
                >
                  No items found for this order.
                </p>

              )}

            </div>

            {/* =================================================
                TOTAL
            ================================================= */}

            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
                borderTop:
                  '1px solid var(--border-color)',
                marginTop: '1.25rem',
                paddingTop: '1rem',
              }}
            >

              <strong>
                Total Paid
              </strong>

              <strong
                style={{
                  fontSize: '1.15rem',
                }}
              >
                {formatINR(
                  Number(
                    selectedOrder.total || 0
                  )
                )}
              </strong>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}