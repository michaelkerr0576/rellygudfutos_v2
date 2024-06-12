import clsx from 'clsx';

import MuiTooltip, { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';

export interface TooltipProps {
  children: MuiTooltipProps['children'];
  className?: MuiTooltipProps['className'];
  label: string;
}

export default function Tooltip(props: TooltipProps): JSX.Element {
  const { children, className = '', label } = props;

  const tooltipStyles = clsx('rgf-tooltip', {
    [className]: !!className,
  });

  return (
    <MuiTooltip arrow className={tooltipStyles} describeChild placement="top" title={label}>
      {children}
    </MuiTooltip>
  );
}
