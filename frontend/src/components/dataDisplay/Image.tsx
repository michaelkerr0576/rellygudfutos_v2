import { RefObject, useState } from 'react';
import clsx from 'clsx';

import { alpha, styled, useTheme } from '@mui/material/styles';

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

const StyledImg = styled('img')(({ theme }): { [key: string]: any } => ({
  '&.rgf': {
    '&-image': {
      '&--clickable': {
        cursor: 'pointer',
      },

      backgroundColor: alpha(theme.palette.common.black, 0.75),
      display: 'block',
      width: '100%',
    },
  },
}));

const StyledImgSkeleton = styled(Box)<Partial<ImageProps>>(({ theme, variant }): { [key: string]: any } => ({
  '.rgf-skeleton': {
    borderRadius: variant === 'rounded' ? theme.shape.borderRadius : 0,
  },

  borderRadius: variant === 'rounded' ? theme.shape.borderRadius : 0,
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

  const theme = useTheme();
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
      'rgf-image--clickable': isOnClickNewTabEnabled,
      // eslint-disable-next-line sort-keys
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
        style={{
          borderRadius: variant === 'rounded' ? theme.shape.borderRadius : 0,
          height: imageFit === 'cover' ? '100%' : 'inherit',
          maxHeight,
          maxWidth,
          objectFit: imageFit,
        }}
      />
    );
  };

  if (isLoading) {
    return (
      <StyledImgSkeleton className="rgf-image--skeleton" variant={variant}>
        <Skeleton>{renderImage()}</Skeleton>
      </StyledImgSkeleton>
    );
  }

  return renderImage(imageRef);
}
