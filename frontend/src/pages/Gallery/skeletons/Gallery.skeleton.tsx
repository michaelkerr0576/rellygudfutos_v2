import ImageList from '@/components/dataDisplay/ImageList';
import Box from '@/components/layout/Box';
import { PhotoAspectRatio } from '@/types/api/photo.types';
import { LayoutVariant } from '@/types/store/gallery.types';

import { GALLERY_MAX_WIDTH } from '../constants';

export interface GallerySkeletonProps {
  variant: LayoutVariant;
}

export default function GallerySkeleton(props: GallerySkeletonProps): JSX.Element {
  const { variant } = props;

  const photosSkeleton = [
    {
      _id: '1',
      aspectRatio: PhotoAspectRatio.LANDSCAPE,
      image: {
        height: 720,
        url: '../../../../src/assets/images/greyBackground_landscape.jpg',
        width: 1080,
      },
      title: 'Image skeleton loader',
    },
    {
      _id: '2',
      aspectRatio: PhotoAspectRatio.PORTRAIT,
      image: {
        height: 1080,
        url: '../../../../src/assets/images/greyBackground_portrait.jpg',
        width: 720,
      },
      title: 'Image skeleton loader',
    },
    {
      _id: '3',
      aspectRatio: PhotoAspectRatio.PORTRAIT,
      image: {
        height: 1080,
        url: '../../../../src/assets/images/greyBackground_portrait.jpg',
        width: 720,
      },
      title: 'Image skeleton loader',
    },
    {
      _id: '4',
      aspectRatio: PhotoAspectRatio.LANDSCAPE,
      image: {
        height: 720,
        url: '../../../../src/assets/images/greyBackground_landscape.jpg',
        width: 1080,
      },
      title: 'Image skeleton loader',
    },
    {
      _id: '5',
      aspectRatio: PhotoAspectRatio.PORTRAIT,
      image: {
        height: 1080,
        url: '../../../../src/assets/images/greyBackground_portrait.jpg',
        width: 720,
      },
      title: 'Image skeleton loader',
    },
    {
      _id: '6',
      aspectRatio: PhotoAspectRatio.PORTRAIT,
      image: {
        height: 1080,
        url: '../../../../src/assets/images/greyBackground_portrait.jpg',
        width: 720,
      },
      title: 'Image skeleton loader',
    },
  ];

  return (
    <Box className="rgf-gallery">
      <ImageList
        images={photosSkeleton}
        isPermanentlyLoading
        maxWidth={GALLERY_MAX_WIDTH}
        onClick={(): void => {}}
        variant={variant}
      />
    </Box>
  );
}
