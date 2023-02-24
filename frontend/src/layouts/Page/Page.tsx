import Container from '@/components/layout/Container';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

export interface PageProps {
  children: React.ReactNode;
  pageName: string;
}

export default function Page(props: PageProps): JSX.Element {
  const { children, pageName } = props;

  return (
    <ErrorBoundary identifier={`${pageName} page`}>
      <main>
        <Container verticalPadding="medium">{children}</Container>
      </main>
    </ErrorBoundary>
  );
}
