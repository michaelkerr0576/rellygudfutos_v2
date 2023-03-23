import clsx from 'clsx';

import MuiImageList, { ImageListProps as MuiImageListProps } from '@mui/material/ImageList';
import MuiImageListItem from '@mui/material/ImageListItem';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const IMAGE_CONTAINER_COLUMNS = 15;
export const IMAGE_CONTAINER_LARGE_SCREEN_GAP = 16; // * The gap between images in px
export const IMAGE_CONTAINER_SMALL_SCREEN_GAP = 8; // * The gap between images in px

export const IMAGE_LANDSCAPE_COLUMNS = 9;
export const IMAGE_PORTRAIT_COLUMNS = 6;

export const IMAGE_LANDSCAPE_ROWS = 6;
export const IMAGE_PORTRAIT_ROWS = 9;

export const MAX_IMAGE_LANDSCAPE_HEIGHT = '720px';
export const MAX_IMAGE_LANDSCAPE_WIDTH = '1080px';
export const MAX_IMAGE_PORTRAIT_HEIGHT = '1080px';
export const MAX_IMAGE_PORTRAIT_WIDTH = '720px';

// * 1800px = MAX_IMAGE_LANDSCAPE_WIDTH + MAX_IMAGE_PORTRAIT_WIDTH
export const MAX_IMAGE_CONTAINER_WIDTH = '1800px';

type Orientation = 'landscape' | 'portrait';
type Variant = 'grid' | 'list';

export type Image = {
  img: string;
  orientation: Orientation;
  title: string;
};

export interface ImageListProps {
  className?: MuiImageListProps['className'];
  images: Image[];
  variant: Variant;
}

const StyledMuiImageList = styled(MuiImageList)((): { [key: string]: any } => ({
  '.rgf_imageList__listItem': {
    '.MuiImageListItem-img': {
      borderRadius: 4,
      objectFit: 'cover',
    },

    display: 'flex',
    justifyContent: 'center',
  },

  margin: '0 auto',
  maxWidth: MAX_IMAGE_CONTAINER_WIDTH,
}));

export default function ImageList(props: ImageListProps): JSX.Element {
  const { className = '', images, variant } = props;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.between('mobile', 'laptop'));

  const renderImageListItems = (): JSX.Element[] =>
    images.map((image, index): JSX.Element => {
      const isLandscapeOrientation = image.orientation === 'landscape';

      const getColumns = (): number => {
        if (variant === 'list') {
          return IMAGE_CONTAINER_COLUMNS;
        }

        return isLandscapeOrientation ? IMAGE_LANDSCAPE_COLUMNS : IMAGE_PORTRAIT_COLUMNS;
      };

      const getRows = (): number => {
        if (variant === 'list') {
          return IMAGE_CONTAINER_COLUMNS;
        }

        return isLandscapeOrientation ? IMAGE_LANDSCAPE_ROWS : IMAGE_PORTRAIT_ROWS;
      };

      return (
        <MuiImageListItem
          className="rgf_imageList__listItem"
          // TODO - give unique key when connected to API
          // eslint-disable-next-line react/no-array-index-key
          key={`${image.img}_${index}`}
          cols={getColumns()}
          rows={getRows()}
        >
          {/* // TODO - create image component with skeleton loader */}
          <img
            src={image.img}
            alt={image.title}
            loading="lazy"
            style={{
              maxHeight: isLandscapeOrientation ? MAX_IMAGE_LANDSCAPE_HEIGHT : MAX_IMAGE_PORTRAIT_HEIGHT,
              maxWidth: isLandscapeOrientation ? MAX_IMAGE_LANDSCAPE_WIDTH : MAX_IMAGE_PORTRAIT_WIDTH,
            }}
          />
        </MuiImageListItem>
      );
    });

  return (
    <StyledMuiImageList
      className={clsx('rgf_imageList', { [className]: className })}
      variant="quilted"
      cols={IMAGE_CONTAINER_COLUMNS}
      gap={isSmallScreen ? IMAGE_CONTAINER_SMALL_SCREEN_GAP : IMAGE_CONTAINER_LARGE_SCREEN_GAP}
    >
      {renderImageListItems()}
    </StyledMuiImageList>
  );
}
