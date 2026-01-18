import React, { Component, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class CheckerErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[CheckerErrorBoundary] Caught error:', error, errorInfo);

    // Log specific substance-related errors for debugging
    if (error.message.includes("Cannot read properties of undefined (reading 'name')") ||
        error.message.includes("Cannot read properties of undefined (reading 'display_name')")) {
      console.error('[CheckerErrorBoundary] Substance undefined error - this should be prevented by guards');
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div
            className="rounded-xl p-8 text-center"
            style={{
              background: '#FFEBEE',
              border: '2px solid #EF5350',
            }}
          >
            <AlertTriangle
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: '#C62828' }}
            />
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#C62828' }}>
              Something went wrong
            </h2>
            <p className="text-base mb-4" style={{ color: '#B71C1C' }}>
              The interaction checker encountered an unexpected error. Don't worry - your data is safe.
            </p>
            {this.state.error && (
              <div
                className="mb-4 p-4 rounded-lg text-left text-sm font-mono"
                style={{
                  background: 'white',
                  border: '1px solid #EF5350',
                  color: '#C62828',
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                {this.state.error.message}
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 rounded-lg font-semibold text-white"
                style={{ background: '#EF5350' }}
              >
                Refresh Page
              </button>
              <a
                href="/"
                className="px-6 py-3 rounded-lg font-semibold"
                style={{
                  background: 'white',
                  border: '2px solid #EF5350',
                  color: '#C62828',
                }}
              >
                Go to Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
