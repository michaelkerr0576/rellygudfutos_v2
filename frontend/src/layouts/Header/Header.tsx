import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import LoginIcon from '@/assets/icons/LoginIcon';
import RellygudfutosLogo from '@/assets/logos/RellygudfutosLogo';
import IconButton from '@/components/inputs/IconButton';
import LogoButton from '@/components/inputs/LogoButton';
import Container from '@/components/layout/Container';
import Stack from '@/components/layout/Stack';
import Paper from '@/components/surfaces/Paper';
import useMenu from '@/hooks/shared/useMenu';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import AccountDrawer from './partials/AccountDrawer';
import LoginDialog from './partials/LoginDialog';
import MenuDrawer from './partials/MenuDrawer';
import { FIXED_HEADER_HEIGHT } from './constants';

const StyledHeader = styled('header')(({ theme }): { [key: string]: any } => ({
  '.rgf': {
    '&-accountDrawer': {
      marginLeft: 'auto',
    },
    '&-container': {
      padding: theme.spacing(0, 1.5),
    },
    '&-header': {
      '&--rellygudfutosLogoButton': {
        height: FIXED_HEADER_HEIGHT,
        paddingLeft: theme.spacing(1),
      },
    },
  },

  left: 0,
  position: 'sticky',
  right: 0,
  top: 0,
  zIndex: theme.zIndex.appBar,

  [theme.breakpoints.up('laptop')]: {
    '.rgf': {
      '&-container': {
        padding: theme.spacing(0, 2),
      },
    },
  },
}));

export default function Header(): JSX.Element {
  const navigate = useNavigate();
  const { handleOpenLoginDialog, isLoginDialogOpen } = useMenu();
  const handleNavigateGallery = (): void => navigate('/');

  const renderSiteAction = (): JSX.Element => (
    <Stack alignItems="center">
      <MenuDrawer />

      <LogoButton
        ariaLabel="really good photos"
        className="rgf-header--rellygudfutosLogoButton"
        onClick={handleNavigateGallery}
      >
        <RellygudfutosLogo size="small" />
      </LogoButton>
    </Stack>
  );

  const renderAccountAction = (): JSX.Element => {
    // TODO - figure out global state for isLoggedIn and other account details
    const isLoggedIn = true;
    if (isLoggedIn) {
      return <AccountDrawer />;
    }

    return (
      <IconButton
        ariaLabel="login"
        className="rgf-header--loginButton"
        edge="start"
        onClick={handleOpenLoginDialog}
      >
        <LoginIcon />
      </IconButton>
    );
  };

  return (
    <ErrorBoundary identifier="Header">
      <StyledHeader className="rgf-header">
        <Paper elevation={1}>
          <Container>
            <Stack alignItems="center" justifyContent="spaceBetween">
              {renderSiteAction()}

              {renderAccountAction()}
            </Stack>
          </Container>
        </Paper>
      </StyledHeader>

      {isLoginDialogOpen && <LoginDialog />}
    </ErrorBoundary>
  );
}
