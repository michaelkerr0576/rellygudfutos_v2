import { useParams } from 'react-router-dom';

import Dialog from '@/components/dataDisplay/Dialog';
import Alert from '@/components/feedback/Alert';
import CircularProgress from '@/components/feedback/CircularProgress';
import Button from '@/components/inputs/Button';
import usePhoto from '@/hooks/queries/usePhoto';

import useGallery from '../hooks/useGallery';

export default function PhotoDialog(): JSX.Element {
  const { photoId = '' } = useParams();

  const { isPhotoDialogOpen, togglePhotoDialog } = useGallery();
  const { isError, isLoading } = usePhoto({ photoId });

  const renderDialogContent = (): JSX.Element => {
    if (!photoId) {
      return (
        <Alert
          message="There is no photoId in the URL."
          severity="warning"
          suggestion="Please go back to the Gallery."
        />
      );
    }

    if (isError) {
      return (
        <Alert
          message="There was an error retrieving the photo from the server."
          severity="error"
          suggestion="Please try refreshing the page or go back to the Gallery."
        />
      );
    }

    // TODO - Replace with skeleton loader
    if (isLoading) {
      return <CircularProgress />;
    }

    return <>test</>;
  };

  return (
    <Dialog
      className="rgf-photoDialog"
      isOpen={isPhotoDialogOpen}
      maxWidth="desktop"
      setIsOpen={(isOpen): void => togglePhotoDialog(isOpen, photoId)}
      // TODO - put skeleton loader while retrieving title from API
      title="Hoi An Central Market Hussle and Bussle"
      dialogActions={
        <Button onClick={(): void => {}} variant="tertiary">
          Purchase
        </Button>
      }
    >
      {renderDialogContent()}
    </Dialog>
  );
}
