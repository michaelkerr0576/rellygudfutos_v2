import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';
import Brightness7RoundedIcon from '@mui/icons-material/Brightness7Rounded';
// import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
// import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
// import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
// import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
// import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import ViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';

import Box from '@/components/layout/Box';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import useThemes from '@/hooks/useThemes';
import Page from '@/layouts/Page/Page';

export default function Gallery(): JSX.Element {
  const { colorMode, toggleColorMode } = useThemes();

  return (
    <Page pageName="Gallery">
      <Box style={{ height: '1000px' }}>Gallery</Box>

      <BottomNavigation
        actions={[
          {
            icon: <GridOnOutlinedIcon />,
            label: 'Grid',
            onClick: (): void => {},
            value: 'grid',
          },
          {
            icon: <ViewDayOutlinedIcon />,
            label: 'List',
            onClick: (): void => {},
            value: 'list',
          },
          {
            icon: colorMode === 'dark' ? <Brightness7RoundedIcon /> : <Brightness4RoundedIcon />,
            label: colorMode === 'dark' ? 'Dark' : 'Light',
            onClick: toggleColorMode,
            value: 'mode',
          },
          // {
          //   icon: <FilterAltOffRoundedIcon />,
          //   label: 'Filter',
          //   onClick: (): void => {},
          //   value: 'filter',
          // },
          {
            icon: <SearchRoundedIcon />,
            label: 'Search',
            onClick: (): void => {},
            value: 'search',
          },
          // {
          //   icon: <LocalOfferRoundedIcon />,
          //   label: 'Tags',
          //   onClick: (): void => {},
          //   value: 'tags',
          // },
          // {
          //   icon: <ImportExportRoundedIcon />,
          //   label: 'Sort',
          //   onClick: (): void => {},
          //   value: 'sort',
          // },
        ]}
        initialValue="grid"
      />
    </Page>
  );
}
