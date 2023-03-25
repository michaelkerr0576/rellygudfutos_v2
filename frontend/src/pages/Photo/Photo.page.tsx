import { useParams } from 'react-router-dom';

import Page from '@/layouts/Page/Page';

export default function PhotoPage(): JSX.Element {
  const params = useParams();

  return <Page pageName="Photo">Photo {params.photoId}</Page>;
}
