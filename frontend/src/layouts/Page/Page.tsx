import Container from '@/components/layout/Container';

export interface PageProps {
  children: React.ReactNode;
}

export default function Page(props: PageProps): JSX.Element {
  const { children } = props;

  return (
    <main>
      <Container>{children}</Container>
    </main>
  );
}
