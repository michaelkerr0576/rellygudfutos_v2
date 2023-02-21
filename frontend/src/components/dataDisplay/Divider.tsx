import MuiDivider from '@mui/material/Divider';

type Orientation = 'horizontal' | 'vertical';

interface DividerProps {
  orientation?: Orientation;
}

export default function Divider(props: DividerProps): JSX.Element {
  const { orientation = 'horizontal' } = props;

  return <MuiDivider orientation={orientation} flexItem={orientation === 'vertical'} />;
}
