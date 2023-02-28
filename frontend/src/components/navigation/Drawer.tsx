import { styled } from '@mui/material/styles';
import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer';

import Box from '../layout/Box';

type Anchor = 'left' | 'right' | 'bottom';

export interface DrawerProps {
  anchor: Anchor;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const StyledMuiSwipeableDrawer = styled(MuiSwipeableDrawer)(({ theme }): { [key: string]: any } => ({
  '.rgf_drawer__children': {
    padding: theme.spacing(2),
  },
  '.rgf_list, .rgf_divider': {
    marginLeft: -16,
    marginRight: -16,
  },
}));

export default function Drawer(props: DrawerProps): JSX.Element {
  const { anchor, children, isOpen, setIsOpen } = props;

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

  return (
    <StyledMuiSwipeableDrawer
      anchor={anchor}
      className="rgf_drawer"
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      open={isOpen}
    >
      <Box className="rgf_drawer__children" style={{ width: anchor === 'bottom' ? 'auto' : 250 }}>
        {children}
      </Box>
    </StyledMuiSwipeableDrawer>
  );
}
