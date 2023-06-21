import { useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import Dialog from '@/components/dataDisplay/Dialog';
import Image from '@/components/dataDisplay/Image';
import Typography from '@/components/dataDisplay/Typography';
import Alert from '@/components/feedback/Alert';
import CircularProgress from '@/components/feedback/CircularProgress';
import Button from '@/components/inputs/Button';
import Box from '@/components/layout/Box';
import usePhoto from '@/hooks/queries/usePhoto';
import useErrorMessage from '@/hooks/shared/useErrorMessage';

import useGallery from '../hooks/useGallery';

const StyledPhotoDialog = styled(Dialog)(({ theme }): { [key: string]: any } => ({
  '.rgf-dialog--content': {
    padding: 0,
  },
  '.rgf-photoDialog--content': {
    padding: theme.spacing(0, 2),
  },
  '.rgf-photoDialog--contentTitle': {
    padding: theme.spacing(1, 0),
  },
}));

export default function PhotoDialog(): JSX.Element {
  const { photoId = '' } = useParams();
  const { isPhotoDialogOpen, togglePhotoDialog } = useGallery();
  const { data: photo, isError, isLoading, error } = usePhoto(photoId);

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

    const imageUrl = photo?.data.image.url || '';
    const title = photo?.data.title || '';
    const caption = photo?.data.caption || '';
    const tags = photo?.data.tags.map((tag): any => tag.tag || '');
    const location = photo?.data.location || '';
    const captureDate = photo?.data.captureDate || '';
    const photographerName = photo?.data.photographer.name || '';
    const equipmentCamera = photo?.data.equipment.camera || '';
    const equipmentLens = photo?.data.equipment.lens || '';
    const settingsAperture = photo?.data.settings.aperture || '';
    const settingsFocalLength = photo?.data.settings.focalLength || '';
    const settingsIso = photo?.data.settings.iso || '';
    const settingsShutterSpeed = photo?.data.settings.shutterSpeed || '';

    return (
      <>
        <Image alt={title} maxWidth="100%" src={imageUrl} variant="square" />

        <Box className="rgf-photoDialog--content">
          <Typography className="rgf-photoDialog--contentTitle" variant="h3">
            {title}
          </Typography>
          <Typography>{caption}</Typography>
          <Typography>{tags}</Typography>
          <Typography>{location}</Typography>
          <Typography>{`${captureDate}`}</Typography>
          <Typography>{photographerName}</Typography>
          <Typography>{equipmentCamera}</Typography>
          <Typography>{equipmentLens}</Typography>
          <Typography>{settingsAperture}</Typography>
          <Typography>{settingsFocalLength}</Typography>
          <Typography>{settingsIso}</Typography>
          <Typography>{settingsShutterSpeed}</Typography>
        </Box>
      </>
    );
  };

  return (
    <StyledPhotoDialog
      className="rgf-photoDialog"
      dialogActions={
        <Button onClick={(): void => {}} variant="tertiary">
          Purchase
        </Button>
      }
      isOpen={isPhotoDialogOpen}
      maxWidth="desktop"
      setIsOpen={(isOpen): void => togglePhotoDialog(isOpen, photoId)}
      onMoreOptionsClick={(): void => {}}
    >
      {renderDialogContent()}
    </StyledPhotoDialog>
  );
}
