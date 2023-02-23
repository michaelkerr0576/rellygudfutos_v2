import { forwardRef } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';

export interface LinkProps {
  children: React.ReactNode;
  to: string;
}

const StyledReactRouterLink = styled(ReactRouterLink)((): { [key: string]: any } => ({
  color: 'inherit',
  textDecoration: 'none',
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
