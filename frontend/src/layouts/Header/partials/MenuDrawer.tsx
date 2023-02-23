import { useLocation } from 'react-router-dom';

import DarkModeIcon from '@/assets/icons/DarkModeIcon';
import DashboardIcon from '@/assets/icons/DashboardIcon';
import GalleryIcon from '@/assets/icons/GalleryIcon';
import LoginIcon from '@/assets/icons/LoginIcon';
import MenuIcon from '@/assets/icons/MenuIcon';
import PortfolioIcon from '@/assets/icons/PortfolioIcon';
import Divider from '@/components/dataDisplay/Divider';
import List from '@/components/dataDisplay/List';
import Switch from '@/components/inputs/Switch';
import Drawer from '@/components/navigation/Drawer';
import useMenu from '@/hooks/useMenu';
import useThemes from '@/hooks/useThemes';

export default function MenuDrawer(): JSX.Element {
  const { pathname } = useLocation();
  const { colorMode, toggleColorMode } = useThemes();
  const { isMenuDrawerOpen, toggleMenuDrawer } = useMenu();

  return (
    <Drawer icon={<MenuIcon size="large" />} isOpen={isMenuDrawerOpen} setIsOpen={toggleMenuDrawer}>
      <List
        listItems={[
          {
            icon: <GalleryIcon variant={pathname.includes('/gallery') ? 'filled' : 'outlined'} />,
            label: 'Gallery',
            navigateTo: '/gallery',
          },
          {
            icon: <PortfolioIcon variant={pathname.includes('/portfolio') ? 'filled' : 'outlined'} />,
            label: 'Portfolio',
            navigateTo: '/portfolio',
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
                isChecked={colorMode === 'dark'}
                horizontalAlignment="end"
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
          },
          {
            icon: <LoginIcon />,
            label: 'Login',
            navigateTo: '/admin/login',
          },
        ]}
        subHeader="Account"
      />
    </Drawer>
  );
}
