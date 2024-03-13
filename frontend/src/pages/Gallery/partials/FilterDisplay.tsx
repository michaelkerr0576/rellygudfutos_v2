import { styled } from '@mui/material/styles';

import ArrowDropDownIcon from '@/assets/icons/ArrowDropDownIcon';
import FilterAltIcon from '@/assets/icons/FilterAltIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import TagIcon from '@/assets/icons/TagIcon';
import Chip from '@/components/dataDisplay/Chip';
import Divider from '@/components/dataDisplay/Divider';
import Button from '@/components/inputs/Button';
import IconButton from '@/components/inputs/IconButton';
import Stack from '@/components/layout/Stack';
import { TagFilter } from '@/types/store/gallery.types';

import useGallery from '../hooks/useGallery';

const StyledFilterDisplay = styled(Stack)(({ theme }): { [key: string]: any } => ({
  '.rgf': {
    '&-filterDisplay': {
      '&--activeFilterChips': {
        paddingLeft: theme.spacing(1),
      },
      '&--filterButton': {
        minWidth: 34,
      },
      '&--sortButton': {
        minWidth: 112.17,
      },
    },
  },

  margin: theme.spacing(0, -2, 1, 0),
  overflowX: 'auto',
}));

export default function FilterDisplay(): JSX.Element {
  const { handleOpenFilterDrawer, isFilterDrawerOpen, search, sortBy, sortByOptions, tagsFilter } =
    useGallery();

  const renderFilterChips = (): JSX.Element => {
    const showSearchChip = search.length > 0;
    const showTagChips = tagsFilter.length > 0;

    return (
      <Stack className="rgf-filterDisplay--activeFilterChips" spacing={0.5}>
        {showSearchChip && (
          <Chip
            label={search}
            onClick={handleOpenFilterDrawer}
            startIcon={<SearchIcon color="secondary" size="small" variant="outlined" />}
            variant="outlined"
          />
        )}

        {showTagChips &&
          tagsFilter.map(
            (tag: TagFilter): JSX.Element => (
              <Chip
                key={tag.id}
                label={tag.label}
                onClick={handleOpenFilterDrawer}
                startIcon={<TagIcon color="secondary" size="small" />}
              />
            ),
          )}
      </Stack>
    );
  };

  const renderFilterButton = (): JSX.Element => (
    <IconButton
      ariaLabel="toggle filter"
      className="rgf-filterDisplay--filterButton"
      edge="start"
      onClick={handleOpenFilterDrawer}
    >
      <FilterAltIcon />
    </IconButton>
  );

  const renderSortByButton = (): JSX.Element => (
    <Button
      className="rgf-filterDisplay--sortButton"
      color="secondary"
      endIcon={<ArrowDropDownIcon type={isFilterDrawerOpen ? 'open' : 'closed'} />}
      onClick={handleOpenFilterDrawer}
      variant="tertiary"
    >
      {sortByOptions[sortBy].label}
    </Button>
  );

  return (
    <StyledFilterDisplay alignItems="center" className="rgf-filterDisplay" spacing={0.5}>
      {renderFilterButton()}

      {renderSortByButton()}

      {/* // TODO - make divider a little less long */}
      <Divider orientation="vertical" />

      {renderFilterChips()}
    </StyledFilterDisplay>
  );
}
