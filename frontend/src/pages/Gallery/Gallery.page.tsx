import Typography from '@/components/dataDisplay/Typography';
import Page from '@/layouts/Page/Page';

import GalleryBottomNavigation from './partials/GalleryBottomNavigation';

export default function Gallery(): JSX.Element {
  return (
    <Page pageName="Gallery">
      <Typography variant="h1">Gallery</Typography>
      <Typography variant="h2">Gallery</Typography>
      <Typography variant="h3">Gallery</Typography>
      <Typography variant="subtitle">Gallery</Typography>
      <Typography variant="body">Gallery</Typography>
      <Typography variant="caption">Gallery</Typography>

      <GalleryBottomNavigation />
    </Page>
  );
}
