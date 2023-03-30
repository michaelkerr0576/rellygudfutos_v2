import clsx from 'clsx';

import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import BackIcon from '@/assets/icons/BackIcon';
import CloseIcon from '@/assets/icons/CloseIcon';

import IconButton from '../inputs/IconButton';
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
  setIsOpen: (isOpen: boolean) => void;
  title: string;
}

const StyledMuiDialog = styled(MuiDialog)(({ theme }): { [key: string]: any } => ({
  '.MuiDialogActions-root': {
    height: '56px',
  },
  '.MuiDialogContent-root': {
    padding: theme.spacing(1, 2),
  },
  '.MuiDialogTitle-root': {
    '.rgf-stack': {
      minHeight: '40px',
    },

    maxHeight: '60px',
    padding: theme.spacing(1.25, 2),
  },
  '.rgf-dialog--titleCloseButton': {
    order: 1,
  },
  '.rgf-dialog--titleText': {
    order: 2,
  },

  [theme.breakpoints.up('laptop')]: {
    '.rgf-dialog--titleCloseButton': {
      order: 2,
    },
    '.rgf-dialog--titleText': {
      order: 1,
    },
  },
}));

export default function Dialog(props: DialogProps): JSX.Element {
  const { children, className = '', dialogActions, isOpen, maxWidth = 'tablet', setIsOpen, title } = props;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.between('mobile', 'laptop'));

  const renderDialogTitle = (): JSX.Element => {
    const renderTitleText = (): JSX.Element => (
      <Typography
        align="center"
        className="rgf-dialog--titleText"
        id="dialog-title"
        maxLines={2}
        variant="h3"
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

    return (
      <Paper className="rgf-dialog--title" elevation={1}>
        <MuiDialogTitle>
          <Stack horizontalAlignment={isSmallScreen ? 'start' : 'spaceBetween'} verticalAlignment="center">
            {renderCloseButton()}

            {renderTitleText()}
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
