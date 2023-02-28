import { useLocation } from 'react-router-dom';

import DarkModeIcon from '@/assets/icons/DarkModeIcon';
import GalleryIcon from '@/assets/icons/GalleryIcon';
import MenuIcon from '@/assets/icons/MenuIcon';
import PortfolioIcon from '@/assets/icons/PortfolioIcon';
import { IconProps } from '@/assets/icons/types/iconTypes';
import RellygudfutosLogo from '@/assets/logos/RellygudfutosLogo';
import Divider from '@/components/dataDisplay/Divider';
import List from '@/components/dataDisplay/List';
import IconButton from '@/components/inputs/IconButton';
import Switch from '@/components/inputs/Switch';
import Box from '@/components/layout/Box';
import Stack from '@/components/layout/Stack';
import Drawer from '@/components/navigation/Drawer';
import useMenu from '@/hooks/useMenu';
import useThemes from '@/hooks/useThemes';

export default function MenuDrawer(): JSX.Element {
  const { pathname } = useLocation();
  const { colorMode, toggleColorMode } = useThemes();
  const { isMenuDrawerOpen, toggleMenuDrawer } = useMenu();

  const renderMenuButton = (isDrawerOpen: boolean, size?: IconProps['size']): JSX.Element => (
    <IconButton ariaLabel="menu" edge="start" onClick={(): void => toggleMenuDrawer(isDrawerOpen)}>
      <MenuIcon size={size} variant={isMenuDrawerOpen ? 'filled' : 'outlined'} />
    </IconButton>
  );

  const renderDrawerHeader = (): JSX.Element => (
    <Box pb={1}>
      <Stack verticalAlignment="center">
        {renderMenuButton(false)}

        <Box pl={0.5}>
          <RellygudfutosLogo size="small" />
        </Box>
      </Stack>
    </Box>
  );

  return (
    <>
      {renderMenuButton(true, 'large')}

      <Drawer anchor="left" isOpen={isMenuDrawerOpen} setIsOpen={toggleMenuDrawer}>
        {renderDrawerHeader()}

        <Divider />

        <List
          listItems={[
            {
              icon: <GalleryIcon variant={pathname.includes('/gallery') ? 'filled' : 'outlined'} />,
              label: 'Gallery',
              navigateTo: '/gallery',
              onClick: (): void => toggleMenuDrawer(false),
            },
            {
              icon: <PortfolioIcon variant={pathname.includes('/portfolio') ? 'filled' : 'outlined'} />,
              label: 'Portfolio',
              navigateTo: '/portfolio',
              onClick: (): void => toggleMenuDrawer(false),
            },
          ]}
          subHeader="Navigation"
        />

        <Divider />

        <List
          listItems={[
            {
              action: (
                <Switch
                  ariaLabel="switch-dark-mode"
                  edge="end"
                  isChecked={colorMode === 'dark'}
                  onChange={(): void => {}}
                />
              ),
              icon: <DarkModeIcon variant={colorMode === 'dark' ? 'filled' : 'outlined'} />,
              label: 'Dark mode',
              onClick: toggleColorMode,
            },
          ]}
          subHeader="Settings"
        />

        <Divider />
      </Drawer>
    </>
  );
}
