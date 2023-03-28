import clsx from 'clsx';

import MuiImageList, { ImageListProps as MuiImageListProps } from '@mui/material/ImageList';
import MuiImageListItem from '@mui/material/ImageListItem';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Image from './Image';

export const IMAGE_CONTAINER_COLUMNS = 3;
export const IMAGE_LANDSCAPE_COLUMNS = 2;
export const IMAGE_PORTRAIT_COLUMNS = 1;

export const IMAGE_ROWS = 3;
export const IMAGE_LANDSCAPE_ROWS = 1;
export const IMAGE_PORTRAIT_ROWS = 2;

export const IMAGE_LARGE_SCREEN_GAP = 16; // * The gap between images in px
export const IMAGE_SMALL_SCREEN_GAP = 8; // * The gap between images in px

type AspectRatio = 'landscape' | 'portrait';
type Variant = 'grid' | 'list';

export type ImageListItem = {
  aspectRatio: AspectRatio;
  id: string;
  img: string;
  maxHeight?: string;
  maxWidth?: string;
  title: string;
};

export interface ImageListProps {
  className?: MuiImageListProps['className'];
  images: ImageListItem[];
  maxWidth?: string;
  onClick: (imageId: string) => void;
  variant: Variant;
}

const StyledMuiImageList = styled(MuiImageList)((): { [key: string]: any } => ({
  '.rgf_imageList__listItem': {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
  },

  margin: '0 auto',
}));

export default function ImageList(props: ImageListProps): JSX.Element {
  const { className = '', images, maxWidth = 'inherit', onClick, variant } = props;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.between('mobile', 'laptop'));

  const renderImageListItems = (): JSX.Element[] =>
    images.map((image): JSX.Element => {
      const isListVariant = variant === 'list';
      const isLandscapeAspectRatio = image.aspectRatio === 'landscape';

      const getColumns = (): number => {
        if (isListVariant) {
          return IMAGE_CONTAINER_COLUMNS;
        }

        if (isLandscapeAspectRatio) {
          return IMAGE_LANDSCAPE_COLUMNS;
        }

        return IMAGE_PORTRAIT_COLUMNS;
      };

      const getRows = (): number => {
        if (isListVariant) {
          return IMAGE_ROWS;
        }

        if (isLandscapeAspectRatio) {
          return IMAGE_LANDSCAPE_ROWS;
        }

        return IMAGE_PORTRAIT_ROWS;
      };

      return (
        <MuiImageListItem
          className="rgf_imageList__listItem"
          cols={getColumns()}
          key={image.id}
          onClick={(): void => onClick(image.id)}
          rows={getRows()}
        >
          <Image
            alt={image.title}
            maxHeight={image.maxHeight ? image.maxHeight : 'inherit'}
            maxWidth={image.maxWidth ? image.maxWidth : 'inherit'}
            src={image.img}
          />
        </MuiImageListItem>
      );
    });

  return (
    <StyledMuiImageList
      className={clsx('rgf_imageList', { [className]: className })}
      cols={IMAGE_CONTAINER_COLUMNS}
      gap={isSmallScreen ? IMAGE_SMALL_SCREEN_GAP : IMAGE_LARGE_SCREEN_GAP}
      style={{ maxWidth }}
      variant="quilted"
    >
      {renderImageListItems()}
    </StyledMuiImageList>
  );
}
