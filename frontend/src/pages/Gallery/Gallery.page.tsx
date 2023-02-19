import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import ViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';

import Box from '@/components/layout/Box';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import useThemes from '@/hooks/useThemes';
import Page from '@/layouts/Page/Page';

export default function Gallery(): JSX.Element {
  const { colorMode, toggleColorMode } = useThemes();

  return (
    <Page>
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
            icon: colorMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />,
            label: colorMode === 'dark' ? 'Dark' : 'Light',
            onClick: toggleColorMode,
            value: 'mode',
          },
          {
            icon: <LocalOfferRoundedIcon />,
            label: 'Tags',
            onClick: (): void => {},
            value: 'tags',
          },
          {
            icon: <UnfoldMoreRoundedIcon />,
            label: 'Sort',
            onClick: (): void => {},
            value: 'sort',
          },
        ]}
        initialValue="grid"
      />
    </Page>
  );
}
