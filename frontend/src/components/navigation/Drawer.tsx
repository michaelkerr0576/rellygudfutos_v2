import { useState } from 'react';

import Box from '@mui/material/Box';
import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer';

import MenuIcon from '@/assets/icons/MenuIcon';

import Button from '../inputs/Button';

export interface DrawerProps {
  children: JSX.Element;
}

export default function Drawer(props: DrawerProps): JSX.Element {
  const { children } = props;

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer =
    (isOpen: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent): void => {
      const ìsTabOrShiftKeydown =
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift');

      if (ìsTabOrShiftKeydown) {
        return;
      }

      setIsDrawerOpen(isOpen);
    };

  const renderList = (): JSX.Element => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {children}
    </Box>
  );

  return (
    <>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <Button onClick={toggleDrawer(true)}>
        <>
          <MenuIcon /> MENU
        </>
      </Button>

      <Button onClick={toggleDrawer(true)}>MENU</Button>

      <MuiSwipeableDrawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {renderList()}
      </MuiSwipeableDrawer>
    </>
  );
}
