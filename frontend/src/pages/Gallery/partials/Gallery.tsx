import { RefObject } from 'react';

import { styled } from '@mui/material/styles';

import ImageList from '@/components/dataDisplay/ImageList';
import Alert from '@/components/feedback/Alert';
import CircularProgress, { LOADING_PANEL_HEIGHT } from '@/components/feedback/CircularProgress';
import Box from '@/components/layout/Box';
import useErrorMessage from '@/hooks/shared/useErrorMessage';
import { ApiErrorResponse } from '@/types/api/data.types';
import { Photo } from '@/types/api/photo.types';

import useGallery from '../hooks/useGallery';
import GallerySkeleton from '../skeletons/Gallery.skeleton';

export interface GalleryProps {
  error: ApiErrorResponse | null;
  isError: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  lastImageRef: RefObject<any> | ((node?: Element | null) => void);
  photos: Photo[];
}

const StyledGallery = styled(Box)((): { [key: string]: any } => ({
  '.rgf': {
    '&-gallery': {
      '&--loadingPanel': {
        height: LOADING_PANEL_HEIGHT,
      },
    },
  },
}));

export default function Gallery(props: GalleryProps): JSX.Element {
  const { error, isError, isFetchingNextPage, isLoading, lastImageRef, photos } = props;

  const defaultErrorMessage =
    'There was an error retrieving photos from the server. Please try refreshing the page';

  const { handleOpenPhotoDialog, layoutVariant } = useGallery();
  const { errorMessage, errorSeverity } = useErrorMessage({ defaultErrorMessage, error });

  if (isError) {
    return <Alert message={errorMessage || defaultErrorMessage} severity={errorSeverity || 'error'} />;
  }

  if (isLoading) {
    return <GallerySkeleton variant={layoutVariant} />;
  }

  return (
    <StyledGallery className="rgf-gallery">
      <ImageList
        images={photos}
        isMinimumLoad
        lastImageRef={lastImageRef}
        onClick={handleOpenPhotoDialog}
        variant={layoutVariant}
      />

      <Box className="rgf-gallery--loadingPanel">
        {isFetchingNextPage && <CircularProgress variant="panel" />}
      </Box>
    </StyledGallery>
  );
}
