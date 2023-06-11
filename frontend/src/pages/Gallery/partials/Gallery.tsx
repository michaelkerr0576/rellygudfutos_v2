import { styled } from '@mui/material/styles';

import ImageList from '@/components/dataDisplay/ImageList';
import Alert from '@/components/feedback/Alert';
import CircularProgress from '@/components/feedback/CircularProgress';
import usePhotos from '@/hooks/queries/usePhotos';

import useGallery from '../hooks/useGallery';

export const GALLERY_MAX_WIDTH = '1600px';

const StyledGallery = styled('div')(({ theme }): { [key: string]: any } => ({
  margin: theme.spacing(-1),

  [theme.breakpoints.up('tablet')]: {
    margin: 0,
  },
}));

export default function Gallery(): JSX.Element {
  const { galleryVariant, togglePhotoDialog } = useGallery();
  const { data: photos, isError, isLoading } = usePhotos();

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
        images={photos?.data || []}
        maxWidth={GALLERY_MAX_WIDTH}
        onClick={(photoId): void => togglePhotoDialog(true, photoId)}
        variant={galleryVariant}
      />
    </StyledGallery>
  );
}
