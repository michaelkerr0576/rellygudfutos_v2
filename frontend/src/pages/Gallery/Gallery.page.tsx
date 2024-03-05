import usePhotos from '@/hooks/queries/usePhotos';
import useInfinitePagination from '@/hooks/shared/useInfinitePagination';
import Page from '@/layouts/Page/Page';
import { Photo } from '@/types/api/photo.types';

import useGallery from './hooks/useGallery';
import useGalleryDialogRoutes from './hooks/useGalleryDialogRoutes';
import FilterDisplay from './partials/FilterDisplay';
import FilterDrawer from './partials/FilterDrawer';
import Gallery from './partials/Gallery';
import GalleryBottomNavigation from './partials/GalleryBottomNavigation';
import PhotoDialog from './partials/PhotoDialog';

export default function GalleryPage(): JSX.Element {
  useGalleryDialogRoutes();

  const { search, sortBy, tagsFilterIds, isPhotoDialogOpen } = useGallery();

  const {
    data: photosData,
    error: photosError,
    fetchNextPage: onFetchNextPhotoPage,
    isError: isPhotosError,
    isFetchingNextPage: isFetchingNextPhotoPage,
    isLoading: isPhotosLoading,
  } = usePhotos({
    search,
    sort: sortBy,
    tagIds: tagsFilterIds,
  });

  const { data: photos, inViewRef: inViewPhotoRef } = useInfinitePagination<Photo>({
    fetchedPages: photosData?.pages,
    onFetchNextPage: onFetchNextPhotoPage,
  });

  return (
    <Page bottomNavigation={<GalleryBottomNavigation />} pageName="gallery">
      <FilterDisplay />

      <Gallery
        error={photosError}
        isError={isPhotosError}
        isFetchingNextPage={isFetchingNextPhotoPage}
        isLoading={isPhotosLoading}
        lastImageRef={inViewPhotoRef}
        photos={photos}
      />

      <FilterDrawer />

      {isPhotoDialogOpen && <PhotoDialog />}
    </Page>
  );
}
