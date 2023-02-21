import PhotoGridIcon from '@/assets/icons/PhotoGridIcon';
import PhotoListIcon from '@/assets/icons/PhotoListIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import ToggleDarkModeIcon from '@/assets/icons/ToggleDarkModeIcon';
import ToggleLightModeIcon from '@/assets/icons/ToggleLightModeIcon';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import useThemes from '@/hooks/useThemes';

export default function GalleryBottomNavigation(): JSX.Element {
  const { colorMode, toggleColorMode } = useThemes();

  return (
    <BottomNavigation
      actions={[
        {
          icon: <PhotoGridIcon />,
          label: 'Grid',
          onClick: (): void => {},
          value: 'grid',
        },
        {
          icon: <PhotoListIcon />,
          label: 'List',
          onClick: (): void => {},
          value: 'list',
        },
        {
          icon: colorMode === 'dark' ? <ToggleLightModeIcon /> : <ToggleDarkModeIcon />,
          label: colorMode === 'dark' ? 'Dark' : 'Light',
          onClick: toggleColorMode,
          value: 'mode',
        },
        {
          icon: <SearchIcon />,
          label: 'Search',
          onClick: (): void => {},
          value: 'search',
        },
      ]}
      initialValue="grid"
    />
  );
}
