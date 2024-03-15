import clsx from 'clsx';

import { styled } from '@mui/material/styles';

import Container from '@/components/layout/Container';
import { FIXED_BOTTOM_APP_BAR_HEIGHT } from '@/constants/style.constants';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { FIXED_HEADER_HEIGHT } from '../Header/constants';

export interface PageProps {
  bottomNavigation?: JSX.Element; // * '@/components/navigation/BottomNavigation';
  children: React.ReactNode;
  pageName: string;
}

const StyledPage = styled('main')(({ theme }): { [key: string]: any } => ({
  '&.rgf, .rgf': {
    '&-container': {
      padding: theme.spacing(1, 1.5),
    },
    '&-page': {
      '&--bottomNavigation': {
        height: `calc(100vh - (${FIXED_HEADER_HEIGHT}px + ${FIXED_BOTTOM_APP_BAR_HEIGHT}px))`,
      },
    },
  },

  height: `calc(100vh - ${FIXED_HEADER_HEIGHT}px)`,
  overflowY: 'auto',

  [theme.breakpoints.up('laptop')]: {
    '.rgf': {
      '&-container': {
        padding: theme.spacing(2),
      },
    },
  },
}));

export default function Page(props: PageProps): JSX.Element {
  const { bottomNavigation = null, children, pageName } = props;

  const pageStyles = clsx('rgf-page', `rgf-page--${pageName}`, {
    'rgf-page--bottomNavigation': !!bottomNavigation,
  });

  return (
    <ErrorBoundary identifier={`${pageName} page`}>
      <StyledPage className={pageStyles}>
        <Container>
          {children}
          {bottomNavigation}
        </Container>
      </StyledPage>
    </ErrorBoundary>
  );
}
