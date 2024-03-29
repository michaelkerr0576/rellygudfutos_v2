import { RefObject } from 'react';

import ImageList from '@/components/dataDisplay/ImageList';
import Alert from '@/components/feedback/Alert';
import CircularProgress, { LOADING_PANEL_HEIGHT } from '@/components/feedback/CircularProgress';
import Box from '@/components/layout/Box';
import useErrorMessage from '@/hooks/shared/useErrorMessage';
import { ApiErrorResponse } from '@/types/api/data.types';
import { Photo } from '@/types/api/photo.types';

import { GALLERY_MAX_WIDTH } from '../constants';
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

export default function Gallery(props: GalleryProps): JSX.Element {
  const { error, isError, isFetchingNextPage, isLoading, lastImageRef, photos } = props;

  const { handleOpenPhotoDialog, layoutVariant } = useGallery();

  const defaultErrorMessage =
    'There was an error retrieving photos from the server. Please try refreshing the page';
  const { errorMessage, errorSeverity } = useErrorMessage({ defaultErrorMessage, error });

  if (isError) {
    return <Alert message={errorMessage || defaultErrorMessage} severity={errorSeverity || 'error'} />;
  }

  if (isLoading) {
    return <GallerySkeleton variant={layoutVariant} />;
  }

  return (
    <Box className="rgf-gallery">
      <ImageList
        images={photos}
        lastImageRef={lastImageRef}
        maxWidth={GALLERY_MAX_WIDTH}
        onClick={handleOpenPhotoDialog}
        variant={layoutVariant}
      />

      <Box style={{ height: LOADING_PANEL_HEIGHT }}>
        {isFetchingNextPage && <CircularProgress variant="panel" />}
      </Box>
    </Box>
  );
}
