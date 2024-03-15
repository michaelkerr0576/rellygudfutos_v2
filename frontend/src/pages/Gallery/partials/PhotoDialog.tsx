import { useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import ApertureIcon from '@/assets/icons/ApertureIcon';
import CameraIcon from '@/assets/icons/CameraIcon';
import CartIcon from '@/assets/icons/CartIcon';
import FocalLengthIcon from '@/assets/icons/FocalLengthIcon';
import LensIcon from '@/assets/icons/LensIcon';
import LightIcon from '@/assets/icons/LightIcon';
import LocationIcon from '@/assets/icons/LocationIcon';
import PersonIcon from '@/assets/icons/PersonIcon';
import ShareIcon from '@/assets/icons/ShareIcon';
import ShutterSpeedIcon from '@/assets/icons/ShutterSpeedIcon';
import Chip from '@/components/dataDisplay/Chip';
import Dialog from '@/components/dataDisplay/Dialog';
import Divider from '@/components/dataDisplay/Divider';
import Image from '@/components/dataDisplay/Image';
import Typography from '@/components/dataDisplay/Typography';
import TypographyIcon from '@/components/dataDisplay/TypographyIcon';
import Alert from '@/components/feedback/Alert';
import Button from '@/components/inputs/Button';
import Box from '@/components/layout/Box';
import Grid from '@/components/layout/Grid';
import Stack from '@/components/layout/Stack';
import Paper from '@/components/surfaces/Paper';
import usePhoto from '@/hooks/queries/usePhoto';
import useErrorMessage from '@/hooks/shared/useErrorMessage';
import { PhotoTag } from '@/types/api/photo.types';
import { formatDateTime } from '@/utils/dateTime.utils';

import useGallery from '../hooks/useGallery';
import PhotoDialogContentSkeleton from '../skeletons/PhotoDialogContent.skeleton';

const StyledPhotoDialog = styled(Dialog)(({ theme }): { [key: string]: any } => ({
  '.rgf': {
    '&-dialog': {
      '&--content': {
        minHeight: '80vh',
        padding: 0,
      },
    },
    '&-photoDialog': {
      '&--content': {
        '&Date, &Caption, &Details, &Title': {
          padding: theme.spacing(1.5),
        },
        '&Tags': {
          '.rgf-chip': {
            margin: theme.spacing(0.5, 0.75),
          },

          padding: theme.spacing(1, 0),
        },
        '.rgf-typographyIcon': {
          padding: theme.spacing(0.5, 0),
        },

        paddingBottom: theme.spacing(3),
      },

      '&--error': {
        padding: theme.spacing(1.5),
      },
    },
  },

  [theme.breakpoints.up('laptop')]: {
    '.rgf': {
      '&-photoDialog': {
        '&--content': {
          '&Date, &Caption, &Details, &Title': {
            padding: theme.spacing(1.5, 2),
          },
          '&DetailsColumnOne': {
            paddingRight: theme.spacing(4),
          },
          '&Tags': {
            '.rgf-chip': {
              margin: theme.spacing(0.5, 1),
            },
          },
        },
        '&--error': {
          padding: theme.spacing(1.5, 2),
        },
      },
    },
  },
}));

export default function PhotoDialog(): JSX.Element {
  const { photoId = '' } = useParams();

  const { handleTogglePhotoDialog, isPhotoDialogOpen } = useGallery();

  const { data: photo, isError, isLoading, error } = usePhoto(photoId);

  const defaultErrorMessage =
    'There was an error retrieving the photo from the server. Please try refreshing the page or go back to the Gallery';
  const { errorMessage, errorSeverity } = useErrorMessage({ defaultErrorMessage, error });

  const renderDialogContent = (): JSX.Element => {
    const renderDialogContentTitle = (): JSX.Element => {
      const title = photo?.data.title || '';
      const captureDate = photo?.data.captureDate || '';
      const formattedCaptureDate = formatDateTime(captureDate);

      return (
        <Paper className="rgf-photoDialog--contentTitle" elevation={1}>
          <Stack alignItems="center" justifyContent="spaceBetween" spacing={1}>
            <Typography variant="h3">{title}</Typography>

            <Typography align="right" color="secondary" variant="subtitle">
              {formattedCaptureDate}
            </Typography>
          </Stack>
        </Paper>
      );
    };

    const renderDialogContentTags = (): JSX.Element => {
      const tags = photo?.data.tags.map((tag): PhotoTag => tag) || [];

      // TODO - onClick tag does a filter on photos by that tag and returns user to Gallery
      return (
        <Box className="rgf-photoDialog--contentTags">
          {tags.map(
            (tag): JSX.Element => (
              <Chip key={tag._id} label={tag.tag} onClick={(): void => {}} />
            ),
          )}
        </Box>
      );
    };

    const renderDialogContentCaption = (): JSX.Element => {
      const caption = photo?.data.caption || '';

      return (
        <Box className="rgf-photoDialog--contentCaption">
          <Typography isParagraph>
            {caption} The meandering mountain pass that joins the cities of Da Nang and Hue, Vietnam
          </Typography>
        </Box>
      );
    };

    const renderDialogContentDetails = (): JSX.Element => {
      const location = photo?.data.location || '';
      const photographerName = photo?.data.photographer.name || '';
      const equipmentCamera = photo?.data.equipment.camera || '';
      const equipmentLens = photo?.data.equipment.lens || '';
      const settingsAperture = photo?.data.settings.aperture || '';
      const settingsFocalLength = photo?.data.settings.focalLength || '';
      const settingsIso = photo?.data.settings.iso || '';
      const settingsShutterSpeed = photo?.data.settings.shutterSpeed || '';

      return (
        <Grid className="rgf-photoDialog--contentDetails" isContainer>
          <Grid
            className="rgf-photoDialog--contentDetailsColumnOne"
            direction="column"
            mobile={12}
            laptop="auto"
          >
            <TypographyIcon
              startIcon={<PersonIcon color="secondary" size="small" />}
              typography={<Typography color="secondary">{photographerName}</Typography>}
            />

            <TypographyIcon
              startIcon={<LocationIcon color="secondary" size="small" />}
              typography={<Typography color="secondary">{location}</Typography>}
            />

            <TypographyIcon
              startIcon={<CameraIcon color="secondary" size="small" />}
              typography={<Typography color="secondary">{equipmentCamera}</Typography>}
            />

            <TypographyIcon
              startIcon={<LensIcon color="secondary" size="small" />}
              typography={<Typography color="secondary">{equipmentLens}</Typography>}
            />
          </Grid>

          <Grid
            className="rgf-photoDialog--contentDetailsColumnTwo"
            direction="column"
            mobile={12}
            laptop="auto"
          >
            <TypographyIcon
              startIcon={<ApertureIcon color="secondary" size="small" />}
              typography={<Typography color="secondary">{settingsAperture}</Typography>}
            />

            <TypographyIcon
              startIcon={<FocalLengthIcon color="secondary" size="small" />}
              typography={<Typography color="secondary">{settingsFocalLength}</Typography>}
            />

            <TypographyIcon
              startIcon={<LightIcon color="secondary" size="small" />}
              typography={<Typography color="secondary">{settingsIso} ISO</Typography>}
            />

            <TypographyIcon
              startIcon={<ShutterSpeedIcon color="secondary" size="small" />}
              typography={<Typography color="secondary">{settingsShutterSpeed}</Typography>}
            />
          </Grid>
        </Grid>
      );
    };

    const renderDialogContentDate = (): JSX.Element => {
      const captureDate = photo?.data.captureDate || '';
      const formattedCaptureDate = formatDateTime(captureDate, 'full', 'short');

      return (
        <Box className="rgf-photoDialog--contentDate">
          <Typography color="secondary" variant="subtitle">
            {formattedCaptureDate}
          </Typography>
        </Box>
      );
    };

    if (isError) {
      return (
        <Box className="rgf-photoDialog--error">
          <Alert message={errorMessage || defaultErrorMessage} severity={errorSeverity || 'error'} />
        </Box>
      );
    }

    if (isLoading) {
      return <PhotoDialogContentSkeleton />;
    }

    const imageUrl = photo?.data.image.url || '';
    const imageHeight = photo?.data.image.height || 'inherit';
    const title = photo?.data.title || '';

    return (
      <>
        <Image
          alt={title}
          isOnClickNewTabEnabled
          maxHeight={imageHeight}
          maxWidth="100%"
          src={imageUrl}
          variant="square"
        />

        <Box className="rgf-photoDialog--content">
          {renderDialogContentTitle()}

          {renderDialogContentTags()}

          <Divider />

          {renderDialogContentCaption()}

          <Divider />

          {renderDialogContentDetails()}

          <Divider />

          {renderDialogContentDate()}
        </Box>
      </>
    );
  };

  const renderDialogActions = (): JSX.Element => (
    <Stack alignItems="center" justifyContent="end" spacing={1}>
      <Button onClick={(): void => {}} startIcon={<ShareIcon size="large" />} variant="tertiary">
        Share
      </Button>

      <Button onClick={(): void => {}} startIcon={<CartIcon size="large" />}>
        Purchase
      </Button>
    </Stack>
  );

  return (
    <StyledPhotoDialog
      className="rgf-photoDialog"
      dialogActions={renderDialogActions()}
      isOpen={isPhotoDialogOpen}
      maxWidth="desktop"
      setIsOpen={(isOpen): void => handleTogglePhotoDialog(isOpen, photoId)}
      onMoreOptionsClick={(): void => {}}
    >
      {renderDialogContent()}
    </StyledPhotoDialog>
  );
}
