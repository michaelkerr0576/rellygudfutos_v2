import HomeIcon from '@/assets/icons/HomeIcon';
import PhotoGridIcon from '@/assets/icons/PhotoGridIcon';
import PhotoListIcon from '@/assets/icons/PhotoListIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import ToggleDarkModeIcon from '@/assets/icons/ToggleDarkModeIcon';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import useGallery from '@/hooks/useGallery';
import useThemes from '@/hooks/useThemes';

import SearchDrawer from './SearchDrawer';

export default function GalleryBottomNavigation(): JSX.Element {
  const { colorMode, toggleColorMode } = useThemes();
  const { toggleSearchDrawer, galleryNavigationValue, toggleGalleryNavigationValue } = useGallery();

  return (
    <>
      <BottomNavigation
        actions={[
          {
            icon: <HomeIcon variant={galleryNavigationValue === 'home' ? 'filled' : 'outlined'} />,
            label: 'Home',
            onClick: (): void => {},
            value: 'home',
          },
          {
            icon: <PhotoGridIcon variant={galleryNavigationValue === 'grid' ? 'filled' : 'outlined'} />,
            label: 'Grid',
            onClick: (): void => {},
            value: 'grid',
          },
          {
            icon: <SearchIcon variant={galleryNavigationValue === 'search' ? 'filled' : 'outlined'} />,
            label: 'Search',
            onClick: (): void => toggleSearchDrawer(true),
            value: 'search',
          },
          {
            icon: <PhotoListIcon variant={galleryNavigationValue === 'list' ? 'filled' : 'outlined'} />,
            label: 'List',
            onClick: (): void => {},
            value: 'list',
          },
          {
            icon: (
              <ToggleDarkModeIcon
                mode={colorMode}
                variant={galleryNavigationValue === 'mode' ? 'filled' : 'outlined'}
              />
            ),
            label: colorMode === 'dark' ? 'Dark' : 'Light',
            onClick: toggleColorMode,
            value: 'mode',
          },
        ]}
        selectedValue={galleryNavigationValue}
        setSelectedValue={toggleGalleryNavigationValue}
      />

      <SearchDrawer />
    </>
  );
}
