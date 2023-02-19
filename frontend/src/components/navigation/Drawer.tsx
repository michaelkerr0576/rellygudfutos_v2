import { useState } from 'react';

import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer';

import MenuIcon from '@/assets/icons/MenuIcon';

import IconButton from '../inputs/IconButton';
import Box from '../layout/Box';

export interface DrawerProps {
  children: React.ReactNode;
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
    <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} style={{ width: 250 }}>
      {children}
    </Box>
  );

  return (
    <>
      <IconButton ariaLabel="menu" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>

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
