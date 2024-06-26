import { forwardRef } from 'react';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';
import clsx from 'clsx';

import { styled } from '@mui/material/styles';

export interface LinkProps {
  children: React.ReactNode;
  className?: ReactRouterLinkProps['className'];
  to: ReactRouterLinkProps['to'];
}

const StyledLink = styled(ReactRouterLink)((): { [key: string]: any } => ({
  color: 'inherit',
  textDecoration: 'none',
  WebkitTapHighlightColor: 'transparent',
}));

function Link(props: LinkProps, ref: React.Ref<HTMLAnchorElement> | undefined): JSX.Element {
  const { children, className = '', to } = props;

  const linkStyles = clsx('rgf-link', {
    [className]: !!className,
  });

  return (
    <StyledLink className={linkStyles} ref={ref} to={to}>
      {children}
    </StyledLink>
  );
}

export default forwardRef(Link);
