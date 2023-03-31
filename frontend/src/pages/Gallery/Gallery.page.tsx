import Page from '@/layouts/Page/Page';

import useGallery from './hooks/useGallery';
import Gallery from './partials/Gallery';
import GalleryBottomNavigation from './partials/GalleryBottomNavigation';
import PhotoDialog from './partials/PhotoDialog';

export default function GalleryPage(): JSX.Element {
  const { isPhotoDialogOpen } = useGallery();

  return (
    <Page pageName="Gallery">
      <Gallery />

      <GalleryBottomNavigation />

      {isPhotoDialogOpen && <PhotoDialog />}
    </Page>
  );
}
