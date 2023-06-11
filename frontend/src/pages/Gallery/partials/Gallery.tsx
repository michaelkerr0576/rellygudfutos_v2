import { styled } from '@mui/material/styles';

import ImageList from '@/components/dataDisplay/ImageList';
import Alert from '@/components/feedback/Alert';
import CircularProgress from '@/components/feedback/CircularProgress';
import usePhotos from '@/hooks/queries/usePhotos';
import { PhotoAspectRatio } from '@/ts/api/photos';

import useGallery from '../hooks/useGallery';

// TODO - replace with API data
const photos = [
  {
    aspectRatio: PhotoAspectRatio.LANDSCAPE,
    id: '1',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    maxHeight: '720px',
    maxWidth: '1080px',
    title: 'Landscape',
  },
  {
    aspectRatio: PhotoAspectRatio.PORTRAIT,
    id: '2',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    maxHeight: '1080px',
    maxWidth: '720px',
    title: 'Portrait',
  },
  {
    aspectRatio: PhotoAspectRatio.PORTRAIT,
    id: '3',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    maxHeight: '1080px',
    maxWidth: '720px',
    title: 'Portrait',
  },
  {
    aspectRatio: PhotoAspectRatio.LANDSCAPE,
    id: '4',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    maxHeight: '720px',
    maxWidth: '1080px',
    title: 'Landscape',
  },
  {
    aspectRatio: PhotoAspectRatio.PORTRAIT,
    id: '5',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    maxHeight: '1080px',
    maxWidth: '720px',
    title: 'Portrait',
  },
  {
    aspectRatio: PhotoAspectRatio.PORTRAIT,
    id: '6',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    maxHeight: '1080px',
    maxWidth: '720px',
    title: 'Portrait',
  },
  {
    aspectRatio: PhotoAspectRatio.PORTRAIT,
    id: '7',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    maxHeight: '1080px',
    maxWidth: '720px',
    title: 'Portrait',
  },
  {
    aspectRatio: PhotoAspectRatio.LANDSCAPE,
    id: '8',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    maxHeight: '720px',
    maxWidth: '1080px',
    title: 'Landscape',
  },
  {
    aspectRatio: PhotoAspectRatio.LANDSCAPE,
    id: '9',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    maxHeight: '720px',
    maxWidth: '1080px',
    title: 'Landscape',
  },
  {
    aspectRatio: PhotoAspectRatio.PORTRAIT,
    id: '10',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    maxHeight: '1080px',
    maxWidth: '720px',
    title: 'Portrait',
  },
  {
    aspectRatio: PhotoAspectRatio.PORTRAIT,
    id: '11',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    maxHeight: '1080px',
    maxWidth: '720px',
    title: 'Portrait',
  },
  {
    aspectRatio: PhotoAspectRatio.LANDSCAPE,
    id: '12',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    maxHeight: '720px',
    maxWidth: '1080px',
    title: 'Landscape',
  },
  {
    aspectRatio: PhotoAspectRatio.PORTRAIT,
    id: '13',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    maxHeight: '1080px',
    maxWidth: '720px',
    title: 'Portrait',
  },
  {
    aspectRatio: PhotoAspectRatio.PORTRAIT,
    id: '14',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5643.jpg',
    maxHeight: '1080px',
    maxWidth: '720px',
    title: 'Portrait',
  },
  {
    aspectRatio: PhotoAspectRatio.LANDSCAPE,
    id: '15',
    img: 'https://rellygudfutosuploads.s3-eu-west-1.amazonaws.com/20200316-IMG_5768-Edit.jpg',
    maxHeight: '720px',
    maxWidth: '1080px',
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
  const { galleryVariant, togglePhotoDialog } = useGallery();
  const { isError, isLoading } = usePhotos();

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
    <StyledGallery className="rgf-gallery">
      <ImageList
        images={photos}
        maxWidth={GALLERY_MAX_WIDTH}
        onClick={(photoId): void => togglePhotoDialog(true, photoId)}
        variant={galleryVariant}
      />
    </StyledGallery>
  );
}
