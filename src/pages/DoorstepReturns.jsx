import { ArrowLeft, RotateCcw, CheckCircle, Clock, Package } from 'lucide-react';
import { useApp } from '../context/AppContext'
import '../styles/policy-page.css'

export default function DoorstepReturns() {
  const { navigate } = useApp();

  return (
    <main className="policy-page">
      <div className="policy-container">

        <button
          className="policy-back-button"
          onClick={() => navigate('home')}
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div className="policy-header">
          <div className="policy-icon">
            <RotateCcw size={32} />
          </div>

          <span className="policy-label">SHOPSPHERE POLICY</span>

          <h1>Doorstep Returns</h1>

          <p>
            Our return policy is designed to make your shopping experience
            simple and convenient.
          </p>
        </div>

        <section className="policy-card">
          <h2>Easy Returns</h2>

          <p>
            If you are not satisfied with your purchase, you may be eligible
            to request a return according to the product's applicable return
            conditions.
          </p>

          <div className="policy-features">

            <div className="policy-feature">
              <CheckCircle size={22} />
              <div>
                <h3>Simple Return Process</h3>
                <p>
                  Submit your return request through your ShopSphere account.
                </p>
              </div>
            </div>

            <div className="policy-feature">
              <Package size={22} />
              <div>
                <h3>Doorstep Pickup</h3>
                <p>
                  Eligible products can be collected from your delivery
                  address.
                </p>
              </div>
            </div>

            <div className="policy-feature">
              <Clock size={22} />
              <div>
                <h3>Quick Processing</h3>
                <p>
                  Once the returned product is received and inspected,
                  the applicable refund or replacement process will begin.
                </p>
              </div>
            </div>

          </div>
        </section>

        <section className="policy-card">
          <h2>Important Information</h2>

          <ul className="policy-list">
            <li>Products must meet the applicable return conditions.</li>
            <li>
              Some products may have different return or replacement
              requirements.
            </li>
            <li>
              Products should be returned in their original condition,
              including applicable accessories and packaging.
            </li>
            <li>
              Return eligibility may vary depending on the product category.
            </li>
          </ul>
        </section>

        <section className="policy-card">
          <h2>Need Help?</h2>

          <p>
            If you have questions about returning an order, please contact
            ShopSphere customer support with your order details.
          </p>
        </section>

      </div>
    </main>
  );
}