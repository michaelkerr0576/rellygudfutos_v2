import { useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import ApertureIcon from '@/assets/icons/ApertureIcon';
import CameraIcon from '@/assets/icons/CameraIcon';
import LightIcon from '@/assets/icons/LightIcon';
import LocationIcon from '@/assets/icons/LocationIcon';
import PersonIcon from '@/assets/icons/PersonIcon';
import ShutterSpeedIcon from '@/assets/icons/ShutterSpeedIcon';
import Chip from '@/components/dataDisplay/Chip';
import Dialog from '@/components/dataDisplay/Dialog';
import Divider from '@/components/dataDisplay/Divider';
import Image from '@/components/dataDisplay/Image';
import Typography from '@/components/dataDisplay/Typography';
import TypographyIcon from '@/components/dataDisplay/TypographyIcon';
import Alert from '@/components/feedback/Alert';
import CircularProgress from '@/components/feedback/CircularProgress';
import Button from '@/components/inputs/Button';
import Box from '@/components/layout/Box';
import Paper from '@/components/surfaces/Paper';
import usePhoto from '@/hooks/queries/usePhoto';
import useErrorMessage from '@/hooks/shared/useErrorMessage';

import useGallery from '../hooks/useGallery';

const StyledPhotoDialog = styled(Dialog)(({ theme }): { [key: string]: any } => ({
  '.rgf-dialog--content': {
    padding: 0,
  },
  '.rgf-photoDialog--content': {
    '.rgf-photoDialog--contentDate, .rgf-photoDialog--contentDescription, .rgf-photoDialog--contentTitle': {
      padding: theme.spacing(1.5, 2),
    },
    '.rgf-photoDialog--contentDescription': {
      '.rgf-typographyIcon:first-of-type': {
        paddingTop: theme.spacing(1.5),
      },
    },
    '.rgf-photoDialog--contentTags': {
      '.rgf-chip': {
        margin: theme.spacing(0.5, 1),
      },

      padding: theme.spacing(1, 0),
    },
    '.rgf-typographyIcon': {
      padding: theme.spacing(0.5, 0),
    },
  },
  '.rgf-photoDialog--error': {
    padding: theme.spacing(1.5, 2),
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

  const renderDialogContentTitle = (): JSX.Element => {
    const title = photo?.data.title || '';

    return (
      <Paper className="rgf-photoDialog--contentTitle" elevation={1}>
        <Typography variant="h3">{title}</Typography>
      </Paper>
    );
  };

  const renderDialogContentTags = (): JSX.Element => {
    // TODO - get actual tags from photo
    const tags = photo?.data.tags.map((tag): any => tag.tag || '');
    console.log(tags);

    return (
      <Box className="rgf-photoDialog--contentTags">
        <Chip label="test" onClick={(): void => {}} />
        <Chip label="test" onClick={(): void => {}} />
        <Chip label="test" onClick={(): void => {}} />
        <Chip label="test" onClick={(): void => {}} />
      </Box>
    );
  };

  const renderDialogContentDescription = (): JSX.Element => {
    const caption = photo?.data.caption || '';
    const location = photo?.data.location || '';
    const photographerName = photo?.data.photographer.name || '';
    const equipmentCamera = photo?.data.equipment.camera || '';
    const equipmentLens = photo?.data.equipment.lens || '';
    const settingsAperture = photo?.data.settings.aperture || '';
    const settingsFocalLength = photo?.data.settings.focalLength || '';
    const settingsIso = photo?.data.settings.iso || '';
    const settingsShutterSpeed = photo?.data.settings.shutterSpeed || '';

    return (
      <Box className="rgf-photoDialog--contentDescription">
        <Typography>
          {caption} The meandering mountain pass that joins the cities of Da Nang and Hue, Vietnam
        </Typography>

        <TypographyIcon
          startIcon={<PersonIcon size="small" variant="filled" />}
          typography={<Typography>{photographerName}</Typography>}
        />

        <TypographyIcon
          startIcon={<LocationIcon size="small" variant="filled" />}
          typography={<Typography>{location}</Typography>}
        />

        <TypographyIcon
          startIcon={<CameraIcon size="small" variant="filled" />}
          typography={<Typography>{equipmentCamera}</Typography>}
        />

        {/* TODO - get custom lens icon */}
        <Typography>{equipmentLens}</Typography>

        <TypographyIcon
          startIcon={<ApertureIcon size="small" variant="filled" />}
          typography={<Typography>{settingsAperture}</Typography>}
        />

        {/* TODO - get custom focal length icon */}
        <Typography>{settingsFocalLength}</Typography>

        <TypographyIcon
          startIcon={<LightIcon size="small" variant="filled" />}
          typography={<Typography>{settingsIso} ISO</Typography>}
        />

        <TypographyIcon
          startIcon={<ShutterSpeedIcon size="small" />}
          typography={<Typography>{settingsShutterSpeed}</Typography>}
        />
      </Box>
    );
  };

  const renderDialogContentDate = (): JSX.Element => {
    // TODO - format date from BE
    const captureDate = photo?.data.captureDate || '';

    return (
      <Box className="rgf-photoDialog--error">
        <Typography variant="subtitle">{`${captureDate}`}</Typography>
      </Box>
    );
  };

  const renderDialogContent = (): JSX.Element => {
    if (isError) {
      return (
        <Box className="rgf-photoDialog--error">
          <Alert message={errorMessage || defaultErrorMessage} severity={errorSeverity || 'error'} />
        </Box>
      );
    }

    // TODO - Replace with skeleton loader
    if (isLoading) {
      return <CircularProgress />;
    }

    const imageUrl = photo?.data.image.url || '';
    const title = photo?.data.title || '';

    return (
      <>
        <Image alt={title} maxWidth="100%" src={imageUrl} variant="square" />

        <Box className="rgf-photoDialog--content">
          {renderDialogContentTitle()}

          {renderDialogContentTags()}

          <Divider />

          {renderDialogContentDescription()}

          <Divider />

          {renderDialogContentDate()}
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
