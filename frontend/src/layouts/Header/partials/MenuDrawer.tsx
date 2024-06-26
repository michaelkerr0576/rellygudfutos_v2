import { useLocation, useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import DarkModeIcon from '@/assets/icons/DarkModeIcon';
import GalleryIcon from '@/assets/icons/GalleryIcon';
import MenuIcon from '@/assets/icons/MenuIcon';
import RellygudfutosLogo from '@/assets/logos/RellygudfutosLogo';
import Divider from '@/components/dataDisplay/Divider';
import List from '@/components/dataDisplay/List';
import IconButton from '@/components/inputs/IconButton';
import LogoButton from '@/components/inputs/LogoButton';
import Switch from '@/components/inputs/Switch';
import Box from '@/components/layout/Box';
import Stack from '@/components/layout/Stack';
import Drawer from '@/components/navigation/Drawer';
import useMenu from '@/hooks/shared/useMenu';
import useThemes from '@/hooks/shared/useThemes';
import { ColorMode } from '@/types/store/theme.types';

const StyledMenuDrawer = styled(Drawer)(({ theme }): { [key: string]: any } => ({
  '.rgf': {
    '&-menuDrawer': {
      '&--header': {
        padding: theme.spacing(1, 0),
      },
    },
  },
}));

export default function MenuDrawer(): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { colorMode, handleToggleColorMode } = useThemes();
  const { handleCloseMenuDrawer, handleOpenMenuDrawer, handleToggleMenuDrawer, isMenuDrawerOpen } = useMenu();

  const renderMenuButton = (isDrawerOpen: boolean): JSX.Element => (
    <IconButton ariaLabel="menu" edge="start" onClick={(): void => handleToggleMenuDrawer(isDrawerOpen)}>
      <MenuIcon variant={isMenuDrawerOpen ? 'filled' : 'outlined'} />
    </IconButton>
  );

  const renderDrawerHeader = (): JSX.Element => {
    const handleLogoButtonClick = (): void => {
      navigate('/');
      handleCloseMenuDrawer();
    };

    return (
      <Stack className="rgf-menuDrawer--header" alignItems="center" spacing={0.5}>
        {renderMenuButton(false)}

        <LogoButton ariaLabel="really good photos" onClick={handleLogoButtonClick}>
          <RellygudfutosLogo size="small" />
        </LogoButton>
      </Stack>
    );
  };

  return (
    <Box className="rgf-menuDrawer">
      {renderMenuButton(true)}

      <StyledMenuDrawer
        anchor="left"
        isOpen={isMenuDrawerOpen}
        onClose={handleCloseMenuDrawer}
        onOpen={handleOpenMenuDrawer}
      >
        {renderDrawerHeader()}

        <Divider />

        <List
          listItems={[
            {
              icon: <GalleryIcon variant={pathname === '/' ? 'filled' : 'outlined'} />,
              label: 'Gallery',
              navigateTo: '/',
              onClick: handleCloseMenuDrawer,
            },
          ]}
          subHeader="Navigation"
        />

        <Divider />

        <List
          listItems={[
            {
              action: (
                <Switch ariaLabel="switch-dark-mode" edge="end" isChecked={colorMode === ColorMode.DARK} />
              ),
              icon: <DarkModeIcon variant={colorMode === ColorMode.DARK ? 'filled' : 'outlined'} />,
              label: 'Dark mode',
              onClick: handleToggleColorMode,
            },
          ]}
          subHeader="Settings"
        />

        <Divider />
      </StyledMenuDrawer>
    </Box>
  );
}
