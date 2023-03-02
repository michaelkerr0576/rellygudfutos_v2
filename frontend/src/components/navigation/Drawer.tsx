import { styled } from '@mui/material/styles';
import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer';

import ExpandIcon from '@/assets/icons/ExpandIcon';

import IconButton from '../inputs/IconButton';
import Box from '../layout/Box';
import Grid from '../layout/Grid';
import Paper from '../surfaces/Paper';

export const BOTTOM_DRAWER_MOBILE_TOP_OFFSET = '90px';
export const FIXED_TOGGLE_DRAWER_BUTTON_HEIGHT = '45px';

type Anchor = 'left' | 'right' | 'bottom';

export interface DrawerProps {
  anchor: Anchor;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const StyledMuiSwipeableDrawer = styled(MuiSwipeableDrawer)(({ theme }): { [key: string]: any } => ({
  '.rgf_drawer__children': {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 2),
  },
  '.rgf_drawer__expandDrawer': {
    left: 0,
    position: 'fixed',
    right: 0,
    zIndex: theme.zIndex.drawer,
  },
  '.rgf_list, .rgf_divider': {
    marginLeft: -16,
    marginRight: -16,
  },

  [theme.breakpoints.up('tablet')]: {
    '.rgf_drawer__children': {
      height: 'auto',
    },
  },
}));

export default function Drawer(props: DrawerProps): JSX.Element {
  const { anchor, children, isOpen, setIsOpen } = props;

  const isBottomDrawer = anchor === 'bottom';

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
      {isBottomDrawer && (
        <Box className="rgf_drawer__expandDrawer">
          <Paper elevation={1}>
            <Grid horizontalAlignment="center">
              <IconButton ariaLabel="less" onClick={(): void => setIsOpen(false)} padding="small">
                <ExpandIcon type={isOpen ? 'less' : 'more'} size="large" />
              </IconButton>
            </Grid>
          </Paper>
        </Box>
      )}

      <Box
        className="rgf_drawer__children"
        style={{
          height: isBottomDrawer ? `calc(100vh - ${BOTTOM_DRAWER_MOBILE_TOP_OFFSET})` : 'auto',
          width: isBottomDrawer ? 'auto' : 250,
        }}
      >
        {children}
      </Box>
    </StyledMuiSwipeableDrawer>
  );
}
