import Page from '@/layouts/Page/Page';

import GalleryBottomNavigation from './partials/GalleryBottomNavigation';

export default function Gallery(): JSX.Element {
  return (
    <Page pageName="Gallery">
      <div>Gallery</div>

      <GalleryBottomNavigation />
    </Page>
  );
}
