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
  hasBoxShadow?: boolean;
  imageFit?: ImageFit;
  imageRef?: RefObject<any> | ((node?: Element | null) => void);
  isMinimumLoad?: UseMinimumLoadingProps['isLoading'];
  isOnClickNewTabEnabled?: boolean;
  maxHeight?: string | number;
  maxWidth?: string | number;
  minimumLoadTime?: UseMinimumLoadingProps['minimumLoadTime'];
  onClick?: () => void;
  src: string;
  variant?: Variant;
}

interface ImageStyleProps {
  styleProps: {
    hasBoxShadow: ImageProps['hasBoxShadow'];
    imageFit: ImageProps['imageFit'];
    isFinishedTransition: boolean;
    isInteractable: boolean;
    maxHeight: ImageProps['maxHeight'];
    maxWidth: ImageProps['maxWidth'];
    variant: ImageProps['variant'];
  };
}

const StyledImg = styled(Box, {
  shouldForwardProp: (prop): boolean => prop !== 'styleProps', // * Filter out styleProps prop when forwarding to DOM
})<ImageStyleProps>(
  ({
    styleProps: {
      hasBoxShadow,
      imageFit,
      isFinishedTransition,
      isInteractable,
      maxHeight,
      maxWidth,
      variant,
    },
    theme,
  }): { [key: string]: any } => ({
    '.rgf': {
      '&-image': {
        '&--img': {
          '&:focus, &:hover': {
            boxShadow: hasBoxShadow && isInteractable ? theme.shadows[6] : theme.shadows[0],
            opacity: isInteractable ? 0.75 : 1,
          },

          borderRadius: variant === 'rounded' ? theme.shape.borderRadius : 0,
          boxShadow: hasBoxShadow && isFinishedTransition ? theme.shadows[3] : theme.shadows[0],
          cursor: isInteractable ? 'pointer' : 'inherit',
          display: 'block',
          height: imageFit === 'cover' ? '100%' : 'inherit',
          maxHeight,
          maxWidth,
          objectFit: imageFit,
          opacity: isFinishedTransition ? 1 : 0,
          transition: theme.transitions.create(['opacity', 'box-shadow'], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          }),
          width: '100%',
        },
      },
      '&-skeleton': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.25)
            : alpha(theme.palette.common.white, 0.75),
        borderRadius: variant === 'rounded' ? theme.shape.borderRadius : 0,
      },
    },

    backgroundColor: alpha(theme.palette.common.black, 0.75),
    borderRadius: variant === 'rounded' ? `${theme.shape.borderRadius + 0.2}px` : 0, // * + 0.2 hides backgroundColor showing at edges
    display: 'flex',
    justifyContent: 'center',
  }),
);

export default function Image(props: ImageProps): JSX.Element {
  const {
    alt,
    className = '',
    hasBoxShadow = false,
    imageFit = 'contain',
    imageRef = undefined,
    isMinimumLoad = false,
    isOnClickNewTabEnabled = false,
    maxHeight = 'inherit',
    maxWidth = 'inherit',
    minimumLoadTime = MINIMUM_LOADING_TIME_MS,
    onClick = undefined,
    src,
    variant = 'rounded',
  } = props;

  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const [isFinishedTransition, setIsFinishedTransition] = useState<boolean>(false);

  const { isMinimumLoading } = useMinimumLoading({
    isLoading: isMinimumLoad ? isImageLoading : false,
    minimumLoadTime,
  });

  const isLoading = isImageLoading || isMinimumLoading;
  const isInteractable = !!onClick || isOnClickNewTabEnabled;

  const handleClick = (): void => {
    const hasOnClick = !!onClick;
    if (hasOnClick) {
      onClick();
    }
    if (isOnClickNewTabEnabled) {
      window.open(src, '_blank');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLImageElement>): void => {
    const isValidKey = event.key === 'Enter' || event.key === ' ';
    if (isValidKey) {
      event.preventDefault();
      handleClick();
    }
  };

  const handleImageLoad = (): void => {
    if (!isLoading) {
      setTimeout((): void => {
        setIsFinishedTransition(true);
      }, 100);
    }

    setIsImageLoading(false);
  };

  const imageStyles = clsx('rgf-image', `rgf-image--${variant}`, {
    [className]: !!className,
  });

  const renderImage = (ref?: ImageProps['imageRef']): JSX.Element => (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <img
      alt={alt}
      className="rgf-image--img"
      loading="lazy"
      onClick={handleClick}
      onKeyDown={isInteractable ? handleKeyDown : undefined}
      onLoad={handleImageLoad}
      ref={ref}
      role={isInteractable ? 'button' : 'img'}
      src={src}
      tabIndex={isInteractable ? 0 : undefined}
    />
  );

  return (
    <StyledImg
      className={imageStyles}
      styleProps={{
        hasBoxShadow,
        imageFit,
        isFinishedTransition,
        isInteractable,
        maxHeight,
        maxWidth,
        variant,
      }}
    >
      {isLoading ? <Skeleton>{renderImage()}</Skeleton> : renderImage(imageRef)}
    </StyledImg>
  );
}
