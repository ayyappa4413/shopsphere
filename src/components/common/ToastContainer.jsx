import '../../styles/toast.css';

import {
  CheckCircle2,
  AlertCircle,
  Info,
  X,
} from 'lucide-react';

import { useApp } from '../../context/AppContext';

export default function ToastContainer() {
  const {
    toasts,
    removeToast,
  } = useApp();

  return (
    <div
      className="toast-container"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => {
        const type = toast.type || 'success';

        const isSuccess = type === 'success';
        const isError = type === 'error';
        const isInfo = type === 'info';

        return (
          <div
            key={toast.id}
            className={`toast toast-${type}`}
            role={isError ? 'alert' : 'status'}
          >
            <div className="toast-icon">
              {isSuccess && (
                <CheckCircle2 size={20} />
              )}

              {isError && (
                <AlertCircle size={20} />
              )}

              {isInfo && (
                <Info size={20} />
              )}
            </div>

            <div className="toast-content">
              <span className="toast-title">
                {isSuccess && 'Success'}
                {isError && 'Something went wrong'}
                {isInfo && 'Information'}
              </span>

              <div className="toast-message">
                {toast.message}
              </div>
            </div>

            <button
              type="button"
              className="toast-close"
              onClick={() =>
                removeToast(toast.id)
              }
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}