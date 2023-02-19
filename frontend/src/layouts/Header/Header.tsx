import { Link } from 'react-router-dom';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Box from '@/components/layout/Box';
import Container from '@/components/layout/Container';
import Stack from '@/components/layout/Stack';
import Drawer from '@/components/navigation/Drawer';
import useThemes from '@/hooks/useThemes';

export default function Header(): JSX.Element {
  const { colorMode, toggleColorMode } = useThemes();

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

        <Box>text</Box>
        <Box
          style={{
            alignItems: 'center',
            bgcolor: 'background.default',
            borderRadius: 1,
            color: 'text.primary',
            display: 'flex',
            justifyContent: 'center',
            p: 3,
            width: '100%',
          }}
        >
          {colorMode} mode
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {colorMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </ul>
    </header>
  );
}
