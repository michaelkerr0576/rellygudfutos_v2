import { styled } from '@mui/material/styles';

import ArrowDropDownIcon from '@/assets/icons/ArrowDropDownIcon';
import FilterAltIcon from '@/assets/icons/FilterAltIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import TagIcon from '@/assets/icons/TagIcon';
import Chip from '@/components/dataDisplay/Chip';
import Typography from '@/components/dataDisplay/Typography';
import TypographyIcon from '@/components/dataDisplay/TypographyIcon';
import IconButton from '@/components/inputs/IconButton';
import Stack from '@/components/layout/Stack';
import { TagFilter } from '@/types/store/gallery.types';

import useGallery from '../hooks/useGallery';

const StyledFilterDisplay = styled('div')(({ theme }): { [key: string]: any } => ({
  paddingBottom: theme.spacing(1),
}));

export default function FilterDisplay(): JSX.Element {
  const { search, sortBy, sortByOptions, tagsFilter, toggleFilterDrawer } = useGallery();

  const renderActiveFilters = (): JSX.Element => {
    const renderSortBy = (): JSX.Element => (
      <TypographyIcon
        className="rgf-filterDisplay--activeFilterSort"
        endIcon={<ArrowDropDownIcon color="secondary" />}
        typography={
          <Typography color="secondary" variant="h3">
            {sortByOptions[sortBy].label}
          </Typography>
        }
      />
    );

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

    return (
      <Stack alignItems="end" className="rgf-filterDisplay--activeFilters" hasDivider spacing={2}>
        {renderSortBy()}

        {renderFilterChips()}
      </Stack>
    );
  };

  const renderFilterButton = (): JSX.Element => (
    <IconButton
      ariaLabel="toggle filter"
      className="rgf-filterDisplay--filterButton"
      edge="end"
      onClick={(): void => toggleFilterDrawer(true)}
    >
      <FilterAltIcon />
    </IconButton>
  );

  return (
    <StyledFilterDisplay className="rgf-filterDisplay">
      <Stack alignItems="end" justifyContent="spaceBetween">
        {renderActiveFilters()}

        {renderFilterButton()}
      </Stack>
    </StyledFilterDisplay>
  );
}
