import SearchIcon from '@/assets/icons/SearchIcon';
import Divider from '@/components/dataDisplay/Divider';
import TextField from '@/components/inputs/TextField';
import Drawer from '@/components/navigation/Drawer';
import useGallery from '@/hooks/useGallery';

export default function SearchDrawer(): JSX.Element {
  const { isSearchDrawerOpen, toggleSearchDrawer } = useGallery();

  return (
    <Drawer isOpen={isSearchDrawerOpen} setIsOpen={toggleSearchDrawer}>
      <TextField label="Search" endAdornmentIcon={<SearchIcon />} />

      <Divider />
    </Drawer>
  );
}
