import { styled } from '@mui/material/styles';

import Container from '@/components/layout/Container';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

export interface PageProps {
  children: React.ReactNode;
  pageName: string;
}

const StyledPage = styled('main')(({ theme }): { [key: string]: any } => ({
  '.rgf_container': {
    padding: theme.spacing(2, 2),
  },
}));

export default function Page(props: PageProps): JSX.Element {
  const { children, pageName } = props;

  return (
    <ErrorBoundary identifier={`${pageName} page`}>
      <StyledPage className={`rgf_page${pageName}`}>
        <Container>{children}</Container>
      </StyledPage>
    </ErrorBoundary>
  );
}
