import React from 'react';
import ErrorDisplay from './ErrorDisplay';
import { v4 as uuidv4 } from 'uuid';
import './error.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true, errorId: Date.now() + '-' + uuidv4() };
  }

  componentDidCatch(error, errorInfo) {
    // Sending error details to backend
    fetch('http://localhost:5000/api/log-error', {
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
    // Navigate to home page
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorDisplay
          onRetry={this.handleRetry}
          onGoHome={this.handleGoHome}
          errorId={this.state.errorId}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
