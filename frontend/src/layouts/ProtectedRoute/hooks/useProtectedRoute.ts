import { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';

export default function useProtectedRoute(
  hasAdminAccess: boolean,
  hasUserAccess: boolean,
  isAdminProtected: boolean,
  isUserProtected: boolean,
): void {
  useEffect((): void => {
    if (isAdminProtected && hasAdminAccess) {
      return;
    }

    if (isUserProtected && hasUserAccess) {
      return;
    }

    const unauthorisedMessage = `Unauthorized. Login in as ${isAdminProtected ? 'Admin' : 'User'}`;
    enqueueSnackbar(unauthorisedMessage, { variant: 'warning' });
  }, [isAdminProtected, isUserProtected, hasAdminAccess, hasUserAccess]);
}
