import clsx from 'clsx';

import { styled } from '@mui/material/styles';

import Box, { BoxProps } from '../layout/Box';

export interface IconButtonProps {
  ariaLabel: BoxProps['ariaLabel'];
  children: React.ReactNode;
  className?: BoxProps['className'];
  onClick: BoxProps['onClick'];
}

const StyledBox = styled(Box)((): { [key: string]: any } => ({
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
}));

export default function LogoButton(props: IconButtonProps): JSX.Element {
  const { ariaLabel, children, className = '', onClick } = props;

  return (
    <StyledBox
      ariaLabel={ariaLabel}
      ariaRole="button"
      className={clsx('rgf-logoButton', { [className]: !!className })}
      onClick={onClick}
    >
      {children}
    </StyledBox>
  );
}
