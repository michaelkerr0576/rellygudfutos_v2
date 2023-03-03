import { styled } from '@mui/material/styles';

import RellygudfutosLogo from '@/assets/logos/RellygudfutosLogo';
import Container from '@/components/layout/Container';
import Stack from '@/components/layout/Stack';
import Paper from '@/components/surfaces/Paper';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import AccountDrawer from './partials/AccountDrawer';
import MenuDrawer from './partials/MenuDrawer';

export const FIXED_HEADER_HEIGHT = '60px';

const StyledHeader = styled('header')(({ theme }): { [key: string]: any } => ({
  '.rgf_accountDrawer': {
    marginLeft: 'auto',
  },
  '.rgf_container': {
    padding: theme.spacing(0, 2),
  },
  '.rgf_rellygudfutosLogo': {
    alignItems: 'center',
    minHeight: 60,
    paddingLeft: theme.spacing(1),
  },

  left: 0,
  position: 'fixed',
  right: 0,
  top: 0,
}));

export default function Header(): JSX.Element {
  return (
    <ErrorBoundary identifier="Header">
      <StyledHeader className="rgf_header">
        <Paper className="rgf_drawer__expandDrawer" elevation={1}>
          <Container>
            <Stack verticalAlignment="center">
              <MenuDrawer />

              <RellygudfutosLogo />

              <AccountDrawer />
            </Stack>
          </Container>
        </Paper>
      </StyledHeader>
    </ErrorBoundary>
  );
}
