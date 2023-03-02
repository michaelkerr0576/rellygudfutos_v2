import { styled } from '@mui/material/styles';

import RellygudfutosLogo from '@/assets/logos/RellygudfutosLogo';
import Divider from '@/components/dataDisplay/Divider';
import Box from '@/components/layout/Box';
import Container from '@/components/layout/Container';
import Stack from '@/components/layout/Stack';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import AccountDrawer from './partials/AccountDrawer';
import MenuDrawer from './partials/MenuDrawer';

const StyledHeader = styled('header')(({ theme }): { [key: string]: any } => ({
  '.rgf_header__accountDrawer': {
    marginLeft: 'auto',
  },
  '.rgf_header__rellygudfutosLogo': {
    paddingLeft: theme.spacing(1),
  },
}));

export default function Header(): JSX.Element {
  const renderRellygudfutosLogos = (): JSX.Element => (
    <Box className="rgf_header__rellygudfutosLogo">
      <RellygudfutosLogo />
    </Box>
  );

  const renderAccountDrawer = (): JSX.Element => (
    <Box className="rgf_header__accountDrawer">
      <AccountDrawer />
    </Box>
  );

  return (
    <ErrorBoundary identifier="Header">
      <StyledHeader className="rgf_header">
        <Container>
          <Stack verticalAlignment="center">
            <MenuDrawer />

            {renderRellygudfutosLogos()}

            {renderAccountDrawer()}
          </Stack>
        </Container>

        <Divider />
      </StyledHeader>
    </ErrorBoundary>
  );
}
