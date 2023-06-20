import { RefObject, useState } from 'react';
import clsx from 'clsx';

import { styled } from '@mui/material/styles';

import Skeleton from '../feedback/Skeleton';

export interface ImageProps {
  alt: string;
  className?: string;
  imageRef?: RefObject<any> | ((node?: Element | null) => void);
  maxHeight?: string;
  maxWidth?: string;
  src: string;
}

const StyledImg = styled('img')((): { [key: string]: any } => ({
  borderRadius: 4,
  display: 'block',
  height: '100%',
  objectFit: 'cover',
  width: '100%',
}));

export default function Image(props: ImageProps): JSX.Element {
  const {
    alt,
    className = '',
    imageRef = undefined,
    maxHeight = 'inherit',
    maxWidth = 'inherit',
    src,
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
        maxHeight,
        maxWidth,
      }}
    />
  );

  if (isLoading) {
    return <Skeleton>{renderImage()}</Skeleton>;
  }

  return renderImage(imageRef);
}
