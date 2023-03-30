import { useLocation } from 'react-router-dom';

import { styled } from '@mui/material/styles';

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

const StyledAccountDrawer = styled('div')(({ theme }): { [key: string]: any } => ({
  '.rgf-accountDrawer--header': {
    padding: theme.spacing(1, 0),
  },
}));

export default function AccountDrawer(): JSX.Element {
  const { pathname } = useLocation();
  const { isAccountDrawerOpen, toggleAccountDrawer } = useMenu();

  const renderAccountButton = (isDrawerOpen: boolean, size?: Size): JSX.Element => (
    <IconButton ariaLabel="account" edge="end" onClick={(): void => toggleAccountDrawer(isDrawerOpen)}>
      <Avatar size={size}>M</Avatar>
    </IconButton>
  );

  const renderDrawerHeader = (): JSX.Element => (
    <Stack
      className="rgf-accountDrawer--header"
      horizontalAlignment="spaceBetween"
      verticalAlignment="center"
    >
      <Typography variant="h3">Michael Kerr</Typography>

      {renderAccountButton(false)}
    </Stack>
  );

  return (
    <Box className="rgf-accountDrawer">
      {renderAccountButton(true, 'large')}

      <Drawer anchor="right" isOpen={isAccountDrawerOpen} setIsOpen={toggleAccountDrawer}>
        <StyledAccountDrawer className="rgf-accountDrawer--children">
          {renderDrawerHeader()}

          <Divider />

          <List
            listItems={[
              {
                icon: (
                  <DashboardIcon variant={pathname.includes('/account/dashboard') ? 'filled' : 'outlined'} />
                ),
                label: 'Dashboard',
                navigateTo: '/account/dashboard',
                onClick: (): void => toggleAccountDrawer(false),
              },
              {
                icon: <LoginIcon />,
                label: 'Login',
                navigateTo: '/account/login',
                onClick: (): void => toggleAccountDrawer(false),
              },
            ]}
            subHeader="Account"
          />

          <Divider />
        </StyledAccountDrawer>
      </Drawer>
    </Box>
  );
}
