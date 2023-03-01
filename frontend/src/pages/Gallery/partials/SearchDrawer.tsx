import ExpandIcon from '@/assets/icons/ExpandIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import Divider from '@/components/dataDisplay/Divider';
import Autocomplete from '@/components/inputs/Autocomplete';
import Button from '@/components/inputs/Button';
import IconButton from '@/components/inputs/IconButton';
import Select from '@/components/inputs/Select';
import TextField from '@/components/inputs/TextField';
import Box from '@/components/layout/Box';
import Stack from '@/components/layout/Stack';
import Drawer from '@/components/navigation/Drawer';
import useGallery from '@/hooks/useGallery';

// TODO - replace with API data
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
  { id: 11, label: 'Cityscape 2' },
  { id: 12, label: 'Cityscape 3' },
  { id: 13, label: 'Cityscape 4' },
  { id: 14, label: 'Cityscape 5' },
  { id: 15, label: 'Cityscape 6' },
];

export default function SearchDrawer(): JSX.Element {
  const {
    handleChangeSortBy,
    handleChangeTagsFilter,
    isSearchDrawerOpen,
    sortBy,
    tagsFilter,
    toggleSearchDrawer,
  } = useGallery();

  const handleClearFilters = (): void => {
    handleChangeSortBy('');
    handleChangeTagsFilter([]);
  };

  const renderToggleDrawerButton = (): JSX.Element => (
    <Stack horizontalAlignment="center">
      <IconButton ariaLabel="less" onClick={(): void => toggleSearchDrawer(false)} padding="small">
        <ExpandIcon type={isSearchDrawerOpen ? 'less' : 'more'} size="large" />
      </IconButton>
    </Stack>
  );

  const renderButtonGroup = (): JSX.Element => (
    <Box py={2}>
      <Stack direction="column" spacing={1}>
        <Button onClick={handleClearFilters} variant="secondary">
          Clear
        </Button>

        <Button onClick={(): void => {}}>Apply</Button>
      </Stack>
    </Box>
  );

  return (
    <Drawer anchor="bottom" isOpen={isSearchDrawerOpen} setIsOpen={toggleSearchDrawer}>
      {renderToggleDrawerButton()}

      <Divider />

      <TextField label="Search" endAdornmentIcon={<SearchIcon />} />

      <Divider />

      <Autocomplete
        fieldId="search-drawer-tags-autocomplete"
        label="Tags"
        noOptionsLabel="No tags"
        onChange={handleChangeTagsFilter}
        options={tags}
        value={tagsFilter}
      />

      <Divider />

      <Select
        fieldId="search-drawer-sort-select"
        label="Sort"
        onChange={handleChangeSortBy}
        options={[
          { id: 'newest', label: 'Newest' },
          { id: 'oldest', label: 'Oldest' },
          { id: 'title_az', label: 'Title (a-z)' },
          { id: 'title_za', label: 'Title (z-a)' },
          { id: 'random', label: 'Random' },
        ]}
        value={sortBy}
      />

      <Divider />

      {renderButtonGroup()}
    </Drawer>
  );
}
