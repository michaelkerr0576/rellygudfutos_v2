import { useParams } from 'react-router-dom';

import Dialog from '@/components/dataDisplay/Dialog';
import Alert from '@/components/feedback/Alert';
import CircularProgress from '@/components/feedback/CircularProgress';
import Button from '@/components/inputs/Button';
import usePhoto from '@/hooks/queries/usePhoto';
import useErrorMessage from '@/hooks/shared/useErrorMessage';

import useGallery from '../hooks/useGallery';

export default function PhotoDialog(): JSX.Element {
  const { photoId = '' } = useParams();
  const { isPhotoDialogOpen, togglePhotoDialog } = useGallery();
  const { isError, isLoading, error } = usePhoto(photoId);

  const defaultErrorMessage =
    'There was an error retrieving the photo from the server. Please try refreshing the page or go back to the Gallery';
  const { errorMessage, errorSeverity } = useErrorMessage(error, defaultErrorMessage);

  if (!photoId) {
    togglePhotoDialog(false);
  }

  const renderDialogContent = (): JSX.Element => {
    if (isError) {
      return <Alert message={errorMessage || defaultErrorMessage} severity={errorSeverity || 'error'} />;
    }

    // TODO - Replace with skeleton loader
    if (isLoading) {
      return <CircularProgress />;
    }

    return (
      <>
        {[...new Array(50)]
          .map(
            (): string => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
          )
          .join('\n')}
      </>
    );
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
