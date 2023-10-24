import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import useMenu from '@/hooks/shared/useMenu';

import useGallery from './useGallery';

export default function useGalleryDialogRoutes(): void {
  const location = useLocation();

  const { photoId = '' } = useParams();

  const { isLoginDialogOpen, toggleLoginDialog } = useMenu();

  const { isPhotoDialogOpen, togglePhotoDialog } = useGallery();

  const isMounted = useRef<boolean>(true);

  useEffect((): void => {
    if (isMounted.current) {
      // * Check if login URL is a direct link on first render
      const isLoginUrl = location.pathname === '/login';
      if (!isLoginDialogOpen && isLoginUrl) {
        toggleLoginDialog(true);
      }

      // * Check if user removed /login from URL and refreshed
      const isGalleryUrl = location.pathname === '/';
      if (isLoginDialogOpen && isGalleryUrl) {
        toggleLoginDialog(false);
      }
    }
  }, []);

  useEffect((): void => {
    if (isMounted.current) {
      // * Check if photo URL is a direct link on first render
      const isPhotoUrl = photoId && location.pathname === `/photo/${photoId}`;
      if (!isPhotoDialogOpen && isPhotoUrl) {
        togglePhotoDialog(true, photoId);
      }

      // * Check if user removed /photo/:photoId from URL and refreshed
      const isGalleryUrl = location.pathname === '/';
      if (isPhotoDialogOpen && isGalleryUrl) {
        togglePhotoDialog(false);
      }
    }
  }, []);

  useEffect((): void => {
    if (isMounted.current) {
      isMounted.current = false;
    }
  }, []);
}
