import FilterAltIcon from '@/assets/icons/FilterAltIcon';
import HomeIcon from '@/assets/icons/HomeIcon';
import PhotoGridIcon from '@/assets/icons/PhotoGridIcon';
import PhotoListIcon from '@/assets/icons/PhotoListIcon';
import ToggleDarkModeIcon from '@/assets/icons/ToggleDarkModeIcon';
import Box from '@/components/layout/Box';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import useThemes from '@/hooks/shared/useThemes';
import { NavigationValue } from '@/types/store/gallery.types';

import useGallery from '../hooks/useGallery';

export default function GalleryBottomNavigation(): JSX.Element {
  const { handleToggleColorMode, colorMode } = useThemes();

  const { handleChangeNavigationValue, handleOpenFilterDrawer, navigationValue } = useGallery();

  return (
    <Box className="rgf-galleryBottomNavigation">
      <BottomNavigation
        actions={[
          {
            icon: <HomeIcon variant={navigationValue === NavigationValue.HOME ? 'filled' : 'outlined'} />,
            label: 'Home',
            // TODO - fix scrollTo top and make scroll.utils file
            onClick: (): void => window.scrollTo(0, 0),
            value: NavigationValue.HOME,
          },
          {
            icon: (
              <PhotoGridIcon variant={navigationValue === NavigationValue.GRID ? 'filled' : 'outlined'} />
            ),
            label: 'Grid',
            value: NavigationValue.GRID,
          },
          {
            icon: <FilterAltIcon />,
            label: 'Filter',
            onClick: handleOpenFilterDrawer,
            value: NavigationValue.SEARCH,
          },
          {
            icon: (
              <PhotoListIcon variant={navigationValue === NavigationValue.LIST ? 'filled' : 'outlined'} />
            ),
            label: 'List',
            value: NavigationValue.LIST,
          },
          {
            icon: (
              <ToggleDarkModeIcon
                type={colorMode}
                variant={navigationValue === NavigationValue.MODE ? 'filled' : 'outlined'}
              />
            ),
            label: colorMode === 'dark' ? 'Dark' : 'Light',
            onClick: handleToggleColorMode,
            value: NavigationValue.MODE,
          },
        ]}
        selectedValue={navigationValue}
        setSelectedValue={handleChangeNavigationValue}
      />
    </Box>
  );
}
