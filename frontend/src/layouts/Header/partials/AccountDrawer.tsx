import { useLocation } from 'react-router-dom';

import DashboardIcon from '@/assets/icons/DashboardIcon';
import LoginIcon from '@/assets/icons/LoginIcon';
import Avatar, { Size } from '@/components/dataDisplay/Avatar';
import Divider from '@/components/dataDisplay/Divider';
import List from '@/components/dataDisplay/List';
import Typography from '@/components/dataDisplay/Typography';
import IconButton from '@/components/inputs/IconButton';
import Box from '@/components/layout/Box';
import Stack from '@/components/layout/Stack';
import Drawer from '@/components/navigation/Drawer';
import useMenu from '@/hooks/useMenu';

export default function AccountDrawer(): JSX.Element {
  const { pathname } = useLocation();
  const { isAccountDrawerOpen, toggleAccountDrawer } = useMenu();

  const renderAccountButton = (isDrawerOpen: boolean, size?: Size): JSX.Element => (
    <IconButton ariaLabel="account" edge="end" onClick={(): void => toggleAccountDrawer(isDrawerOpen)}>
      <Avatar size={size}>M</Avatar>
    </IconButton>
  );

  const renderDrawerHeader = (): JSX.Element => (
    <Box pt={2} pb={1}>
      <Stack verticalAlignment="center" horizontalAlignment="spaceBetween">
        <Typography variant="h3">Michael Kerr</Typography>

        {renderAccountButton(false)}
      </Stack>
    </Box>
  );

  return (
    <>
      {renderAccountButton(true, 'large')}

      <Drawer anchor="right" isOpen={isAccountDrawerOpen} setIsOpen={toggleAccountDrawer}>
        {renderDrawerHeader()}

        <Divider />

        <List
          listItems={[
            {
              icon: <DashboardIcon variant={pathname.includes('/admin/dashboard') ? 'filled' : 'outlined'} />,
              label: 'Dashboard',
              navigateTo: '/admin/dashboard',
              onClick: (): void => toggleAccountDrawer(false),
            },
            {
              icon: <LoginIcon />,
              label: 'Login',
              navigateTo: '/admin/login',
              onClick: (): void => toggleAccountDrawer(false),
            },
          ]}
          subHeader="Account"
        />

        <Divider />
      </Drawer>
    </>
  );
}
