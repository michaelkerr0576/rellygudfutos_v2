import { styled } from '@mui/material/styles';

import Container from '@/components/layout/Container';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

export interface PageProps {
  children: React.ReactNode;
  pageName: string;
}

const StyledPage = styled('main')((): { [key: string]: any } => ({}));

export default function Page(props: PageProps): JSX.Element {
  const { children, pageName } = props;

  return (
    <ErrorBoundary identifier={`${pageName} page`}>
      <StyledPage className={`rgf_page${pageName}`}>
        <Container verticalPadding="medium">{children}</Container>
      </StyledPage>
    </ErrorBoundary>
  );
}
