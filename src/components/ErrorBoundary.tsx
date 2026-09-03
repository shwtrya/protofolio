import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen items-center bg-bg p-6">
        <div className="container-responsive max-w-lg">
          <div className="card p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
              <AlertTriangle size={24} />
            </span>
            <h1 className="t-h3 mt-5">Terjadi kesalahan pada aplikasi</h1>
            <p className="t-body mt-2 text-sm">
              Halaman gagal dimuat. Coba muat ulang peramban Anda.
            </p>
            {this.state.error && (
              <pre className="mt-4 overflow-x-auto rounded-[8px] border border-line bg-surface p-3 font-mono text-xs text-muted">
                {this.state.error.message}
              </pre>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn btn-primary text-sm"
              >
                <RefreshCw size={14} />
                Muat Ulang
              </button>
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.clear();
                    sessionStorage.clear();
                  } finally {
                    window.location.href = '/';
                  }
                }}
                className="btn btn-secondary text-sm"
              >
                Bersihkan Cache & Beranda
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
