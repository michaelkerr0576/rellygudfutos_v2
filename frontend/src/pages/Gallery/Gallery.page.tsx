import { styled } from '@mui/material/styles';

import ImageList from '@/components/dataDisplay/ImageList';
import Alert from '@/components/feedback/Alert';
import CircularProgress from '@/components/feedback/CircularProgress';
import Box from '@/components/layout/Box';
import useGallery from '@/hooks/useGallery';
import usePhotos from '@/hooks/usePhotos';
import Page from '@/layouts/Page/Page';
import { Orientation } from '@/ts/api';

import GalleryBottomNavigation, {
  FIXED_GALLERY_BOTTOM_NAVIGATION_HEIGHT,
} from './partials/GalleryBottomNavigation';

// TODO - replace with API data
const photos = [
  {
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    orientation: Orientation.LANDSCAPE,
    title: 'Landscape',
  },
  {
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    orientation: Orientation.LANDSCAPE,
    title: 'Landscape',
  },
  {
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    orientation: Orientation.LANDSCAPE,
    title: 'Landscape',
  },
  {
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    orientation: Orientation.LANDSCAPE,
    title: 'Landscape',
  },
  {
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    orientation: Orientation.LANDSCAPE,
    title: 'Landscape',
  },
  {
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    orientation: Orientation.LANDSCAPE,
    title: 'Landscape',
  },
];

const StyledGalleryPage = styled('div')(({ theme }): { [key: string]: any } => ({
  '.rgf_pageGallery__gallery': {
    margin: -8,
  },

  marginBottom: FIXED_GALLERY_BOTTOM_NAVIGATION_HEIGHT,

  [theme.breakpoints.up('tablet')]: {
    '.rgf_pageGallery__gallery': {
      margin: 0,
    },
  },
}));

export default function Gallery(): JSX.Element {
  const { data, isError, isLoading } = usePhotos();
  const { galleryVariant } = useGallery();

  console.log('--- Photos API data ---');
  console.log(data);

  const renderGallery = (): JSX.Element => {
    if (isError) {
      return (
        <Alert
          message="There was an error retrieving photos from the server."
          severity="error"
          suggestion="Please try refreshing the page."
        />
      );
    }

    if (isLoading) {
      // TODO - skeleton loader
      return <CircularProgress />;
    }

    return (
      <Box className="rgf_pageGallery__gallery">
        <ImageList images={photos} variant={galleryVariant} />
      </Box>
    );
  };

  return (
    <Page pageName="Gallery">
      <StyledGalleryPage>
        {renderGallery()}

        <GalleryBottomNavigation />
      </StyledGalleryPage>
    </Page>
  );
}
