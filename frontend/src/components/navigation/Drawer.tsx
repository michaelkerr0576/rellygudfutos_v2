import clsx from 'clsx';

import { styled } from '@mui/material/styles';
import MuiSwipeableDrawer, {
  SwipeableDrawerProps as MuiSwipeableDrawerProps,
} from '@mui/material/SwipeableDrawer';

import ExpandIcon from '@/assets/icons/ExpandIcon';

import IconButton from '../inputs/IconButton';
import Box from '../layout/Box';
import Grid from '../layout/Grid';
import Paper from '../surfaces/Paper';

export const BOTTOM_DRAWER_MOBILE_TOP_OFFSET = 210;

type Anchor = 'left' | 'right' | 'bottom';

export interface DrawerProps {
  anchor: Anchor;
  children: React.ReactNode;
  className?: MuiSwipeableDrawerProps['className'];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const StyledMuiSwipeableDrawer = styled(MuiSwipeableDrawer)(({ theme }): { [key: string]: any } => ({
  '.rgf': {
    '&-drawer': {
      '&--children': {
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        padding: theme.spacing(0, 2),
      },
      '&--expandDrawerButton': {
        left: 0,
        position: 'sticky',
        right: 0,
        zIndex: theme.zIndex.drawer,
      },
    },
    '&-list, &-divider': {
      marginLeft: theme.spacing(-2),
      marginRight: theme.spacing(-2),
    },
  },

  [theme.breakpoints.up('laptop')]: {
    '.rgf': {
      '&-drawer': {
        '&--children': {
          height: 'auto',
        },
      },
    },
  },
}));

export default function Drawer(props: DrawerProps): JSX.Element {
  const { anchor, children, className = '', isOpen, setIsOpen } = props;

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
      className={clsx('rgf-drawer', { [className]: !!className })}
      disableSwipeToOpen
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      open={isOpen}
    >
      {isBottomDrawer && (
        <Paper className="rgf-drawer--expandDrawerButton" elevation={1}>
          <Grid justifyContent="center">
            <IconButton ariaLabel="less" onClick={(): void => setIsOpen(false)}>
              <ExpandIcon type={isOpen ? 'less' : 'more'} size="large" />
            </IconButton>
          </Grid>
        </Paper>
      )}

      <Box
        className="rgf-drawer--children"
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
