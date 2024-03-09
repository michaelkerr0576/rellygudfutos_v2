import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import useMenu from '@/hooks/shared/useMenu';

import useGallery from './useGallery';

export default function useGalleryDialogRoutes(): void {
  const location = useLocation();

  const { photoId = '' } = useParams();

  const { handleCloseLoginDialog, handleOpenLoginDialog, isLoginDialogOpen } = useMenu();

  const { handleClosePhotoDialog, handleOpenPhotoDialog, isPhotoDialogOpen } = useGallery();

  const isMounted = useRef<boolean>(true);

  useEffect((): void => {
    if (isMounted.current) {
      // * Check if login URL is a direct link on first render
      const isLoginUrl = location.pathname === '/login';
      if (!isLoginDialogOpen && isLoginUrl) {
        handleOpenLoginDialog();
      }

      // * Check if user removed /login from URL and refreshed
      const isGalleryUrl = location.pathname === '/';
      if (isLoginDialogOpen && isGalleryUrl) {
        handleCloseLoginDialog();
      }
    }
  }, []);

  useEffect((): void => {
    if (isMounted.current) {
      // * Check if photo URL is a direct link on first render
      const isPhotoUrl = photoId && location.pathname === `/photo/${photoId}`;
      if (!isPhotoDialogOpen && isPhotoUrl) {
        handleOpenPhotoDialog(photoId);
      }

      // * Check if user removed /photo/:photoId from URL and refreshed
      const isGalleryUrl = location.pathname === '/';
      if (isPhotoDialogOpen && isGalleryUrl) {
        handleClosePhotoDialog();
      }
    }
  }, []);

  useEffect((): void => {
    if (isMounted.current) {
      isMounted.current = false;
    }
  }, []);
}
