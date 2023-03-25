import { styled } from '@mui/material/styles';

import Page from '@/layouts/Page/Page';

import Gallery from './partials/Gallery';
import GalleryBottomNavigation, {
  FIXED_GALLERY_BOTTOM_NAVIGATION_HEIGHT,
} from './partials/GalleryBottomNavigation';

const StyledGalleryPage = styled('div')((): { [key: string]: any } => ({
  marginBottom: FIXED_GALLERY_BOTTOM_NAVIGATION_HEIGHT,
}));

export default function GalleryPage(): JSX.Element {
  return (
    <Page pageName="Gallery">
      <StyledGalleryPage>
        <Gallery />

        <GalleryBottomNavigation />
      </StyledGalleryPage>
    </Page>
  );
}
