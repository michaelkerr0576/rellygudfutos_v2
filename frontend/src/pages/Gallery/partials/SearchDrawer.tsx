import { styled } from '@mui/material/styles';

import FilterIcon from '@/assets/icons/FilterIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import Divider from '@/components/dataDisplay/Divider';
import Autocomplete from '@/components/inputs/Autocomplete';
import Button from '@/components/inputs/Button';
import Select from '@/components/inputs/Select';
import TextField from '@/components/inputs/TextField';
import Box from '@/components/layout/Box';
import Grid from '@/components/layout/Grid';
import Stack from '@/components/layout/Stack';
import Drawer from '@/components/navigation/Drawer';
import Paper from '@/components/surfaces/Paper';
import { FIXED_BOTTOM_APP_BAR_HEIGHT } from '@/constants/style.constants';
import { PhotoSortOptions } from '@/types/api/photo.types';

import useGallery from '../hooks/useGallery';

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

export interface SearchDrawerProps {
  onApplyFilter: () => void;
}

const StyledDrawer = styled(Drawer)(({ theme }): { [key: string]: any } => ({
  '.rgf': {
    '&-drawer': {
      '&--children': {
        marginBottom: FIXED_BOTTOM_APP_BAR_HEIGHT,
      },
    },
    '&-searchDrawer': {
      '&--actionButtonGroup': {
        '.rgf-stack': {
          height: FIXED_BOTTOM_APP_BAR_HEIGHT,
          padding: theme.spacing(1),
        },

        bottom: 0,
        left: 0,
        position: 'fixed',
        right: 0,
        zIndex: theme.zIndex.drawer,
      },
    },
  },
}));

export default function SearchDrawer(props: SearchDrawerProps): JSX.Element {
  const { onApplyFilter } = props;

  const {
    handleClearFilters,
    handleSearch,
    handleSortBy,
    handleTagsFilter,
    isSearchDrawerOpen,
    search,
    sortBy,
    tagsFilter,
    toggleSearchDrawer,
  } = useGallery();

  const renderRow = (children: React.ReactNode): JSX.Element => (
    <Grid isContainer>
      <Grid mobile={12} laptop={6} laptopOffset={3} desktop={4} desktopOffset={4}>
        {children}
      </Grid>
    </Grid>
  );

  const renderSearchField = (): JSX.Element => (
    <Box className="rgf-searchDrawer--searchField">
      {renderRow(
        <TextField
          endAdornment={<SearchIcon variant="outlined" />}
          label="Search"
          onChange={handleSearch}
          value={search}
          variant="outlined"
        />,
      )}

      <Divider />
    </Box>
  );

  const renderTagsFilter = (): JSX.Element => (
    <Box className="rgf-searchDrawer--tagsFilter">
      {renderRow(
        <Autocomplete
          fieldId="search-drawer-tags-autocomplete"
          label="Tags"
          noOptionsLabel="No tags"
          onChange={handleTagsFilter}
          options={tags}
          value={tagsFilter}
        />,
      )}

      <Divider />
    </Box>
  );

  const renderSortBySelect = (): JSX.Element => (
    <Box className="rgf-searchDrawer--sortBySelect">
      {renderRow(
        <Select
          fieldId="search-drawer-sort-select"
          label="Sort"
          onChange={handleSortBy}
          options={[
            { id: PhotoSortOptions.NEWEST, label: 'Newest' },
            { id: PhotoSortOptions.OLDEST, label: 'Oldest' },
            { id: PhotoSortOptions.TITLE_AZ, label: 'Title (a-z)' },
            { id: PhotoSortOptions.TITLE_ZA, label: 'Title (z-a)' },
            { id: PhotoSortOptions.RANDOM, label: 'Random' },
          ]}
          value={sortBy}
        />,
      )}

      <Divider />
    </Box>
  );

  const renderActionButtonGroup = (): JSX.Element => (
    <Paper className="rgf-searchDrawer--actionButtonGroup" elevation={24}>
      {renderRow(
        <Stack alignItems="center" spacing={1}>
          <Button
            isFullWidth
            onClick={handleClearFilters}
            startIcon={<FilterIcon size="large" type="off" />}
            variant="secondary"
          >
            Clear
          </Button>

          <Button isFullWidth onClick={onApplyFilter} startIcon={<FilterIcon size="large" type="on" />}>
            Apply
          </Button>
        </Stack>,
      )}
    </Paper>
  );

  return (
    <StyledDrawer
      anchor="bottom"
      className="rgf-searchDrawer"
      isOpen={isSearchDrawerOpen}
      setIsOpen={toggleSearchDrawer}
    >
      {renderSearchField()}

      {renderTagsFilter()}

      {renderSortBySelect()}

      {renderActionButtonGroup()}
    </StyledDrawer>
  );
}
