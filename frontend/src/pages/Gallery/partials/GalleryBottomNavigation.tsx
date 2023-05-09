import HomeIcon from '@/assets/icons/HomeIcon';
import PhotoGridIcon from '@/assets/icons/PhotoGridIcon';
import PhotoListIcon from '@/assets/icons/PhotoListIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import ToggleDarkModeIcon from '@/assets/icons/ToggleDarkModeIcon';
import Box from '@/components/layout/Box';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import useThemes from '@/hooks/shared/useThemes';
import { GalleryNavigationValue } from '@/ts/store';

import useGallery from '../hooks/useGallery';

import SearchDrawer from './SearchDrawer';

export const FIXED_GALLERY_BOTTOM_NAVIGATION_HEIGHT = '56px';

export default function GalleryBottomNavigation(): JSX.Element {
  const { colorMode, toggleColorMode } = useThemes();
  const { toggleSearchDrawer, galleryNavigationValue, toggleGalleryNavigationValue } = useGallery();

  return (
    <Box className="rgf-galleryBottomNavigation">
      <BottomNavigation
        actions={[
          {
            icon: (
              <HomeIcon
                variant={galleryNavigationValue === GalleryNavigationValue.HOME ? 'filled' : 'outlined'}
              />
            ),
            label: 'Home',
            // TODO - fix scrollTo top and make scroll.utils file
            onClick: (): void => window.scrollTo(0, 0),
            value: GalleryNavigationValue.HOME,
          },
          {
            icon: (
              <PhotoGridIcon
                variant={galleryNavigationValue === GalleryNavigationValue.GRID ? 'filled' : 'outlined'}
              />
            ),
            label: 'Grid',
            onClick: (): void => {},
            value: GalleryNavigationValue.GRID,
          },
          {
            icon: (
              <SearchIcon
                variant={galleryNavigationValue === GalleryNavigationValue.SEARCH ? 'filled' : 'outlined'}
              />
            ),
            label: 'Search',
            onClick: (): void => toggleSearchDrawer(true),
            value: GalleryNavigationValue.SEARCH,
          },
          {
            icon: (
              <PhotoListIcon
                variant={galleryNavigationValue === GalleryNavigationValue.LIST ? 'filled' : 'outlined'}
              />
            ),
            label: 'List',
            onClick: (): void => {},
            value: GalleryNavigationValue.LIST,
          },
          {
            icon: (
              <ToggleDarkModeIcon
                mode={colorMode}
                variant={galleryNavigationValue === GalleryNavigationValue.MODE ? 'filled' : 'outlined'}
              />
            ),
            label: colorMode === 'dark' ? 'Dark' : 'Light',
            onClick: toggleColorMode,
            value: GalleryNavigationValue.MODE,
          },
        ]}
        selectedValue={galleryNavigationValue}
        setSelectedValue={toggleGalleryNavigationValue}
      />

      <SearchDrawer />
    </Box>
  );
}
