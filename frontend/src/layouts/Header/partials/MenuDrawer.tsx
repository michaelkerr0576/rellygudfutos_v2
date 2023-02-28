import { useLocation } from 'react-router-dom';

import DarkModeIcon from '@/assets/icons/DarkModeIcon';
import DashboardIcon from '@/assets/icons/DashboardIcon';
import GalleryIcon from '@/assets/icons/GalleryIcon';
import LoginIcon from '@/assets/icons/LoginIcon';
import MenuIcon from '@/assets/icons/MenuIcon';
import PortfolioIcon from '@/assets/icons/PortfolioIcon';
import RellygudfutosLogo from '@/assets/logos/RellygudfutosLogo';
import Divider from '@/components/dataDisplay/Divider';
import List from '@/components/dataDisplay/List';
import IconButton from '@/components/inputs/IconButton';
import Switch from '@/components/inputs/Switch';
import Box from '@/components/layout/Box';
import Drawer from '@/components/navigation/Drawer';
import useMenu from '@/hooks/useMenu';
import useThemes from '@/hooks/useThemes';

export default function MenuDrawer(): JSX.Element {
  const { pathname } = useLocation();
  const { colorMode, toggleColorMode } = useThemes();
  const { isMenuDrawerOpen, toggleMenuDrawer } = useMenu();

  return (
    <>
      <IconButton ariaLabel="menu" edge="start" onClick={(): void => toggleMenuDrawer(true)}>
        <MenuIcon size="large" variant={isMenuDrawerOpen ? 'filled' : 'outlined'} />
      </IconButton>

      <Drawer anchor="left" isOpen={isMenuDrawerOpen} setIsOpen={toggleMenuDrawer}>
        <Box pt={0.5} pb={2}>
          <RellygudfutosLogo size="small" />
        </Box>

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

        <List
          listItems={[
            {
              icon: <DashboardIcon variant={pathname.includes('/admin/dashboard') ? 'filled' : 'outlined'} />,
              label: 'Dashboard',
              navigateTo: '/admin/dashboard',
              onClick: (): void => toggleMenuDrawer(false),
            },
            {
              icon: <LoginIcon />,
              label: 'Login',
              navigateTo: '/admin/login',
              onClick: (): void => toggleMenuDrawer(false),
            },
          ]}
          subHeader="Account"
        />
      </Drawer>
    </>
  );
}
