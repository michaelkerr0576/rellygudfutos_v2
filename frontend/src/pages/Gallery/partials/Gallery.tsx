import { styled } from '@mui/material/styles';

import ImageList from '@/components/dataDisplay/ImageList';
import Alert from '@/components/feedback/Alert';
import CircularProgress from '@/components/feedback/CircularProgress';
import useGallery from '@/hooks/useGallery';
import usePhotos from '@/hooks/usePhotos';
import { Orientation } from '@/ts/api';

// TODO - replace with API data
const photos = [
  {
    id: '1',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    orientation: Orientation.LANDSCAPE,
    title: 'Landscape',
  },
  {
    id: '2',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    id: '3',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    id: '4',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    orientation: Orientation.LANDSCAPE,
    title: 'Landscape',
  },
  {
    id: '5',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    id: '6',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    id: '7',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    id: '8',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    orientation: Orientation.LANDSCAPE,
    title: 'Landscape',
  },
  {
    id: '9',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    orientation: Orientation.LANDSCAPE,
    title: 'Landscape',
  },
  {
    id: '10',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    id: '11',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    id: '12',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    orientation: Orientation.LANDSCAPE,
    title: 'Landscape',
  },
  {
    id: '13',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    id: '14',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    orientation: Orientation.PORTRAIT,
    title: 'Portrait',
  },
  {
    id: '15',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    orientation: Orientation.LANDSCAPE,
    title: 'Landscape',
  },
];

export const GALLERY_MAX_WIDTH = '1600px';

const StyledGallery = styled('div')(({ theme }): { [key: string]: any } => ({
  margin: -8,

  [theme.breakpoints.up('tablet')]: {
    margin: 0,
  },
}));

export default function Gallery(): JSX.Element {
  const { data, isError, isLoading } = usePhotos();
  const { galleryVariant } = useGallery();

  console.log('--- Photos API data ---');
  console.log(data);

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
    return <CircularProgress />;
  }

  return (
    <StyledGallery className="rgf_gallery">
      <ImageList images={photos} maxWidth={GALLERY_MAX_WIDTH} variant={galleryVariant} />
    </StyledGallery>
  );
}
