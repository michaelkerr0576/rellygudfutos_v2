import { useParams } from 'react-router-dom';

function Photo(): JSX.Element {
  const params = useParams();

  return <div>Photo {params.photoId}</div>;
}

export default Photo;
