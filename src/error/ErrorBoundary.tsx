import React from 'react';
import ErrorDisplay from './ErrorDisplay';
import './error.css';

interface ErrorBoundaryState {
  hasError: boolean;
  errorId: string | null;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false, errorId: null };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true, errorId: Date.now() + '-' + crypto.randomUUID() };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    fetch(`${backendUrl}/api/log-error`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.toString(),
        stack: errorInfo.componentStack,
      }),
    }).catch(console.error);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      errorId: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorDisplay
          onRetry={this.handleRetry}
          onGoHome={this.handleGoHome}
          errorId={this.state.errorId!}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
