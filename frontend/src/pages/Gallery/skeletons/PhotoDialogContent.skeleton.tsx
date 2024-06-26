import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Chip from '@/components/dataDisplay/Chip';
import Divider from '@/components/dataDisplay/Divider';
import Image from '@/components/dataDisplay/Image';
import Typography from '@/components/dataDisplay/Typography';
import Skeleton from '@/components/feedback/Skeleton';
import Box from '@/components/layout/Box';
import Grid from '@/components/layout/Grid';
import Stack from '@/components/layout/Stack';
import Paper from '@/components/surfaces/Paper';
import { ApiResponse } from '@/types/api/data.types';
import { Photo } from '@/types/api/photo.types';

import { LANDSCAPE_PHOTO_LARGE_SCREEN_HEIGHT, LANDSCAPE_PHOTO_SMALL_SCREEN_HEIGHT } from '../constants';

export interface PhotoDialogProps {
  photo?: ApiResponse<Photo>;
}

const StyledPhotoDialogContentSkeleton = styled(Box)(({ theme }): { [key: string]: any } => ({
  '.rgf': {
    '&-photoDialog': {
      '&--content': {
        '&Date, &Caption, &Details, &Tags, &Title': {
          padding: theme.spacing(1.5),
        },
      },
      '&--contentTags': {
        '.rgf-chip': {
          margin: theme.spacing(0.5, 0.75),
        },
      },
      '&--image': {
        minHeight: LANDSCAPE_PHOTO_SMALL_SCREEN_HEIGHT,
      },
    },
  },

  paddingBottom: theme.spacing(3),

  [theme.breakpoints.up('laptop')]: {
    '.rgf': {
      '&-photoDialog': {
        '&--content': {
          '&Date, &Caption, &Details, &Tags, &Title': {
            padding: theme.spacing(1.5, 2),
          },
          '&DetailsColumnOne': {
            paddingRight: theme.spacing(4),
          },
        },
        '&--contentTags': {
          '.rgf-chip': {
            margin: theme.spacing(0.5, 1),
          },
        },
        '&--image': {
          minHeight: LANDSCAPE_PHOTO_LARGE_SCREEN_HEIGHT,
        },
      },
    },
  },
}));

export default function PhotoDialogContentSkeleton(props: PhotoDialogProps): JSX.Element {
  const { photo } = props;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.between('mobile', 'laptop'));

  const imageHeight = photo?.data.image.height || 720;
  const imageUrl = photo?.data.image.url || '../../../../src/assets/images/greyBackground_landscape.jpg';

  const renderImageSkeleton = (): JSX.Element => (
    <Image
      alt="Image skeleton loader"
      className="rgf-photoDialog--image"
      isMinimumLoad
      maxHeight={imageHeight}
      maxWidth="100%"
      minimumLoadTime="infinite"
      src={imageUrl}
      variant="square"
    />
  );

  const renderTitleSkeleton = (): JSX.Element => (
    <Paper className="rgf-photoDialog--contentTitle" elevation={1}>
      <Stack alignItems="center" justifyContent="spaceBetween" spacing={1}>
        <Skeleton>
          <Typography variant="h3">Skeleton title</Typography>
        </Skeleton>

        <Skeleton variant="text">
          <Typography align="right" variant="subtitle">
            11/11/2011
          </Typography>
        </Skeleton>
      </Stack>
    </Paper>
  );

  const renderTagsSkeleton = (): JSX.Element => (
    <Stack className="rgf-photoDialog--contentTags" spacing={2}>
      <Skeleton height={32}>
        <Chip label="Tag 1" />
      </Skeleton>
      <Skeleton height={32}>
        <Chip label="Tag 2" />
      </Skeleton>
    </Stack>
  );

  const renderCaptionSkeleton = (): JSX.Element => (
    <Box className="rgf-photoDialog--contentCaption">
      <Skeleton width={isSmallScreen ? '100%' : '50%'} variant="text" />
      <Skeleton width={isSmallScreen ? '100%' : '50%'} variant="text" />
      <Skeleton width={isSmallScreen ? '50%' : '25%'} variant="text" />
    </Box>
  );

  const renderDetailsSkeleton = (): JSX.Element => (
    <Grid className="rgf-photoDialog--contentDetails" isContainer>
      <Grid className="rgf-photoDialog--contentDetailsColumnOne" direction="column" mobile={12} laptop="auto">
        <Skeleton variant="text" height={32}>
          <Typography>Mr Skeleton Skelly</Typography>
        </Skeleton>

        <Skeleton variant="text" height={32}>
          <Typography>Skeleton Lane, Skellyville</Typography>
        </Skeleton>

        <Skeleton variant="text" height={32}>
          <Typography>Skeleton camera name</Typography>
        </Skeleton>

        <Skeleton variant="text" height={32}>
          <Typography>Skeleton lens name</Typography>
        </Skeleton>
      </Grid>

      <Grid className="rgf-photoDialog--contentDetailsColumnTwo" direction="column" mobile={12} laptop="auto">
        <Skeleton variant="text" height={32}>
          <Typography>f/1.8</Typography>
        </Skeleton>

        <Skeleton variant="text" height={32}>
          <Typography>700mm</Typography>
        </Skeleton>

        <Skeleton variant="text" height={32}>
          <Typography>100 ISO</Typography>
        </Skeleton>

        <Skeleton variant="text" height={32}>
          <Typography>1/1000</Typography>
        </Skeleton>
      </Grid>
    </Grid>
  );

  const renderDateSkeleton = (): JSX.Element => (
    <Box className="rgf-photoDialog--contentDate">
      <Skeleton variant="text">
        <Typography variant="subtitle">Friday, 11 November 2011 at 11:11</Typography>
      </Skeleton>
    </Box>
  );

  return (
    <StyledPhotoDialogContentSkeleton>
      {renderImageSkeleton()}

      {renderTitleSkeleton()}

      {renderTagsSkeleton()}

      <Divider />

      {renderCaptionSkeleton()}

      <Divider />

      {renderDetailsSkeleton()}

      <Divider />

      {renderDateSkeleton()}
    </StyledPhotoDialogContentSkeleton>
  );
}
