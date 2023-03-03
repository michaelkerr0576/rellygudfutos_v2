import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  identifier: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(_error: Error): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // * Can be used to log to any logging service like sentry
    const { identifier } = this.props;
    console.log(`${identifier} error boundary`, {
      error,
      errorInfo,
    });
  }

  render(): React.ReactNode {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <h3>Something went wrong!</h3>;
    }

    return children;
  }
}
