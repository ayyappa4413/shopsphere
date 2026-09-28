
import {
  ArrowLeft,
  ShieldCheck,
  Wrench,
  Package
} from 'lucide-react';

import { useApp } from '../context/AppContext'
import '../styles/policy-page.css'

export default function Warranty() {
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
            <ShieldCheck size={32} />
          </div>

          <span className="policy-label">SHOPSPHERE POLICY</span>

          <h1>2-Year Warranty</h1>

          <p>
            ShopSphere provides warranty information to help you understand
            coverage for eligible products.
          </p>

        </div>

        <section className="policy-card">

          <h2>Warranty Coverage</h2>

          <p>
            Eligible products may include a manufacturer's warranty or
            applicable ShopSphere warranty coverage. The exact coverage
            depends on the product and its warranty terms.
          </p>

          <div className="policy-features">

            <div className="policy-feature">
              <ShieldCheck size={22} />

              <div>
                <h3>Warranty Protection</h3>

                <p>
                  Eligible products may receive warranty protection for
                  manufacturing defects during the applicable warranty period.
                </p>
              </div>
            </div>

            <div className="policy-feature">
              <Wrench size={22} />

              <div>
                <h3>Service Support</h3>

                <p>
                  Warranty claims may require inspection and verification
                  before service, repair, or replacement.
                </p>
              </div>
            </div>

            <div className="policy-feature">
              <Package size={22} />

              <div>
                <h3>Product Requirements</h3>

                <p>
                  Keep your invoice, order information, and applicable
                  product documentation for warranty requests.
                </p>
              </div>
            </div>

          </div>

        </section>

        <section className="policy-card">

          <h2>What May Not Be Covered</h2>

          <ul className="policy-list">
            <li>Normal wear and tear.</li>
            <li>Damage caused by misuse or improper handling.</li>
            <li>Accidental or cosmetic damage where applicable.</li>
            <li>Unauthorized modifications or repairs.</li>
            <li>
              Issues specifically excluded by the applicable manufacturer's
              warranty.
            </li>
          </ul>

        </section>

        <section className="policy-card">

          <h2>How to Request Warranty Service</h2>

          <ol className="policy-list policy-numbered-list">
            <li>Keep your ShopSphere order information ready.</li>
            <li>Contact customer support.</li>
            <li>Provide the required product and issue details.</li>
            <li>
              Follow the instructions provided for inspection or service.
            </li>
          </ol>

        </section>

      </div>
    </main>
  );
}
