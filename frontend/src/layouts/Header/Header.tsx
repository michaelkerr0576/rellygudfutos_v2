import { Link } from 'react-router-dom';

import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Container from '@/components/layout/Container';
import Stack from '@/components/layout/Stack';
import Drawer from '@/components/navigation/Drawer';

export default function Header(): JSX.Element {
  return (
    <header>
      <Container>
        <Stack horizontalAlignment="spaceBetween" verticalAlignment="center">
          <div>rellygudfutos</div>

          <Drawer>
            <>
              <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                  (text, index): JSX.Element => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ),
                )}
              </List>
              <Divider />
              <List>
                {['All mail', 'Trash', 'Spam'].map(
                  (text, index): JSX.Element => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ),
                )}
              </List>
            </>
          </Drawer>
        </Stack>
      </Container>

      <ul>
        <li>
          <Link to="/gallery">Gallery</Link>
        </li>
        <li>
          <Link to="/gallery/123">Gallery Photo</Link>
        </li>
        <li>
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link to="/admin/login">Login</Link>
        </li>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
      </ul>
    </header>
  );
}
