import clsx from 'clsx';

import MuiImageList, { ImageListProps as MuiImageListProps } from '@mui/material/ImageList';
import MuiImageListItem from '@mui/material/ImageListItem';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Image from './Image';

export const IMAGE_CONTAINER_COLUMNS = 3;
export const IMAGE_CONTAINER_LARGE_SCREEN_GAP = 16; // * The gap between images in px
export const IMAGE_CONTAINER_SMALL_SCREEN_GAP = 8; // * The gap between images in px

export const IMAGE_ROWS = 3;
export const IMAGE_LANDSCAPE_COLUMNS = 2;
export const IMAGE_LANDSCAPE_ROWS = 1;
export const IMAGE_PORTRAIT_COLUMNS = 1;
export const IMAGE_PORTRAIT_ROWS = 2;

type Orientation = 'landscape' | 'portrait';
type Variant = 'grid' | 'list';

export type ImageListItem = {
  id: string;
  img: string;
  orientation: Orientation;
  title: string;
};

export interface ImageListProps {
  className?: MuiImageListProps['className'];
  images: ImageListItem[];
  maxWidth?: string;
  variant: Variant;
}

const StyledMuiImageList = styled(MuiImageList)((): { [key: string]: any } => ({
  margin: '0 auto',
}));

export default function ImageList(props: ImageListProps): JSX.Element {
  const { className = '', images, maxWidth = 'inherit', variant } = props;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.between('mobile', 'laptop'));

  const renderImageListItems = (): JSX.Element[] =>
    images.map((image): JSX.Element => {
      const isLandscapeOrientation = image.orientation === 'landscape';

      const getColumns = (): number => {
        if (variant === 'list') {
          return IMAGE_CONTAINER_COLUMNS;
        }

        return isLandscapeOrientation ? IMAGE_LANDSCAPE_COLUMNS : IMAGE_PORTRAIT_COLUMNS;
      };

      const getRows = (): number => {
        if (variant === 'list') {
          return IMAGE_ROWS;
        }

        return isLandscapeOrientation ? IMAGE_LANDSCAPE_ROWS : IMAGE_PORTRAIT_ROWS;
      };

      return (
        <MuiImageListItem
          className="rgf_imageList__listItem"
          key={image.id}
          cols={getColumns()}
          rows={getRows()}
        >
          <Image alt={image.title} src={image.img} />
        </MuiImageListItem>
      );
    });

  return (
    <StyledMuiImageList
      className={clsx('rgf_imageList', { [className]: className })}
      cols={IMAGE_CONTAINER_COLUMNS}
      gap={isSmallScreen ? IMAGE_CONTAINER_SMALL_SCREEN_GAP : IMAGE_CONTAINER_LARGE_SCREEN_GAP}
      style={{ maxWidth }}
      variant="quilted"
    >
      {renderImageListItems()}
    </StyledMuiImageList>
  );
}
