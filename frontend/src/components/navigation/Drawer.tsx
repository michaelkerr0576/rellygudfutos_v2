import { styled } from '@mui/material/styles';
import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer';

import RellygudfutosLogo from '@/assets/logos/RellygudfutosLogo';

import Divider from '../dataDisplay/Divider';

export interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const StyledMuiSwipeableDrawer = styled(MuiSwipeableDrawer)(({ theme }): { [key: string]: any } => ({
  '.MuiPaper-root': {
    width: 270,
  },
  '.rgf_rellygudfutosLogo': {
    padding: theme.spacing(2.5, 2, 2),
  },
  '.rgf_textField': {
    padding: theme.spacing(2, 2),
  },
}));

export default function Drawer(props: DrawerProps): JSX.Element {
  const { children, isOpen, setIsOpen } = props;

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
      anchor="left"
      className="rgf_drawer"
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      open={isOpen}
    >
      <RellygudfutosLogo size="small" />

      <Divider />

      {children}
    </StyledMuiSwipeableDrawer>
  );
}
