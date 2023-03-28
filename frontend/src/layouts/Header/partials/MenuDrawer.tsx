import { useLocation, useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import DarkModeIcon from '@/assets/icons/DarkModeIcon';
import GalleryIcon from '@/assets/icons/GalleryIcon';
import MenuIcon from '@/assets/icons/MenuIcon';
import { IconProps } from '@/assets/icons/types/iconTypes';
import RellygudfutosLogo from '@/assets/logos/RellygudfutosLogo';
import Divider from '@/components/dataDisplay/Divider';
import List from '@/components/dataDisplay/List';
import IconButton from '@/components/inputs/IconButton';
import LogoButton from '@/components/inputs/LogoButton';
import Switch from '@/components/inputs/Switch';
import Box from '@/components/layout/Box';
import Stack from '@/components/layout/Stack';
import Drawer from '@/components/navigation/Drawer';
import useMenu from '@/hooks/useMenu';
import useThemes from '@/hooks/useThemes';
import { ColorMode } from '@/ts/store';

const StyledMenuDrawer = styled('div')(({ theme }): { [key: string]: any } => ({
  '.rgf_menuDrawer__header': {
    padding: theme.spacing(1, 0),
  },
}));

export default function MenuDrawer(): JSX.Element {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useThemes();
  const { isMenuDrawerOpen, toggleMenuDrawer } = useMenu();

  const renderMenuButton = (isDrawerOpen: boolean, size?: IconProps['size']): JSX.Element => (
    <IconButton ariaLabel="menu" edge="start" onClick={(): void => toggleMenuDrawer(isDrawerOpen)}>
      <MenuIcon size={size} variant={isMenuDrawerOpen ? 'filled' : 'outlined'} />
    </IconButton>
  );

  const renderDrawerHeader = (): JSX.Element => {
    const handleLogoButtonClick = (): void => {
      navigate('/');
      toggleMenuDrawer(false);
    };

    return (
      <Stack className="rgf_menuDrawer__header" verticalAlignment="center" spacing={0.5}>
        {renderMenuButton(false)}

        <LogoButton ariaLabel="really good photos" onClick={(): void => handleLogoButtonClick()}>
          <RellygudfutosLogo size="small" />
        </LogoButton>
      </Stack>
    );
  };

  return (
    <Box className="rgf_menuDrawer">
      {renderMenuButton(true, 'large')}

      <Drawer anchor="left" isOpen={isMenuDrawerOpen} setIsOpen={toggleMenuDrawer}>
        <StyledMenuDrawer className="rgf_menuDrawer__children">
          {renderDrawerHeader()}

          <Divider />

          <List
            listItems={[
              {
                icon: <GalleryIcon variant={pathname === '/' ? 'filled' : 'outlined'} />,
                label: 'Gallery',
                navigateTo: '/',
                onClick: (): void => toggleMenuDrawer(false),
              },
            ]}
            subHeader="Navigation"
          />

          <Divider />

          <List
            listItems={[
              {
                action: (
                  <Switch
                    ariaLabel="switch-dark-mode"
                    edge="end"
                    isChecked={colorMode === ColorMode.DARK}
                    onChange={(): void => {}}
                  />
                ),
                icon: <DarkModeIcon variant={colorMode === ColorMode.DARK ? 'filled' : 'outlined'} />,
                label: 'Dark mode',
                onClick: toggleColorMode,
              },
            ]}
            subHeader="Settings"
          />

          <Divider />
        </StyledMenuDrawer>
      </Drawer>
    </Box>
  );
}
