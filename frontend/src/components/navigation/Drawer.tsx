import { useTheme } from '@mui/material/styles';
import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer';

import Divider from '../dataDisplay/Divider';
import Logo from '../dataDisplay/Logo';
import IconButton from '../inputs/IconButton';
import Box from '../layout/Box';

export interface DrawerProps {
  children: React.ReactNode;
  icon?: JSX.Element;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Drawer(props: DrawerProps): JSX.Element {
  const { children, icon = null, isOpen, setIsOpen } = props;

  const theme = useTheme();

  const toggleDrawer =
    (isDrawerOpen: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent): void => {
      const ìsTabOrShiftKeydown =
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift');

      if (ìsTabOrShiftKeydown) {
        return;
      }

      setIsOpen(isDrawerOpen);
    };

  const renderList = (): JSX.Element => (
    <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} style={{ width: 250 }}>
      {children}
    </Box>
  );

  const renderDrawer = (): JSX.Element => (
    <MuiSwipeableDrawer anchor="left" open={isOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
      <Box style={{ padding: theme.spacing(2, 2, 1) }}>
        <Logo size="small" />
      </Box>

      <Divider />

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
