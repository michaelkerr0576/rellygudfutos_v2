import MuiDivider, { DividerProps as MuiDividerProps } from '@mui/material/Divider';

export interface DividerProps {
  orientation?: MuiDividerProps['orientation'];
}

export default function Divider(props: DividerProps): JSX.Element {
  const { orientation = 'horizontal' } = props;

  return (
    <MuiDivider className="rgf_divider" orientation={orientation} flexItem={orientation === 'vertical'} />
  );
}
