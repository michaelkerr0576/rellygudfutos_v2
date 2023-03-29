import clsx from 'clsx';

import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

import CloseIcon from '@/assets/icons/CloseIcon';

import IconButton from '../inputs/IconButton';
import Stack from '../layout/Stack';
import Paper from '../surfaces/Paper';

import Typography from './Typography';

export interface DialogProps {
  children: React.ReactNode;
  className?: MuiDialogProps['className'];
  dialogActions: JSX.Element;
  isOpen: boolean;
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
  const { children, className = '', dialogActions, isOpen, setIsOpen, title } = props;

  return (
    <StyledMuiDialog
      aria-labelledby="dialog-title"
      className={clsx('rgf_dialog', { [className]: className })}
      fullScreen
      onClose={(): void => setIsOpen(false)}
      open={isOpen}
      scroll="paper"
    >
      <Paper elevation={1}>
        <MuiDialogTitle>
          <Stack horizontalAlignment="spaceBetween" verticalAlignment="center">
            <Typography id="dialog-title" variant="h3">
              {title}
            </Typography>

            <IconButton ariaLabel="close" edge="end" onClick={(): void => setIsOpen(false)} padding="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </MuiDialogTitle>
      </Paper>

      <MuiDialogContent>{children}</MuiDialogContent>

      <Paper elevation={24}>
        <MuiDialogActions>{dialogActions}</MuiDialogActions>
      </Paper>
    </StyledMuiDialog>
  );
}
