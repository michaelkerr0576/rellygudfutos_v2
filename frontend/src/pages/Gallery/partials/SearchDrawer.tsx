import DarkModeIcon from '@/assets/icons/DarkModeIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import Divider from '@/components/dataDisplay/Divider';
import List from '@/components/dataDisplay/List';
import Switch from '@/components/inputs/Switch';
import Drawer from '@/components/navigation/Drawer';
import useGallery from '@/hooks/useGallery';

export default function SearchDrawer(): JSX.Element {
  const { isSearchDrawerOpen, toggleSearchDrawer } = useGallery();

  return (
    <Drawer isOpen={isSearchDrawerOpen} setIsOpen={toggleSearchDrawer}>
      <List
        listItems={[
          {
            icon: <SearchIcon />,
            label: 'Search',
          },
        ]}
        subHeader="Search"
      />

      <Divider />

      <List
        listItems={[
          {
            action: (
              <Switch
                ariaLabel="switch-dark-mode"
                isChecked
                horizontalAlignment="end"
                onChange={(): void => {}}
              />
            ),
            icon: <DarkModeIcon />,
            label: 'Dark mode',
            onClick: (): void => {},
          },
        ]}
        subHeader="Settings"
      />
    </Drawer>
  );
}
