import clsx from 'clsx';

import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import MuiAlertTitle from '@mui/material/AlertTitle';
import { styled } from '@mui/material/styles';

export interface AlertProps {
  className?: MuiAlertProps['className'];
  message: string;
  severity: MuiAlertProps['severity'];
}

const StyledMuiAlert = styled(MuiAlert)(({ theme }): { [key: string]: any } => ({
  // #region Mui Overrides
  '.MuiAlertTitle-root': {
    fontWeight: theme.typography.fontWeightBold,
  },
  // #endregion
}));

export default function Alert(props: AlertProps): JSX.Element {
  const { className = '', message, severity } = props;

  const getTitleText = (): string => {
    switch (severity) {
      case 'success':
        return 'Success';
      case 'info':
        return 'Info';
      case 'warning':
        return 'Warning';
      default:
        return 'Error';
    }
  };

  const alertStyles = clsx('rgf-alert', `rgf-alert--${severity}`, {
    [className]: !!className,
  });

  return (
    <StyledMuiAlert className={alertStyles} severity={severity}>
      <MuiAlertTitle>{getTitleText()}</MuiAlertTitle>
      {message}
    </StyledMuiAlert>
  );
}
