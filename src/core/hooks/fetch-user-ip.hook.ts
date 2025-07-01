import { useEffect } from 'react';

import { useGetUserIPStore } from '../stores/get-user-ip.store';

export const useFetchUserIP = () => {
  const fetchUserIp = useGetUserIPStore((state) => state.fetchUserIP);
  const userIP = useGetUserIPStore((state) => state.userIP);
  const isUserIPLoading = useGetUserIPStore((state) => state.loading);
  const userIpFetchError = useGetUserIPStore((state) => state.error);

  useEffect(() => {
    fetchUserIp();
  }, [fetchUserIp]);

  return {
    userIP,
    isUserIPLoading,
    userIpFetchError,
  };
};
