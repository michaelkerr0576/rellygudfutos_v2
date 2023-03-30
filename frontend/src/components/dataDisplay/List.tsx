import { LinkProps as ReactRouterLinkProps } from 'react-router-dom';
import clsx from 'clsx';

import MuiList, { ListProps as MuiListProps } from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemButton, {
  ListItemButtonProps as MuiListItemButtonProps,
} from '@mui/material/ListItemButton';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiListItemText from '@mui/material/ListItemText';
import MuiListSubheader from '@mui/material/ListSubheader';
import { styled } from '@mui/material/styles';

import Link from '@/components/navigation/Link';

type ListItem = {
  action?: JSX.Element;
  icon: JSX.Element;
  label: string;
  navigateTo?: ReactRouterLinkProps['to'];
  onClick?: MuiListItemButtonProps['onClick'];
};

export interface ListProps {
  className?: MuiListProps['className'];
  listItems: ListItem[];
  subHeader?: string;
}

const StyledMuiList = styled(MuiList)((): { [key: string]: any } => ({
  '.MuiListSubheader-root': {
    backgroundColor: 'inherit',
  },
}));

export default function List(props: ListProps): JSX.Element {
  const { className = '', listItems, subHeader = '' } = props;

  const renderListItem = (listItem: ListItem): JSX.Element => {
    const { action = null, icon, label, onClick = (): void => {} } = listItem;

    return (
      <MuiListItemButton onClick={onClick}>
        <MuiListItemIcon>{icon}</MuiListItemIcon>
        <MuiListItemText primary={label} />
        {action}
      </MuiListItemButton>
    );
  };

  const renderListItems = (): JSX.Element[] =>
    listItems.map((listItem: ListItem): JSX.Element => {
      const { label, navigateTo = '' } = listItem;

      if (navigateTo) {
        return (
          <MuiListItem disablePadding key={label} component={Link} to={navigateTo}>
            {renderListItem(listItem)}
          </MuiListItem>
        );
      }

      return (
        <MuiListItem disablePadding key={label}>
          {renderListItem(listItem)}
        </MuiListItem>
      );
    });

  return (
    <StyledMuiList
      className={clsx('rgf-list', { [className]: !!className })}
      subheader={<MuiListSubheader>{subHeader}</MuiListSubheader>}
    >
      {renderListItems()}
    </StyledMuiList>
  );
}
