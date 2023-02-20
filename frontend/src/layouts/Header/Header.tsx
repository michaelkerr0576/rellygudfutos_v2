import Divider from '@/components/dataDisplay/Divider';
import Container from '@/components/layout/Container';
import Stack from '@/components/layout/Stack';

import MenuDrawer from './partials/MenuDrawer';

export default function Header(): JSX.Element {
  return (
    <header>
      <Container>
        <Stack horizontalAlignment="spaceBetween" verticalAlignment="center">
          <div>rellygudfutos</div>

          <MenuDrawer />
        </Stack>
      </Container>

      <Divider />
    </header>
  );
}
