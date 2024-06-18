import { RefObject } from 'react';
import clsx from 'clsx';

import MuiImageList, { ImageListProps as MuiImageListProps } from '@mui/material/ImageList';
import MuiImageListItem from '@mui/material/ImageListItem';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { MINIMUM_LOADING_TIME_MS, UseMinimumLoadingProps } from '@/hooks/shared/useMinimumLoading';

import Image from './Image';

export const IMAGE_CONTAINER_COLUMNS = 8;
export const IMAGE_LANDSCAPE_COLUMNS = 5;
export const IMAGE_PORTRAIT_COLUMNS = 3;

export const IMAGE_ROWS = 8;
export const IMAGE_LANDSCAPE_ROWS = 6;
export const IMAGE_PORTRAIT_ROWS = 8;

export const IMAGE_LARGE_SCREEN_GAP = 16; // * The gap between images in px
export const IMAGE_SMALL_SCREEN_GAP = 8; // * The gap between images in px

type AspectRatio = 'landscape' | 'portrait';
type Variant = 'grid' | 'list';

type Img = {
  height: number;
  url: string;
  width: number;
};

type ImageListItem = {
  _id: string;
  aspectRatio: AspectRatio;
  image: Img;
  title: string;
};

export interface ImageListProps {
  className?: MuiImageListProps['className'];
  images: ImageListItem[];
  isMinimumLoad?: UseMinimumLoadingProps['isLoading'];
  lastImageRef?: RefObject<any> | ((node?: Element | null) => void);
  maxWidth?: number | 'inherit';
  minimumLoadTime?: UseMinimumLoadingProps['minimumLoadTime'];
  onClick: (imageId: string) => void;
  variant: Variant;
}

interface ImageListStyleProps {
  styleProps: {
    maxWidth: ImageListProps['maxWidth'];
  };
}

const StyledMuiImageList = styled(MuiImageList, {
  shouldForwardProp: (prop): boolean => prop !== 'styleProps', // * Filter out styleProps prop when forwarding to DOM
})<ImageListStyleProps>(({ styleProps: { maxWidth }, theme }): { [key: string]: any } => ({
  '.rgf': {
    '&-imageList': {
      '&--listItem': {
        borderRadius: theme.shape.borderRadius,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
      },
    },
  },

  margin: '0 auto',
  maxWidth,
}));

export default function ImageList(props: ImageListProps): JSX.Element {
  const {
    className = '',
    images,
    isMinimumLoad = false,
    lastImageRef = undefined,
    maxWidth = 'inherit',
    minimumLoadTime = MINIMUM_LOADING_TIME_MS,
    onClick,
    variant,
  } = props;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.between('mobile', 'laptop'));

  const renderImageListItems = (): JSX.Element[] =>
    images.map((image, index): JSX.Element => {
      const { _id: imageId, aspectRatio: imageAspectRatio, title: imageTitle } = image;
      const { height: imageHeight, width: imageWidth, url: imageUrl } = image.image;

      const isLastImage = images.length - 1 === index;
      const isLandscapeAspectRatio = imageAspectRatio === 'landscape';
      const isListVariant = variant === 'list';

      const handleImageClick = (): void => {
        onClick(imageId);
      };

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
          className="rgf-imageList--listItem"
          cols={getColumns()}
          key={imageId}
          onClick={handleImageClick}
          rows={getRows()}
        >
          <Image
            alt={imageTitle}
            hasBoxShadow
            imageFit="cover"
            imageRef={isLastImage ? lastImageRef : undefined}
            isMinimumLoad={isMinimumLoad}
            maxHeight={imageHeight}
            maxWidth={imageWidth}
            minimumLoadTime={minimumLoadTime}
            src={imageUrl}
          />
        </MuiImageListItem>
      );
    });

  const imageListStyles = clsx('rgf-imageList', `rgf-imageList--${variant}`, {
    [className]: !!className,
  });

  return (
    <StyledMuiImageList
      className={imageListStyles}
      cols={IMAGE_CONTAINER_COLUMNS}
      gap={isSmallScreen ? IMAGE_SMALL_SCREEN_GAP : IMAGE_LARGE_SCREEN_GAP}
      styleProps={{ maxWidth }}
      variant="quilted"
    >
      {renderImageListItems()}
    </StyledMuiImageList>
  );
}
