import { styled } from '@mui/material/styles';

import ImageList from '@/components/dataDisplay/ImageList';
import Alert from '@/components/feedback/Alert';
import CircularProgress from '@/components/feedback/CircularProgress';
import usePhotos from '@/hooks/queries/usePhotos';
import useErrorMessage from '@/hooks/shared/useErrorMessage';

import { GALLERY_MAX_WIDTH } from '../constants';
import useGallery from '../hooks/useGallery';

const StyledGallery = styled('div')(({ theme }): { [key: string]: any } => ({
  margin: theme.spacing(-1),

  [theme.breakpoints.up('tablet')]: {
    margin: 0,
  },
}));

export default function Gallery(): JSX.Element {
  const { galleryVariant, togglePhotoDialog } = useGallery();
  const { data: photos, error, isError, isLoading } = usePhotos();

  const defaultErrorMessage =
    'There was an error retrieving photos from the server. Please try refreshing the page';
  const { errorMessage, errorSeverity } = useErrorMessage(error, defaultErrorMessage);

  if (isError) {
    return <Alert message={errorMessage || defaultErrorMessage} severity={errorSeverity || 'error'} />;
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
