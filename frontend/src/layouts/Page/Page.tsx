import clsx from 'clsx';

import { styled } from '@mui/material/styles';

import Divider from '@/components/dataDisplay/Divider';
import Typography from '@/components/dataDisplay/Typography';
import Box from '@/components/layout/Box';
import Container from '@/components/layout/Container';
import Stack from '@/components/layout/Stack';
import Paper from '@/components/surfaces/Paper';
import { FIXED_BOTTOM_APP_BAR_HEIGHT } from '@/constants/style.constants';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { FIXED_HEADER_HEIGHT } from '../Header/constants';

export interface PageProps {
  bottomNavigation?: JSX.Element; // * '@/components/navigation/BottomNavigation';
  children: React.ReactNode;
  headerContent?: JSX.Element;
  pageName: string;
  title: string;
}

const StyledPage = styled('main')(({ theme }): { [key: string]: any } => ({
  '&.rgf, .rgf': {
    '&-page': {
      '&--content': {
        padding: theme.spacing(1.5),
      },
      '&--hasBottomNav': {
        height: `calc(100vh - (${FIXED_HEADER_HEIGHT}px + ${FIXED_BOTTOM_APP_BAR_HEIGHT}px))`,
      },
      '&--header': {
        padding: theme.spacing(1.5, 0, 1.5, 1.5),
        width: '100%',
      },
    },
  },

  height: `calc(100vh - ${FIXED_HEADER_HEIGHT}px)`,
  overflowY: 'auto',

  [theme.breakpoints.up('laptop')]: {
    '&.rgf, .rgf': {
      '&-page': {
        '&--content': {
          padding: theme.spacing(4, 2),
        },
        '&--header': {
          padding: theme.spacing(2, 0, 2, 2),
        },
      },
    },
  },
}));

export default function Page(props: PageProps): JSX.Element {
  const { bottomNavigation = null, children, headerContent = null, pageName, title } = props;

  const pageStyles = clsx('rgf-page', `rgf-page--${pageName}`, {
    'rgf-page--hasBottomNav': !!bottomNavigation,
  });

  const renderPageHeader = (): JSX.Element => (
    <Paper className="rgf-page--header" elevation={1}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h1">{title}</Typography>

        {headerContent && (
          <>
            <Divider orientation="vertical" />

            {headerContent}
          </>
        )}
      </Stack>
    </Paper>
  );

  const renderPageContent = (): JSX.Element => (
    <Container className="rgf-page--content">{children}</Container>
  );

  const renderPageBottomNavigation = (): JSX.Element => (
    <Box className="rgf-page--bottomNavigation">{bottomNavigation}</Box>
  );

  return (
    <ErrorBoundary identifier={`${pageName} page`}>
      <StyledPage className={pageStyles}>
        {renderPageHeader()}

        {renderPageContent()}

        {bottomNavigation && renderPageBottomNavigation()}
      </StyledPage>
    </ErrorBoundary>
  );
}
