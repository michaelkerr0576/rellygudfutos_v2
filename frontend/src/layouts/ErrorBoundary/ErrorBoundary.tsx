import React from 'react';

import Typography from '@/components/dataDisplay/Typography';
import Container from '@/components/layout/Container';

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
      return (
        <Container>
          <Typography variant="h3">Something went wrong!</Typography>
        </Container>
      );
    }

    return children;
  }
}
