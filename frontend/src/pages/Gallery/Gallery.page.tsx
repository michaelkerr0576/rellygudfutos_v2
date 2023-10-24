import usePhotos from '@/hooks/queries/usePhotos';
import useInfinitePagination from '@/hooks/shared/useInfinitePagination';
import Page from '@/layouts/Page/Page';
import { Photo } from '@/types/api/photo.types';

import useGallery from './hooks/useGallery';
import useGalleryDialogRoutes from './hooks/useGalleryDialogRoutes';
import Gallery from './partials/Gallery';
import GalleryBottomNavigation from './partials/GalleryBottomNavigation';
import PhotoDialog from './partials/PhotoDialog';
import SearchDrawer from './partials/SearchDrawer';

export default function GalleryPage(): JSX.Element {
  useGalleryDialogRoutes();

  const { gallerySearch, gallerySortBy, galleryTagsFilterIds, isPhotoDialogOpen } = useGallery();

  const {
    data: photosData,
    error: photosError,
    fetchNextPage: fetchNextPhotoPage,
    isError: isPhotosError,
    isFetchingNextPage: isFetchingNextPhotoPage,
    isLoading: isPhotosLoading,
    isRefetching: isPhotosRefetching,
    refetch: refetchPhotos,
  } = usePhotos({
    search: gallerySearch,
    sort: gallerySortBy,
    tagIds: galleryTagsFilterIds,
  });
  const { data: photos, inViewRef: inViewPhotoRef } = useInfinitePagination<Photo>(
    photosData?.pages,
    fetchNextPhotoPage,
  );

  const handleRefetchPhotos = (): void => {
    refetchPhotos();
  };

  return (
    <Page pageName="Gallery">
      <Gallery
        error={photosError}
        isError={isPhotosError}
        isFetchingNextPage={isFetchingNextPhotoPage}
        isLoading={isPhotosLoading || isPhotosRefetching}
        lastImageRef={inViewPhotoRef}
        photos={photos}
      />

      <GalleryBottomNavigation />

      <SearchDrawer onApplyFilter={handleRefetchPhotos} />

      {isPhotoDialogOpen && <PhotoDialog />}
    </Page>
  );
}
