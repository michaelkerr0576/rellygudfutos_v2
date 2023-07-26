import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import useMenu from '@/hooks/shared/useMenu';

import useGallery from './useGallery';

export default function useGalleryDialogRoutes(): void {
  const location = useLocation();
  const { photoId = '' } = useParams();

  const { isLoginDialogOpen, toggleLoginDialog } = useMenu();
  const { isPhotoDialogOpen, togglePhotoDialog } = useGallery();

  useEffect((): void => {
    if (!isLoginDialogOpen && location.pathname === '/account/login') {
      toggleLoginDialog(true);
    }

    if (isLoginDialogOpen && location.pathname === '/') {
      toggleLoginDialog(false);
    }
  }, []);

  useEffect((): void => {
    if (!isPhotoDialogOpen && location.pathname === `/photo/${photoId}`) {
      togglePhotoDialog(true);
    }

    if (isPhotoDialogOpen && location.pathname === '/') {
      togglePhotoDialog(false);
    }
  }, []);
}
