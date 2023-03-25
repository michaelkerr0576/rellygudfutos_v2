import clsx from 'clsx';

import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import MuiAlertTitle from '@mui/material/AlertTitle';
import { styled } from '@mui/material/styles';

export interface AlertProps {
  className?: MuiAlertProps['className'];
  message: string;
  severity: MuiAlertProps['severity'];
  suggestion: string;
}

const StyledMuiAlert = styled(MuiAlert)(({ theme }): { [key: string]: any } => ({
  '.MuiAlertTitle-root': {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default function Alert(props: AlertProps): JSX.Element {
  const { className = '', message, severity, suggestion } = props;

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

  return (
    <StyledMuiAlert className={clsx('rgf_alert', { [className]: className })} severity={severity}>
      <MuiAlertTitle>{getTitleText()}</MuiAlertTitle>
      {message}
      <strong>&nbsp;{suggestion}</strong>
    </StyledMuiAlert>
  );
}