import { styled } from '@mui/material/styles';

import ImageList from '@/components/dataDisplay/ImageList';
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

  if (isError) {
    // TODO - create error content
    return <Page pageName="Gallery">There was an error loading the photos</Page>;
  }

  if (isLoading) {
    // TODO - create loading content
    return <Page pageName="Gallery">...Loading</Page>;
  }

  const renderGallery = (): JSX.Element => (
    <Box className="rgf_pageGallery__gallery">
      <ImageList images={photos} variant={galleryVariant} />
    </Box>
  );

  return (
    <Page pageName="Gallery">
      <StyledGalleryPage>
        {renderGallery()}

        <GalleryBottomNavigation />
      </StyledGalleryPage>
    </Page>
  );
}
