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
  isPermanentlyLoading?: boolean; // * Used for skeleton loaders
  maxHeight?: number;
  maxWidth?: number;
  src: string;
  variant?: Variant;
}

const StyledImg = styled('img')(({ theme }): { [key: string]: any } => ({
  backgroundColor: alpha(theme.palette.common.black, 0.75),
  display: 'block',
  width: '100%',
}));

export default function Image(props: ImageProps): JSX.Element {
  const {
    alt,
    className = '',
    imageFit = 'contain',
    imageRef = undefined,
    isPermanentlyLoading = undefined,
    maxHeight = 'inherit',
    maxWidth = 'inherit',
    src,
    variant = 'rounded',
  } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const renderImage = (ref?: ImageProps['imageRef']): JSX.Element => (
    <StyledImg
      alt={alt}
      className={clsx('rgf-image', `rgf-image--${variant}`, { [className]: !!className })}
      loading="lazy"
      onLoad={(): void => setIsLoading(false)}
      src={src}
      ref={ref}
      style={{
        borderRadius: variant === 'rounded' ? 4 : 0,
        height: imageFit === 'cover' ? '100%' : 'inherit',
        maxHeight,
        maxWidth,
        objectFit: imageFit,
      }}
    />
  );

  if (isPermanentlyLoading || isLoading) {
    return <Skeleton>{renderImage()}</Skeleton>;
  }

  return renderImage(imageRef);
}
