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
    const isLoginUrl = !isLoginDialogOpen && location.pathname === '/account/login';
    if (isLoginUrl) {
      toggleLoginDialog(true);
    }

    const isGalleryUrl = isLoginDialogOpen && location.pathname === '/';
    if (isGalleryUrl) {
      toggleLoginDialog(false);
    }
  }, []);

  useEffect((): void => {
    const isPhotoUrl = !isPhotoDialogOpen && location.pathname === `/photo/${photoId}`;
    if (isPhotoUrl) {
      togglePhotoDialog(true);
    }

    const isGalleryUrl = isPhotoDialogOpen && location.pathname === '/';
    if (isGalleryUrl) {
      togglePhotoDialog(false);
    }
  }, []);
}
