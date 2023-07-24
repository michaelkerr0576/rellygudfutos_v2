import { styled } from '@mui/material/styles';

import ImageList from '@/components/dataDisplay/ImageList';
import Alert from '@/components/feedback/Alert';
import CircularProgress, { LOADING_PANEL_HEIGHT } from '@/components/feedback/CircularProgress';
import Box from '@/components/layout/Box';
import usePhotos from '@/hooks/queries/usePhotos';
import useErrorMessage from '@/hooks/shared/useErrorMessage';
import useInfinitePagination from '@/hooks/shared/useInfinitePagination';
import { Photo } from '@/types/api/photo.types';

import { GALLERY_MAX_WIDTH } from '../constants';
import useGallery from '../hooks/useGallery';
import GallerySkeleton from '../skeletons/Gallery.skeleton';

const StyledGallery = styled('div')(({ theme }): { [key: string]: any } => ({
  margin: theme.spacing(-1),

  [theme.breakpoints.up('laptop')]: {
    margin: 0,
  },
}));

export default function Gallery(): JSX.Element {
  const { galleryVariant, togglePhotoDialog } = useGallery();
  const { data, error, fetchNextPage, isError, isFetchingNextPage, isLoading } = usePhotos();
  const { data: photos, inViewRef } = useInfinitePagination<Photo>(data?.pages, fetchNextPage);

  const defaultErrorMessage =
    'There was an error retrieving photos from the server. Please try refreshing the page';
  const { errorMessage, errorSeverity } = useErrorMessage(error, defaultErrorMessage);

  if (isError) {
    return <Alert message={errorMessage || defaultErrorMessage} severity={errorSeverity || 'error'} />;
  }

  if (isLoading) {
    return <GallerySkeleton variant={galleryVariant} />;
  }

  return (
    <StyledGallery className="rgf-gallery">
      <ImageList
        images={photos}
        lastImageRef={inViewRef}
        maxWidth={GALLERY_MAX_WIDTH}
        onClick={(photoId): void => togglePhotoDialog(true, photoId)}
        variant={galleryVariant}
      />

      <Box style={{ height: LOADING_PANEL_HEIGHT }}>
        {isFetchingNextPage ? <CircularProgress variant="panel" /> : null}
      </Box>
    </StyledGallery>
  );
}
