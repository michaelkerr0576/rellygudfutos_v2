import { styled } from '@mui/material/styles';
import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer';

import RellygudfutosLogo from '@/assets/logos/RellygudfutosLogo';

import Divider from '../dataDisplay/Divider';
import IconButton from '../inputs/IconButton';
import Box from '../layout/Box';

export interface DrawerProps {
  children: React.ReactNode;
  icon?: JSX.Element;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const StyledMuiSwipeableDrawer = styled(MuiSwipeableDrawer)(({ theme }): { [key: string]: any } => ({
  '.MuiList-root': {
    width: 250,
  },
  '.rgf_drawer__children': {
    '.rgf_divider': {
      marginLeft: -16,
      marginRight: -16,
    },
    '.rgf_rellygudfutosLogo': {
      padding: theme.spacing(2.5, 0, 2),
    },
    padding: theme.spacing(0, 2),
  },
}));

export default function Drawer(props: DrawerProps): JSX.Element {
  const { children, icon = null, isOpen, setIsOpen } = props;

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

  const renderDrawer = (): JSX.Element => (
    <StyledMuiSwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <Box className="rgf_drawer__children">
        <RellygudfutosLogo size="small" />

        <Divider />

        {children}
      </Box>
    </StyledMuiSwipeableDrawer>
  );

  if (icon) {
    return (
      <Box className="rgf_drawer">
        <IconButton ariaLabel="menu" onClick={toggleDrawer(true)}>
          {icon}
        </IconButton>

        {renderDrawer()}
      </Box>
    );
  }

  return <Box className="rgf_drawer">{renderDrawer()}</Box>;
}
