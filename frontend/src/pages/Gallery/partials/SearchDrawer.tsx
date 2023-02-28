import SearchIcon from '@/assets/icons/SearchIcon';
import Divider from '@/components/dataDisplay/Divider';
import Typography from '@/components/dataDisplay/Typography';
import Autocomplete from '@/components/inputs/Autocomplete';
import Button from '@/components/inputs/Button';
import TextField from '@/components/inputs/TextField';
import Stack from '@/components/layout/Stack';
import Drawer from '@/components/navigation/Drawer';
import useGallery from '@/hooks/useGallery';

const tags = [
  { id: 1, label: 'Black and white' },
  { id: 2, label: 'Portrait' },
  { id: 3, label: 'Architectural' },
  { id: 4, label: 'Street' },
  { id: 5, label: 'Landscape' },
  { id: 6, label: 'Wildlife' },
  { id: 7, label: 'Colour' },
  { id: 8, label: 'Nature' },
  { id: 9, label: 'Food' },
  { id: 10, label: 'Cityscape' },
];

export default function SearchDrawer(): JSX.Element {
  const { isSearchDrawerOpen, toggleSearchDrawer, handleTagsFilterChange } = useGallery();

  const renderDrawerHeader = (): JSX.Element => (
    <Stack horizontalAlignment="spaceEvenly" hasDivider>
      <Typography variant="subtitle">Search</Typography>

      <Typography variant="subtitle">Filter</Typography>

      <Typography variant="subtitle">Sort</Typography>
    </Stack>
  );

  return (
    <Drawer anchor="bottom" isOpen={isSearchDrawerOpen} setIsOpen={toggleSearchDrawer}>
      {renderDrawerHeader()}

      <TextField label="Search" endAdornmentIcon={<SearchIcon />} />

      <Divider />

      <Autocomplete values={tags} onChange={handleTagsFilterChange} />

      <Divider />

      <Button onClick={(): void => {}}>Clear</Button>
      <Button onClick={(): void => {}}>Apply</Button>
    </Drawer>
  );
}
