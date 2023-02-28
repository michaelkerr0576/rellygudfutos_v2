import RellygudfutosLogo from '@/assets/logos/RellygudfutosLogo';
import Avatar from '@/components/dataDisplay/Avatar';
import Divider from '@/components/dataDisplay/Divider';
import Box from '@/components/layout/Box';
import Container from '@/components/layout/Container';
import Stack from '@/components/layout/Stack';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import MenuDrawer from './partials/MenuDrawer';

export default function Header(): JSX.Element {
  return (
    <ErrorBoundary identifier="Header">
      <header>
        <Container>
          <Stack verticalAlignment="center">
            <MenuDrawer />

            <Box pl={1}>
              <RellygudfutosLogo />
            </Box>

            <Box style={{ marginLeft: 'auto' }}>
              <Avatar>MK</Avatar>
            </Box>
          </Stack>
        </Container>

        <Divider />
      </header>
    </ErrorBoundary>
  );
}
