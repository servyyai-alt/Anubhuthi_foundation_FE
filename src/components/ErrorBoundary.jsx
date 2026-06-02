import React from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-parchment flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <div className="text-8xl mb-6">⚠️</div>
            <h2 className="font-serif text-3xl font-bold text-earth-800 mb-3">Something Went Wrong</h2>
            <p className="text-earth-500 mb-2">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <pre className="bg-earth-100 text-earth-700 p-3 rounded-xl text-xs text-left overflow-auto mb-6 max-h-32">
                {this.state.error?.toString()}
              </pre>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-6 py-2.5 bg-saffron-500 text-white rounded-full font-semibold text-sm hover:bg-saffron-600 transition-colors"
              >
                Try Again
              </button>
              <Link to="/" className="px-6 py-2.5 border border-earth-300 text-earth-700 rounded-full font-semibold text-sm hover:bg-earth-50 transition-colors">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
