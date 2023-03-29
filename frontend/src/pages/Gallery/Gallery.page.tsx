import { styled } from '@mui/material/styles';

import Page from '@/layouts/Page/Page';

import useGallery from './hooks/useGallery';
import Gallery from './partials/Gallery';
import GalleryBottomNavigation, {
  FIXED_GALLERY_BOTTOM_NAVIGATION_HEIGHT,
} from './partials/GalleryBottomNavigation';
import PhotoDialog from './partials/PhotoDialog';

const StyledGalleryPage = styled('div')((): { [key: string]: any } => ({
  marginBottom: FIXED_GALLERY_BOTTOM_NAVIGATION_HEIGHT,
}));

export default function GalleryPage(): JSX.Element {
  const { isPhotoDialogOpen } = useGallery();

  return (
    <Page pageName="Gallery">
      <StyledGalleryPage>
        <Gallery />

        <GalleryBottomNavigation />

        {isPhotoDialogOpen && <PhotoDialog />}
      </StyledGalleryPage>
    </Page>
  );
}
