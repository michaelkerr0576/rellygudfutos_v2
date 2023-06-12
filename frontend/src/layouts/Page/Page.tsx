import { styled } from '@mui/material/styles';

import Container from '@/components/layout/Container';
import { FIXED_GALLERY_BOTTOM_NAVIGATION_HEIGHT } from '@/pages/Gallery/constants';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { FIXED_HEADER_HEIGHT } from '../Header/Header';

export interface PageProps {
  children: React.ReactNode;
  pageName: string;
}

const StyledPage = styled('main')(({ theme }): { [key: string]: any } => ({
  '.rgf-container': {
    padding: theme.spacing(2),
  },

  height: `calc(100vh - (${FIXED_HEADER_HEIGHT} + ${FIXED_GALLERY_BOTTOM_NAVIGATION_HEIGHT}))`,
  overflowY: 'auto',
}));

export default function Page(props: PageProps): JSX.Element {
  const { children, pageName } = props;

  return (
    <ErrorBoundary identifier={`${pageName} page`}>
      <StyledPage className={`rgf-page${pageName}`}>
        <Container>{children}</Container>
      </StyledPage>
    </ErrorBoundary>
  );
}
