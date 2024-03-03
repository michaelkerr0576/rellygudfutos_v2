import { RefObject, useState } from 'react';
import clsx from 'clsx';

import { alpha, styled } from '@mui/material/styles';

import Skeleton from '../feedback/Skeleton';

type ImageFit = 'contain' | 'cover';
type Variant = 'rounded' | 'square';

export interface ImageProps {
  alt: string;
  className?: string;
  imageFit?: ImageFit;
  imageRef?: RefObject<any> | ((node?: Element | null) => void);
  isOnClickNewTabEnabled?: boolean;
  isPermanentlyLoading?: boolean; // * Used for skeleton loaders
  maxHeight?: string | number;
  maxWidth?: string | number;
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

export default function Image(props: ImageProps): JSX.Element {
  const {
    alt,
    className = '',
    imageFit = 'contain',
    imageRef = undefined,
    isOnClickNewTabEnabled = false,
    isPermanentlyLoading = undefined,
    maxHeight = 'inherit',
    maxWidth = 'inherit',
    src,
    variant = 'rounded',
  } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const openImageInNewTab = (): void => {
    window.open(src, '_blank');
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
        onClick={isOnClickNewTabEnabled ? openImageInNewTab : undefined}
        onLoad={(): void => setIsLoading(false)}
        ref={ref}
        src={src}
        style={{
          borderRadius: variant === 'rounded' ? 4 : 0,
          height: imageFit === 'cover' ? '100%' : 'inherit',
          maxHeight,
          maxWidth,
          objectFit: imageFit,
        }}
      />
    );
  };

  if (isPermanentlyLoading || isLoading) {
    return <Skeleton>{renderImage()}</Skeleton>;
  }

  return renderImage(imageRef);
}
