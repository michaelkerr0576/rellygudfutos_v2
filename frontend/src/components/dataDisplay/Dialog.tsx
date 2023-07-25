import { MouseEventHandler } from 'react';
import clsx from 'clsx';

import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import BackIcon from '@/assets/icons/BackIcon';
import CloseIcon from '@/assets/icons/CloseIcon';
import MoreOptionsIcon from '@/assets/icons/MoreOptionsIcon';
import { FIXED_HEADER_HEIGHT } from '@/layouts/Header/constants';
import { FIXED_BOTTOM_APP_BAR_HEIGHT } from '@/utils/constants';

import IconButton, { ICON_BUTTON_HEIGHT_WIDTH } from '../inputs/IconButton';
import Box from '../layout/Box';
import Stack from '../layout/Stack';
import Paper from '../surfaces/Paper';

import Typography from './Typography';

type MaxWidth = 'mobile' | 'tablet' | 'laptop' | 'desktop';

export interface DialogProps {
  children: React.ReactNode;
  className?: MuiDialogProps['className'];
  dialogActions: JSX.Element;
  isOpen: boolean;
  maxWidth?: MaxWidth;
  onMoreOptionsClick?: MouseEventHandler<HTMLButtonElement>;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
}

const StyledMuiDialog = styled(MuiDialog)(({ theme }): { [key: string]: any } => ({
  '.MuiDialogActions-root': {
    display: 'inherit',
    height: FIXED_BOTTOM_APP_BAR_HEIGHT,
    justifyContent: 'inherit',
    padding: theme.spacing(0.86, 1),
  },
  '.MuiDialogContent-root': {
    minHeight: '400px',
    padding: theme.spacing(1, 2),
  },
  '.MuiDialogTitle-root': {
    height: FIXED_HEADER_HEIGHT,
    padding: theme.spacing(1, 2),
  },
  '.rgf-dialog--titleCloseButton': {
    order: 1,
  },
  '.rgf-dialog--titleMoreOptionsButton': {
    order: 3,
    width: ICON_BUTTON_HEIGHT_WIDTH,
  },
  '.rgf-dialog--titleText': {
    order: 2,
  },

  [theme.breakpoints.up('laptop')]: {
    '.rgf-dialog--titleCloseButton': {
      order: 3,
    },
    '.rgf-dialog--titleMoreOptionsButton': {
      order: 1,
    },
  },
}));

export default function Dialog(props: DialogProps): JSX.Element {
  const {
    children,
    className = '',
    dialogActions,
    isOpen,
    maxWidth = 'tablet',
    onMoreOptionsClick = undefined,
    setIsOpen,
    title = '',
  } = props;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.between('mobile', 'laptop'));

  const renderDialogTitle = (): JSX.Element => {
    const showTitle = !!title;
    const showMoreOptionsButton = !!onMoreOptionsClick;

    const renderTitleText = (): JSX.Element => (
      <Typography
        align="center"
        className="rgf-dialog--titleText"
        id="dialog-title"
        maxLines={2}
        variant="h2"
      >
        {title}
      </Typography>
    );

    const renderCloseButton = (): JSX.Element => (
      <IconButton
        ariaLabel="close"
        className="rgf-dialog--titleCloseButton"
        edge={isSmallScreen ? 'start' : 'end'}
        onClick={(): void => setIsOpen(false)}
      >
        {isSmallScreen ? <BackIcon /> : <CloseIcon />}
      </IconButton>
    );

    const renderOptionsButton = (): JSX.Element => (
      <IconButton
        ariaLabel="more options"
        className="rgf-dialog--titleMoreOptionsButton"
        edge={isSmallScreen ? 'end' : 'start'}
        onClick={onMoreOptionsClick}
      >
        <MoreOptionsIcon />
      </IconButton>
    );

    const renderOptionsButtonPlaceholder = (): JSX.Element => (
      <Box className="rgf-dialog--titleMoreOptionsButton" />
    );

    return (
      <Paper className="rgf-dialog--title" elevation={1}>
        <MuiDialogTitle>
          <Stack alignItems="center" justifyContent="spaceBetween">
            {renderCloseButton()}

            {showTitle && renderTitleText()}

            {showMoreOptionsButton ? renderOptionsButton() : renderOptionsButtonPlaceholder()}
          </Stack>
        </MuiDialogTitle>
      </Paper>
    );
  };

  const renderDialogActions = (): JSX.Element => (
    <Paper className="rgf-dialog--actions" elevation={24}>
      <MuiDialogActions>{dialogActions}</MuiDialogActions>
    </Paper>
  );

  return (
    <StyledMuiDialog
      aria-describedby="dialog-description"
      aria-labelledby="dialog-title"
      className={clsx('rgf-dialog', { [className]: !!className })}
      fullScreen={isSmallScreen}
      fullWidth
      maxWidth={maxWidth}
      onClose={(): void => setIsOpen(false)}
      open={isOpen}
      scroll="paper"
    >
      {renderDialogTitle()}

      <MuiDialogContent className="rgf-dialog--content">{children}</MuiDialogContent>

      {renderDialogActions()}
    </StyledMuiDialog>
  );
}
