import clsx from 'clsx';

import MuiBottomNavigation, {
  BottomNavigationProps as MuiBottomNavigationProps,
} from '@mui/material/BottomNavigation';
import MuiBottomNavigationAction, {
  BottomNavigationActionProps as MuiBottomNavigationPropsAction,
} from '@mui/material/BottomNavigationAction';
import { styled } from '@mui/material/styles';

import Paper from '../surfaces/Paper';

type Action = {
  icon: JSX.Element;
  label: string;
  onClick: MuiBottomNavigationPropsAction['onClick'];
  value: string;
};

export interface BottomNavigationProps {
  actions: Action[];
  className?: MuiBottomNavigationProps['className'];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const StyledBottomNavigation = styled('div')(({ theme }): { [key: string]: any } => ({
  bottom: 0,
  left: 0,
  position: 'fixed',
  right: 0,
  zIndex: theme.zIndex.appBar,
}));

export default function BottomNavigation(props: BottomNavigationProps): JSX.Element {
  const { actions, className = '', selectedValue, setSelectedValue } = props;

  const handleOnChange = (_event: React.SyntheticEvent, newValue: string): void => setSelectedValue(newValue);

  const renderActions = (): JSX.Element[] =>
    actions.map(
      (action: Action): JSX.Element => (
        <MuiBottomNavigationAction
          icon={action.icon}
          key={action.value}
          label={action.label}
          onClick={action.onClick}
          value={action.value}
        />
      ),
    );

  return (
    <StyledBottomNavigation className={clsx('rgf_bottomNavigation', { [className]: className })}>
      <Paper elevation={24}>
        <MuiBottomNavigation value={selectedValue} onChange={handleOnChange}>
          {renderActions()}
        </MuiBottomNavigation>
      </Paper>
    </StyledBottomNavigation>
  );
}
