import { RefObject, useState } from 'react';
import clsx from 'clsx';

import { styled } from '@mui/material/styles';

import Skeleton from '../feedback/Skeleton';

type ImageFit = 'contain' | 'cover';
type Variant = 'rounded' | 'square';

export interface ImageProps {
  alt: string;
  className?: string;
  imageFit?: ImageFit;
  imageRef?: RefObject<any> | ((node?: Element | null) => void);
  maxHeight?: string;
  maxWidth?: string;
  src: string;
  variant?: Variant;
}

const StyledImg = styled('img')((): { [key: string]: any } => ({
  display: 'block',
  width: '100%',
}));

export default function Image(props: ImageProps): JSX.Element {
  const {
    alt,
    className = '',
    imageFit = 'contain',
    imageRef = undefined,
    maxHeight = 'inherit',
    maxWidth = 'inherit',
    src,
    variant = 'rounded',
  } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const renderImage = (ref?: ImageProps['imageRef']): JSX.Element => (
    <StyledImg
      alt={alt}
      className={clsx('rgf-image', { [className]: !!className })}
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

  if (isLoading) {
    return <Skeleton>{renderImage()}</Skeleton>;
  }

  return renderImage(imageRef);
}
