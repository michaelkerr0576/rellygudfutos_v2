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

export default function Link(props: LinkProps): JSX.Element {
  const { children, to } = props;

  return <StyledReactRouterLink to={to}>{children}</StyledReactRouterLink>;
}
