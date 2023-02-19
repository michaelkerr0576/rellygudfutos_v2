import { useState } from 'react';

import MuiBottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import Box from '../layout/Box';
import Paper from '../surfaces/Paper';

type Action = {
  icon: JSX.Element;
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  value: string;
};

export interface BottomNavigationProps {
  actions: Action[];
  initialValue: string;
}

export default function BottomNavigation(props: BottomNavigationProps): JSX.Element {
  const { actions, initialValue } = props;

  const [value, setValue] = useState<string>(initialValue);

  const handleOnChange = (_event: React.SyntheticEvent, newValue: string): void => setValue(newValue);

  const renderActions = actions.map(
    (action: Action): JSX.Element => (
      <BottomNavigationAction
        icon={action.icon}
        key={action.value}
        label={action.label}
        onClick={action.onClick}
        value={action.value}
      />
    ),
  );

  return (
    <Box style={{ bottom: 0, left: 0, position: 'fixed', right: 0 }}>
      <Paper elevation={24}>
        <MuiBottomNavigation value={value} onChange={handleOnChange}>
          {renderActions}
        </MuiBottomNavigation>
      </Paper>
    </Box>
  );
}
