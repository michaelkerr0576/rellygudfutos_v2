import MuiBottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { styled } from '@mui/material/styles';

import Paper from '../surfaces/Paper';

type Action = {
  icon: JSX.Element;
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  value: string;
};

export interface BottomNavigationProps {
  actions: Action[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const StyledBottomNavigation = styled('div')((): { [key: string]: any } => ({
  bottom: 0,
  left: 0,
  position: 'fixed',
  right: 0,
}));

export default function BottomNavigation(props: BottomNavigationProps): JSX.Element {
  const { actions, selectedValue, setSelectedValue } = props;

  const handleOnChange = (_event: React.SyntheticEvent, newValue: string): void => setSelectedValue(newValue);

  const renderActions = (): JSX.Element[] =>
    actions.map((action: Action): JSX.Element => {
      const { icon, label, onClick, value } = action;

      return <BottomNavigationAction icon={icon} key={value} label={label} onClick={onClick} value={value} />;
    });

  return (
    <StyledBottomNavigation className="rgf_bottomNavigation">
      <Paper elevation={24}>
        <MuiBottomNavigation value={selectedValue} onChange={handleOnChange}>
          {renderActions()}
        </MuiBottomNavigation>
      </Paper>
    </StyledBottomNavigation>
  );
}
