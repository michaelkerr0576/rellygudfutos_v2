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

interface ListItem {
  action?: JSX.Element;
  icon: JSX.Element;
  label: string;
  navigateTo?: ReactRouterLinkProps['to'];
  onClick?: MuiListItemButtonProps['onClick'];
}

export interface ListProps {
  className?: MuiListProps['className'];
  listItems: ListItem[];
  subHeader?: string;
}

const StyledList = styled(MuiList)((): { [key: string]: any } => ({
  // #region Mui Overrides
  '.MuiListSubheader-root': {
    backgroundColor: 'inherit',
  },
  // #endregion
}));

export default function List(props: ListProps): JSX.Element {
  const { className = '', listItems, subHeader = '' } = props;

  const renderListItems = (): JSX.Element[] => {
    const renderListItem = (listItem: ListItem): JSX.Element => {
      const { action = null, icon, label, onClick = undefined } = listItem;

      return (
        <MuiListItemButton onClick={onClick}>
          <MuiListItemIcon>{icon}</MuiListItemIcon>
          <MuiListItemText primary={label} />
          {action}
        </MuiListItemButton>
      );
    };

    return listItems.map((listItem: ListItem): JSX.Element => {
      const { label, navigateTo = '' } = listItem;

      if (navigateTo) {
        return (
          <MuiListItem key={label} disablePadding component={Link} to={navigateTo}>
            {renderListItem(listItem)}
          </MuiListItem>
        );
      }

      return (
        <MuiListItem key={label} disablePadding>
          {renderListItem(listItem)}
        </MuiListItem>
      );
    });
  };

  const listStyles = clsx('rgf-list', {
    [className]: !!className,
  });

  return (
    <StyledList className={listStyles} subheader={<MuiListSubheader>{subHeader}</MuiListSubheader>}>
      {renderListItems()}
    </StyledList>
  );
}
