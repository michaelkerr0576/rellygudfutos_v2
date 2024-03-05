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

import useGallery from '../hooks/useGallery';

/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FilterDisplayProps {}

const StyledFilterDisplay = styled('div')(({ theme }): { [key: string]: any } => ({
  paddingBottom: theme.spacing(1),
}));

export default function FilterDisplay(props: FilterDisplayProps): JSX.Element {
  const { search, sortBy, sortByOptions, tagsFilter, toggleFilterDrawer } = useGallery();

  const renderActiveFilters = (): JSX.Element => {
    // eslint-disable-next-line arrow-body-style
    const renderTagsAndSearchChips = (): JSX.Element => {
      // TODO - Finish Tag chips
      // TODO - Finish Search display Chip or TypographyIcon
      return (
        <>
          <Chip label="test" startIcon={<TagIcon color="secondary" size="small" />} />
          <Chip
            label="test"
            startIcon={<SearchIcon color="secondary" size="small" variant="outlined" />}
            variant="outlined"
          />
        </>
      );
    };

    return (
      <Stack alignItems="end" className="rgf-filterDisplay--activeFilters" hasDivider spacing={2}>
        <TypographyIcon
          className="rgf-filterDisplay--activeFiltersSortBy"
          endIcon={<ArrowDropDownIcon color="secondary" />}
          typography={
            <Typography color="secondary" variant="h3">
              {sortByOptions[sortBy].label}
            </Typography>
          }
        />

        {renderTagsAndSearchChips()}
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
