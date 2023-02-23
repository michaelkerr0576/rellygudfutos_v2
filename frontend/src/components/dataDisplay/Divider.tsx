import MuiDivider from '@mui/material/Divider';

type Orientation = 'horizontal' | 'vertical';

export interface DividerProps {
  orientation?: Orientation;
}

export default function Divider(props: DividerProps): JSX.Element {
  const { orientation = 'horizontal' } = props;

  return (
    <MuiDivider className="rgf_divider" orientation={orientation} flexItem={orientation === 'vertical'} />
  );
}
