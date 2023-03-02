import { styled } from '@mui/material/styles';

import RellygudfutosLogo from '@/assets/logos/RellygudfutosLogo';
import Divider from '@/components/dataDisplay/Divider';
import Container from '@/components/layout/Container';
import Stack from '@/components/layout/Stack';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import AccountDrawer from './partials/AccountDrawer';
import MenuDrawer from './partials/MenuDrawer';

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
}));

export default function Header(): JSX.Element {
  return (
    <ErrorBoundary identifier="Header">
      <StyledHeader className="rgf_header">
        <Container>
          <Stack verticalAlignment="center">
            <MenuDrawer />

            <RellygudfutosLogo />

            <AccountDrawer />
          </Stack>
        </Container>

        <Divider />
      </StyledHeader>
    </ErrorBoundary>
  );
}
