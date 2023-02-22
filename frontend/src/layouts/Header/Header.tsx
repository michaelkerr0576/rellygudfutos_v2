import RellygudfutosLogo from '@/assets/logos/RellygudfutosLogo';
import Divider from '@/components/dataDisplay/Divider';
import Container from '@/components/layout/Container';
import Stack from '@/components/layout/Stack';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import MenuDrawer from './partials/MenuDrawer';

export default function Header(): JSX.Element {
  return (
    <ErrorBoundary identifier="Header">
      <header>
        <Container>
          <Stack horizontalAlignment="spaceBetween" verticalAlignment="center">
            <RellygudfutosLogo />
            <MenuDrawer />
          </Stack>
        </Container>

        <Divider />
      </header>
    </ErrorBoundary>
  );
}
