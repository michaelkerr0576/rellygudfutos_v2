import { styled } from '@mui/material/styles';

import SearchIcon from '@/assets/icons/SearchIcon';
import Divider from '@/components/dataDisplay/Divider';
import Autocomplete from '@/components/inputs/Autocomplete';
import Button from '@/components/inputs/Button';
import Select from '@/components/inputs/Select';
import TextField from '@/components/inputs/TextField';
import Box from '@/components/layout/Box';
import Grid from '@/components/layout/Grid';
import Stack from '@/components/layout/Stack';
import Drawer, { FIXED_TOGGLE_DRAWER_BUTTON_HEIGHT } from '@/components/navigation/Drawer';
import Paper from '@/components/surfaces/Paper';
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

export const SEARCH_DRAWER_BUTTON_ACTIONS_HEIGHT = '74.25px';

const StyledSearchDrawer = styled('div')(({ theme }): { [key: string]: any } => ({
  '.rgf_searchDrawer__actionButtonGroup': {
    '.rgf_stack': {
      padding: theme.spacing(2),
    },

    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    zIndex: theme.zIndex.drawer,
  },
  '.rgf_searchDrawer__searchField': {
    marginTop: FIXED_TOGGLE_DRAWER_BUTTON_HEIGHT,
  },
  '.rgf_searchDrawer__sortBySelect': {
    marginBottom: SEARCH_DRAWER_BUTTON_ACTIONS_HEIGHT,
  },

  [theme.breakpoints.up('tablet')]: {
    '.rgf_searchDrawer__actionButtonGroup': {
      '.rgf_stack': {
        padding: theme.spacing(2, 1),
      },
    },
  },
}));

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

  const renderRow = (children: React.ReactNode): JSX.Element => (
    <Grid isContainer>
      <Grid mobile={12} laptop={6} laptopOffset={3} desktop={4} desktopOffset={4}>
        {children}
      </Grid>
    </Grid>
  );

  const renderSearchField = (): JSX.Element => (
    <Box className="rgf_searchDrawer__searchField">
      {renderRow(<TextField label="Search" endAdornmentIcon={<SearchIcon />} />)}

      <Divider />
    </Box>
  );

  const renderTagsFilter = (): JSX.Element => (
    <Box className="rgf_searchDrawer__tagsFilter">
      {renderRow(
        <Autocomplete
          fieldId="search-drawer-tags-autocomplete"
          label="Tags"
          noOptionsLabel="No tags"
          onChange={handleChangeTagsFilter}
          options={tags}
          value={tagsFilter}
        />,
      )}

      <Divider />
    </Box>
  );

  const renderSortBySelect = (): JSX.Element => (
    <Box className="rgf_searchDrawer__sortBySelect">
      {renderRow(
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
        />,
      )}

      <Divider />
    </Box>
  );

  const renderActionButtonGroup = (): JSX.Element => (
    <Paper className="rgf_searchDrawer__actionButtonGroup" elevation={24}>
      {renderRow(
        <Stack direction="row" spacing={1}>
          <Button onClick={handleClearFilters} variant="secondary">
            Clear
          </Button>

          <Button onClick={(): void => {}}>Apply</Button>
        </Stack>,
      )}
    </Paper>
  );

  return (
    <Drawer
      anchor="bottom"
      className="rgf_searchDrawer"
      isOpen={isSearchDrawerOpen}
      setIsOpen={toggleSearchDrawer}
    >
      <StyledSearchDrawer className="rgf_searchDrawer__children">
        {renderSearchField()}

        {renderTagsFilter()}

        {renderSortBySelect()}

        {renderActionButtonGroup()}
      </StyledSearchDrawer>
    </Drawer>
  );
}
