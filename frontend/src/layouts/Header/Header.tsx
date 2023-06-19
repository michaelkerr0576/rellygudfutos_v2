import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import RellygudfutosLogo from '@/assets/logos/RellygudfutosLogo';
import LogoButton from '@/components/inputs/LogoButton';
import Container from '@/components/layout/Container';
import Stack from '@/components/layout/Stack';
import Paper from '@/components/surfaces/Paper';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import AccountDrawer from './partials/AccountDrawer';
import MenuDrawer from './partials/MenuDrawer';

export const FIXED_HEADER_HEIGHT = '60px';

const StyledHeader = styled('header')(({ theme }): { [key: string]: any } => ({
  '.rgf-accountDrawer': {
    marginLeft: 'auto',
  },
  '.rgf-container': {
    padding: theme.spacing(0, 1),
  },
  '.rgf-header--rellygudfutosLogoButton': {
    height: '60px',
    paddingLeft: theme.spacing(1),
  },

  left: 0,
  position: 'sticky',
  right: 0,
  top: 0,
  zIndex: theme.zIndex.appBar,

  [theme.breakpoints.up('tablet')]: {
    '.rgf-container': {
      padding: theme.spacing(0, 2),
    },
  },
}));

export default function Header(): JSX.Element {
  const navigate = useNavigate();

  const renderLogoButton = (): JSX.Element => (
    <LogoButton
      ariaLabel="really good photos"
      className="rgf-header--rellygudfutosLogoButton"
      onClick={(): void => navigate('/')}
    >
      <RellygudfutosLogo />
    </LogoButton>
  );

  return (
    <ErrorBoundary identifier="Header">
      <StyledHeader className="rgf-header">
        <Paper elevation={1}>
          <Container>
            <Stack alignItems="center">
              <MenuDrawer />

              {renderLogoButton()}

              <AccountDrawer />
            </Stack>
          </Container>
        </Paper>
      </StyledHeader>
    </ErrorBoundary>
  );
}
