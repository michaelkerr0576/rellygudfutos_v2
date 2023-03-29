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
    '.rgf_stack': {
      minHeight: '40px',
    },

    maxHeight: '60px',
    overflow: 'hidden',
    padding: theme.spacing(1.25, 2),
  },
}));

export default function Dialog(props: DialogProps): JSX.Element {
  const { children, className = '', dialogActions, isOpen, maxWidth = 'tablet', setIsOpen, title } = props;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.between('mobile', 'laptop'));

  const renderDialogTitle = (): JSX.Element => {
    const renderTitleText = (): JSX.Element => (
      <Typography align="center" id="dialog-title" variant="h3">
        {title}
      </Typography>
    );

    const renderCloseButton = (): JSX.Element => (
      <IconButton
        ariaLabel="close"
        edge={isSmallScreen ? 'start' : 'end'}
        onClick={(): void => setIsOpen(false)}
      >
        {isSmallScreen ? <BackIcon /> : <CloseIcon />}
      </IconButton>
    );

    return (
      <Paper className="rgf_dialog__title" elevation={1}>
        <MuiDialogTitle>
          <Stack horizontalAlignment={isSmallScreen ? 'start' : 'spaceBetween'} verticalAlignment="center">
            <Box style={{ order: isSmallScreen ? 1 : 2 }}>{renderCloseButton()}</Box>

            <Box style={{ order: isSmallScreen ? 2 : 1 }}>{renderTitleText()}</Box>
          </Stack>
        </MuiDialogTitle>
      </Paper>
    );
  };

  const renderDialogActions = (): JSX.Element => (
    <Paper className="rgf_dialog__actions" elevation={24}>
      <MuiDialogActions>{dialogActions}</MuiDialogActions>
    </Paper>
  );

  return (
    <StyledMuiDialog
      aria-describedby="dialog-description"
      aria-labelledby="dialog-title"
      className={clsx('rgf_dialog', { [className]: className })}
      fullScreen={isSmallScreen}
      maxWidth={maxWidth}
      onClose={(): void => setIsOpen(false)}
      open={isOpen}
      scroll="paper"
    >
      {renderDialogTitle()}

      <MuiDialogContent className="rgf_dialog__content">{children}</MuiDialogContent>

      {renderDialogActions()}
    </StyledMuiDialog>
  );
}
