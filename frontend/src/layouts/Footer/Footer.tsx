import useThemes from '@/hooks/useThemes';

export default function Footer(): JSX.Element {
  const { colorMode } = useThemes();

  return <div>Footer: {colorMode}</div>;
}
