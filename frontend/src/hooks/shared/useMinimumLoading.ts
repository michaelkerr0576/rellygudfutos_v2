import { useEffect, useState } from 'react';

export const MINIMUM_LOADING_TIME_MS = 400;

export interface UseMinimumLoading {
  isMinimumLoading: boolean;
}

export interface UseMinimumLoadingProps {
  isLoading: boolean;
  minimumLoadTime?: number | 'infinite';
}

export default function useMinimumLoading(props: UseMinimumLoadingProps): UseMinimumLoading {
  const { isLoading, minimumLoadTime = MINIMUM_LOADING_TIME_MS } = props;

  const [isMinimumLoading, setIsMinimumLoading] = useState<boolean>(isLoading);

  useEffect((): void => {
    const hasMinimumLoad = isMinimumLoading && minimumLoadTime !== 'infinite';
    if (hasMinimumLoad) {
      setTimeout((): void => {
        setIsMinimumLoading(false);
      }, minimumLoadTime);
    }
  }, [isMinimumLoading]);

  return { isMinimumLoading: isLoading || isMinimumLoading };
}
