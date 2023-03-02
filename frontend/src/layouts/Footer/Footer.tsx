import { styled } from '@mui/material/styles';

import Container from '@/components/layout/Container';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const StyledFooter = styled('footer')(({ theme }): { [key: string]: any } => ({
  '.rgf_container': {
    padding: theme.spacing(1, 2),
  },
}));

export default function Footer(): JSX.Element {
  return (
    <ErrorBoundary identifier="Footer">
      <StyledFooter className="rgf_footer">
        <Container>Footer</Container>
      </StyledFooter>
    </ErrorBoundary>
  );
}
