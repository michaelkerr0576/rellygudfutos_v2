import { forwardRef } from 'react';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';

import { styled } from '@mui/material/styles';

export interface LinkProps {
  children: React.ReactNode;
  to: ReactRouterLinkProps['to'];
}

const StyledReactRouterLink = styled(ReactRouterLink)((): { [key: string]: any } => ({
  color: 'inherit',
  textDecoration: 'none',
  WebkitTapHighlightColor: 'transparent',
}));

function Link(props: LinkProps, ref: React.Ref<HTMLAnchorElement> | undefined): JSX.Element {
  const { children, to } = props;

  return (
    <StyledReactRouterLink className="rgf_link" ref={ref} to={to}>
      {children}
    </StyledReactRouterLink>
  );
}

export default forwardRef(Link);
