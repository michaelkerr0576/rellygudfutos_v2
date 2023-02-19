import Container from '@/components/layout/Container';
import useThemes from '@/hooks/useThemes';

export default function Footer(): JSX.Element {
  const { colorMode } = useThemes();

  return (
    <footer>
      <Container>Footer: {colorMode}</Container>
    </footer>
  );
}
