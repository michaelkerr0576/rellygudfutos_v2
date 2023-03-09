import Typography from '@/components/dataDisplay/Typography';
import usePhotos from '@/hooks/usePhotos';
import Page from '@/layouts/Page/Page';

import GalleryBottomNavigation from './partials/GalleryBottomNavigation';

export default function Gallery(): JSX.Element {
  const { data, isError, isLoading } = usePhotos();

  if (isError) {
    return <Page pageName="Gallery">There was an error loading the photos</Page>;
  }

  if (isLoading) {
    return <Page pageName="Gallery">...Loading</Page>;
  }

  return (
    <Page pageName="Gallery">
      <Typography variant="h1">Gallery</Typography>
      <Typography variant="h2">Gallery</Typography>
      <Typography variant="h3">Gallery</Typography>
      <Typography variant="subtitle">Gallery</Typography>
      <Typography variant="body">Gallery</Typography>
      <Typography variant="caption">Gallery</Typography>

      <br />
      <br />
      {JSON.stringify(data)}
      <br />
      <br />

      <GalleryBottomNavigation />
    </Page>
  );
}
