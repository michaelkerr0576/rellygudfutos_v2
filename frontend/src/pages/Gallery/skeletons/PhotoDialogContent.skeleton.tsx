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

import { LANDSCAPE_PHOTO_LARGE_SCREEN_HEIGHT, LANDSCAPE_PHOTO_SMALL_SCREEN_HEIGHT } from '../constants';

const StyledPhotoDialogContentSkeleton = styled('div')(({ theme }): { [key: string]: any } => ({
  '.rgf': {
    '&-photoDialog': {
      '&--content': {
        '&Date, &Caption, &Details, &Tags, &Title': {
          padding: theme.spacing(1.5, 2),
        },
      },
      '&--contentTags': {
        '.rgf-chip': {
          margin: theme.spacing(0.5, 1),
        },
      },
    },
  },

  paddingBottom: theme.spacing(3),

  [theme.breakpoints.up('laptop')]: {
    '.rgf': {
      '&-photoDialog': {
        '&--content': {
          '&DetailsColumnOne': {
            paddingRight: theme.spacing(4),
          },
        },
      },
    },
  },
}));

export default function PhotoDialogContentSkeleton(): JSX.Element {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.between('mobile', 'laptop'));

  const renderImageSkeleton = (): JSX.Element => (
    <Skeleton
      minHeight={isSmallScreen ? LANDSCAPE_PHOTO_SMALL_SCREEN_HEIGHT : LANDSCAPE_PHOTO_LARGE_SCREEN_HEIGHT}
      width="100%"
    >
      <Image
        alt="Image skeleton loader"
        isPermanentlyLoading
        maxHeight="720px"
        maxWidth="1080px"
        src="../../../../src/assets/images/greyBackground_landscape.jpg"
        variant="square"
      />
    </Skeleton>
  );

  const renderTitleSkeleton = (): JSX.Element => (
    <Paper className="rgf-photoDialog--contentTitle" elevation={1}>
      <Stack alignItems="center" justifyContent="spaceBetween" spacing={1}>
        <Skeleton>
          <Typography variant="h3">Skeleton title</Typography>{' '}
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
      <Skeleton height="32px">
        <Chip label="Tag 1" />
      </Skeleton>
      <Skeleton height="32px">
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
        <Skeleton variant="text" height="32px">
          <Typography>Mr Skeleton Skelly</Typography>{' '}
        </Skeleton>

        <Skeleton variant="text" height="32px">
          <Typography>Skeleton Lane, Skellyville</Typography>{' '}
        </Skeleton>

        <Skeleton variant="text" height="32px">
          <Typography>Skeleton camera name</Typography>{' '}
        </Skeleton>

        <Skeleton variant="text" height="32px">
          <Typography>Skeleton lens name</Typography>{' '}
        </Skeleton>
      </Grid>

      <Grid className="rgf-photoDialog--contentDetailsColumnTwo" direction="column" mobile={12} laptop="auto">
        <Skeleton variant="text" height="32px">
          <Typography>f/1.8</Typography>{' '}
        </Skeleton>

        <Skeleton variant="text" height="32px">
          <Typography>700mm</Typography>{' '}
        </Skeleton>

        <Skeleton variant="text" height="32px">
          <Typography>100 ISO</Typography>{' '}
        </Skeleton>

        <Skeleton variant="text" height="32px">
          <Typography>1/1000</Typography>{' '}
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
