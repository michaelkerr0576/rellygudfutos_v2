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

const StyledFilterDisplay = styled('div')(({ theme }): { [key: string]: any } => ({
  '.rgf': {
    '&-filterDisplay': {
      '&--activeFilterChips': {
        marginLeft: theme.spacing(1.5),
      },
    },
  },

  paddingBottom: theme.spacing(1),
}));

export default function FilterDisplay(): JSX.Element {
  const { handleOpenFilterDrawer, isFilterDrawerOpen, search, sortBy, sortByOptions, tagsFilter } =
    useGallery();

  // TODO - Turn renderFilterChips into a carousel and limit the amount of chars a chip can have
  const renderFilterChips = (): JSX.Element => {
    const showTagChips = tagsFilter.length > 0;
    const showSearchChip = search.length > 0;

    return (
      <Stack className="rgf-filterDisplay--activeFilterChips" spacing={0.5}>
        {showTagChips &&
          tagsFilter.map(
            (tag: TagFilter): JSX.Element => (
              <Chip key={tag.id} label={tag.label} startIcon={<TagIcon color="secondary" size="small" />} />
            ),
          )}

        {showSearchChip && (
          <Chip
            label={search}
            startIcon={<SearchIcon color="secondary" size="small" variant="outlined" />}
            variant="outlined"
          />
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
      color="secondary"
      endIcon={<ArrowDropDownIcon type={isFilterDrawerOpen ? 'open' : 'closed'} />}
      onClick={handleOpenFilterDrawer}
      variant="tertiary"
    >
      {sortByOptions[sortBy].label}
    </Button>
  );

  return (
    <StyledFilterDisplay className="rgf-filterDisplay">
      <Stack alignItems="center" spacing={0.5}>
        {renderFilterButton()}

        {renderSortByButton()}

        {/* // TODO - make divider a little less long */}
        <Divider orientation="vertical" />

        {renderFilterChips()}
      </Stack>
    </StyledFilterDisplay>
  );
}
