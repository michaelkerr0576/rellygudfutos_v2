import { useLocation } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import AccountIcon from '@/assets/icons/AccountIcon';
import DashboardIcon from '@/assets/icons/DashboardIcon';
import LogoutIcon from '@/assets/icons/LogoutIcon';
import Avatar from '@/components/dataDisplay/Avatar';
import Divider from '@/components/dataDisplay/Divider';
import List from '@/components/dataDisplay/List';
import Typography from '@/components/dataDisplay/Typography';
import IconButton from '@/components/inputs/IconButton';
import Box from '@/components/layout/Box';
import Stack from '@/components/layout/Stack';
import Drawer from '@/components/navigation/Drawer';
import useMenu from '@/hooks/shared/useMenu';

const StyledDrawer = styled(Drawer)(({ theme }): { [key: string]: any } => ({
  '.rgf': {
    '&-accountDrawer': {
      '&--header': {
        padding: theme.spacing(1, 0),
      },
    },
  },
}));

export default function AccountDrawer(): JSX.Element {
  const { pathname } = useLocation();
  const {
    handleCloseAccountDrawer,
    handleOpenAccountDrawer,
    handleToggleAccountDrawer,
    isAccountDrawerOpen,
  } = useMenu();

  const renderAccountButton = (isDrawerOpen: boolean): JSX.Element => (
    <IconButton ariaLabel="account" edge="end" onClick={(): void => handleToggleAccountDrawer(isDrawerOpen)}>
      <Avatar>M</Avatar>
    </IconButton>
  );

  const renderDrawerHeader = (): JSX.Element => (
    <Stack className="rgf-accountDrawer--header" alignItems="center" justifyContent="spaceBetween">
      <Typography variant="h3">Michael Kerr</Typography>

      {renderAccountButton(false)}
    </Stack>
  );

  return (
    <Box className="rgf-accountDrawer">
      {renderAccountButton(true)}

      <StyledDrawer
        anchor="right"
        isOpen={isAccountDrawerOpen}
        onClose={handleCloseAccountDrawer}
        onOpen={handleOpenAccountDrawer}
      >
        {renderDrawerHeader()}

        <Divider />

        <List
          listItems={[
            {
              icon: <AccountIcon variant={pathname.includes('/account/profile') ? 'filled' : 'outlined'} />,
              label: 'Profile',
              navigateTo: '/account/profile',
              onClick: handleCloseAccountDrawer,
            },
            {
              icon: (
                <DashboardIcon variant={pathname.includes('/account/dashboard') ? 'filled' : 'outlined'} />
              ),
              label: 'Dashboard',
              navigateTo: '/account/dashboard',
              onClick: handleCloseAccountDrawer,
            },
            {
              icon: <LogoutIcon />,
              label: 'Logout',
              navigateTo: '/',
              onClick: handleCloseAccountDrawer,
            },
          ]}
          subHeader="Account"
        />

        <Divider />
      </StyledDrawer>
    </Box>
  );
}
