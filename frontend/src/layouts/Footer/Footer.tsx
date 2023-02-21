import Container from '@/components/layout/Container';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

export default function Footer(): JSX.Element {
  return (
    <ErrorBoundary identifier="Footer">
      <footer>
        <Container>Footer</Container>
      </footer>
    </ErrorBoundary>
  );
}
