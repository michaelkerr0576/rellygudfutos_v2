import RellygudfutosLogo from '@/assets/logos/RellygudfutosLogo';
import Divider from '@/components/dataDisplay/Divider';
import Box from '@/components/layout/Box';
import Container from '@/components/layout/Container';
import Stack from '@/components/layout/Stack';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import AccountDrawer from './partials/AccountDrawer';
import MenuDrawer from './partials/MenuDrawer';

export default function Header(): JSX.Element {
  const renderRellygudfutosLogos = (): JSX.Element => (
    <Box pl={1}>
      <RellygudfutosLogo />
    </Box>
  );

  const renderAccountDrawer = (): JSX.Element => (
    <Box style={{ marginLeft: 'auto' }}>
      <AccountDrawer />
    </Box>
  );

  return (
    <ErrorBoundary identifier="Header">
      <header>
        <Container>
          <Stack verticalAlignment="center">
            <MenuDrawer />

            {renderRellygudfutosLogos()}

            {renderAccountDrawer()}
          </Stack>
        </Container>

        <Divider />
      </header>
    </ErrorBoundary>
  );
}
