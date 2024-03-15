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
  onClose: () => void;
  onOpen: () => void;
}

const StyledMuiSwipeableDrawer = styled(MuiSwipeableDrawer)(({ theme }): { [key: string]: any } => ({
  // #region Mui Overrides
  '.MuiListItemButton-root': {
    padding: theme.spacing(1, 1.5),
  },
  '.MuiListSubheader-root': {
    padding: theme.spacing(0, 1.5),
  },
  // #endregion
  '.rgf': {
    '&-drawer': {
      '&--children': {
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        padding: theme.spacing(0, 1.5),
      },
      '&--expandDrawerButton': {
        left: 0,
        position: 'sticky',
        right: 0,
        zIndex: theme.zIndex.drawer,
      },
    },
    '&-list, &-divider': {
      marginLeft: theme.spacing(-1.5),
      marginRight: theme.spacing(-1.5),
    },
  },

  [theme.breakpoints.up('laptop')]: {
    // #region Mui Overrides
    '.MuiListItemButton-root': {
      padding: theme.spacing(1, 2),
    },
    '.MuiListSubheader-root': {
      padding: theme.spacing(0, 2),
    },
    // #endregion
    '.rgf': {
      '&-drawer': {
        '&--children': {
          height: 'auto',
          padding: theme.spacing(0, 2),
        },
      },
      '&-list, &-divider': {
        marginLeft: theme.spacing(-2),
        marginRight: theme.spacing(-2),
      },
    },
  },
}));

export default function Drawer(props: DrawerProps): JSX.Element {
  const { anchor, children, className = '', isOpen, onClose, onOpen } = props;

  const isBottomDrawer = anchor === 'bottom';

  const drawerStyles = clsx('rgf-drawer', {
    [className]: !!className,
  });

  return (
    <StyledMuiSwipeableDrawer
      anchor={anchor}
      className={drawerStyles}
      disableSwipeToOpen
      onClose={onClose}
      onOpen={onOpen}
      open={isOpen}
    >
      {isBottomDrawer && (
        <Paper className="rgf-drawer--expandDrawerButton" elevation={1}>
          <Grid justifyContent="center">
            <IconButton ariaLabel="less" onClick={onClose}>
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
