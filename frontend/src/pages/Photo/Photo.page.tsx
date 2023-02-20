import { useParams } from 'react-router-dom';

import Page from '@/layouts/Page/Page';

export default function Photo(): JSX.Element {
  const params = useParams();

  return <Page>Photo {params.photoId}</Page>;
}
