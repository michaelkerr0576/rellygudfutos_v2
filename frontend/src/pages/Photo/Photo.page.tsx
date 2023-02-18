import { useParams } from 'react-router-dom';

export default function Photo(): JSX.Element {
  const params = useParams();

  return <div>Photo {params.photoId}</div>;
}
