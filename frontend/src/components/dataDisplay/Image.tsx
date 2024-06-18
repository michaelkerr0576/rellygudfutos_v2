import { RefObject, useState } from 'react';
import clsx from 'clsx';

import { alpha, styled } from '@mui/material/styles';

import useMinimumLoading, {
  MINIMUM_LOADING_TIME_MS,
  UseMinimumLoadingProps,
} from '@/hooks/shared/useMinimumLoading';

import Skeleton from '../feedback/Skeleton';
import Box from '../layout/Box';

type ImageFit = 'contain' | 'cover';
type Variant = 'rounded' | 'square';

export interface ImageProps {
  alt: string;
  className?: string;
  imageFit?: ImageFit;
  imageRef?: RefObject<any> | ((node?: Element | null) => void);
  isMinimumLoad?: UseMinimumLoadingProps['isLoading'];
  isOnClickNewTabEnabled?: boolean;
  maxHeight?: string | number;
  maxWidth?: string | number;
  minimumLoadTime?: UseMinimumLoadingProps['minimumLoadTime'];
  src: string;
  variant?: Variant;
}

interface ImageStyleProps {
  styleProps: {
    imageFit: ImageProps['imageFit'];
    isOnClickNewTabEnabled: ImageProps['isOnClickNewTabEnabled'];
    maxHeight: ImageProps['maxHeight'];
    maxWidth: ImageProps['maxWidth'];
    variant: ImageProps['variant'];
  };
}

interface ImageSkeletonStyleProps {
  styleProps: {
    variant: ImageProps['variant'];
  };
}

const StyledImg = styled('img', {
  shouldForwardProp: (prop): boolean => prop !== 'styleProps', // * Filter out styleProps prop when forwarding to DOM
})<ImageStyleProps>(
  ({
    styleProps: { imageFit, isOnClickNewTabEnabled, maxHeight, maxWidth, variant },
    theme,
  }): { [key: string]: any } => ({
    backgroundColor: alpha(theme.palette.common.black, 0.75),
    borderRadius: variant === 'rounded' ? theme.shape.borderRadius : 0,
    cursor: isOnClickNewTabEnabled ? 'pointer' : 'inherit',
    display: 'block',
    height: imageFit === 'cover' ? '100%' : 'inherit',
    maxHeight,
    maxWidth,
    objectFit: imageFit,
    width: '100%',
  }),
);

const StyledImgSkeleton = styled(Box, {
  shouldForwardProp: (prop): boolean => prop !== 'styleProps', // * Filter out styleProps prop when forwarding to DOM
})<ImageSkeletonStyleProps>(({ styleProps: { variant }, theme }): { [key: string]: any } => ({
  '.rgf-skeleton': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.common.white, 0.25)
        : alpha(theme.palette.common.white, 0.75),
    borderRadius: variant === 'rounded' ? theme.shape.borderRadius : 0,
  },

  backgroundColor: alpha(theme.palette.common.black, 0.75),
  borderRadius: variant === 'rounded' ? `${theme.shape.borderRadius + 0.2}px` : 0, // * + 0.2 hides backgroundColor showing at edges
  display: 'flex',
  justifyContent: 'center',
}));

export default function Image(props: ImageProps): JSX.Element {
  const {
    alt,
    className = '',
    imageFit = 'contain',
    imageRef = undefined,
    isMinimumLoad = false,
    isOnClickNewTabEnabled = false,
    maxHeight = 'inherit',
    maxWidth = 'inherit',
    minimumLoadTime = MINIMUM_LOADING_TIME_MS,
    src,
    variant = 'rounded',
  } = props;

  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  const { isMinimumLoading } = useMinimumLoading({
    isLoading: isMinimumLoad ? isImageLoading : false,
    minimumLoadTime,
  });
  const isLoading = isImageLoading || isMinimumLoading;

  const handleOpenImageInNewTab = (): void => {
    window.open(src, '_blank');
  };

  const handleImageLoad = (): void => {
    setIsImageLoading(false);
  };

  const renderImage = (ref?: ImageProps['imageRef']): JSX.Element => {
    const imageStyles = clsx('rgf-image', `rgf-image--${variant}`, {
      [className]: !!className,
    });

    return (
      <StyledImg
        alt={alt}
        className={imageStyles}
        loading="lazy"
        onClick={isOnClickNewTabEnabled ? handleOpenImageInNewTab : undefined}
        onLoad={handleImageLoad}
        ref={ref}
        src={src}
        styleProps={{ imageFit, isOnClickNewTabEnabled, maxHeight, maxWidth, variant }}
      />
    );
  };

  if (isLoading) {
    return (
      <StyledImgSkeleton className="rgf-image--skeleton" styleProps={{ variant }}>
        <Skeleton>{renderImage()}</Skeleton>
      </StyledImgSkeleton>
    );
  }

  return renderImage(imageRef);
}
