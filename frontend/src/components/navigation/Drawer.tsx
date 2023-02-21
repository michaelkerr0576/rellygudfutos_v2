import { useEffect, useState } from 'react';

import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer';

import IconButton from '../inputs/IconButton';
import Box from '../layout/Box';

export interface DrawerProps {
  children: React.ReactNode;
  icon?: JSX.Element;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export default function Drawer(props: DrawerProps): JSX.Element {
  const { children, icon, isOpen = false, setIsOpen } = props;

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(isOpen);

  useEffect((): void => {
    setIsDrawerOpen(isOpen);
  }, [isOpen]);

  const toggleDrawer =
    (isOpenToggle: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent): void => {
      const ìsTabOrShiftKeydown =
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift');

      if (ìsTabOrShiftKeydown) {
        return;
      }

      if (setIsOpen) {
        setIsOpen(isOpenToggle);
      } else {
        setIsDrawerOpen(isOpenToggle);
      }
    };

  const renderList = (): JSX.Element => (
    <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} style={{ width: 250 }}>
      {children}
    </Box>
  );

  const renderDrawer = (): JSX.Element => (
    <MuiSwipeableDrawer
      anchor="left"
      open={isDrawerOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      {renderList()}
    </MuiSwipeableDrawer>
  );

  if (icon) {
    return (
      <>
        <IconButton ariaLabel="menu" onClick={toggleDrawer(true)}>
          {icon}
        </IconButton>

        {renderDrawer()}
      </>
    );
  }

  return renderDrawer();
}

Drawer.defaultProps = {
  icon: null,
  isOpen: false,
  setIsOpen: undefined,
};
