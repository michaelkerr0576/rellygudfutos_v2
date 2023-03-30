import { useParams } from 'react-router-dom';

import Dialog from '@/components/dataDisplay/Dialog';
import Button from '@/components/inputs/Button';

import useGallery from '../hooks/useGallery';

export default function PhotoDialog(): JSX.Element {
  const { photoId } = useParams();
  const { isPhotoDialogOpen, togglePhotoDialog } = useGallery();

  // TODO - Add alert for not photoId in URl
  if (!photoId) {
    return <div>test</div>;
  }

  // TODO - Add with isError and isLoading from new react query usePhoto hook

  return (
    <Dialog
      className="rgf_photoDialog"
      isOpen={isPhotoDialogOpen}
      maxWidth="desktop"
      setIsOpen={(isOpen): void => togglePhotoDialog(isOpen, photoId)}
      title="Hoi An Central Market Hussle and Bussle"
      dialogActions={
        <Button onClick={(): void => {}} variant="tertiary">
          Purchase
        </Button>
      }
    >
      {[...new Array(50)]
        .map(
          (): string => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
        )
        .join('\n')}
    </Dialog>
  );
}
