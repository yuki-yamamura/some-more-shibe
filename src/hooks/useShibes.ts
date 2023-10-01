import axios from 'axios';
import { useCallback, useRef } from 'react';
import useSWRInfinite from 'swr/infinite';

import type { Shibe } from '@/types/Shibe';

const getKey = (index: number) => `/api/shibes?page=${index + 1}`;

const fetcher = async (url: string) => {
  const response = await axios.get<{ shibes: Shibe[] }>(url);

  return response.data;
};

export const useShibes = () => {
  const observer = useRef<IntersectionObserver | null>(null);
  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite<{ shibes: Shibe[] }, Error>(getKey, fetcher, {
      revalidateIfStale: false,
      revalidateFirstPage: false,
      revalidateOnFocus: false,
    });

  const observeIntersection = useCallback(
    (node: Element | null) => {
      if (isLoading || isValidating) return;
      if (observer.current !== null) {
        void observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries.at(0)?.isIntersecting) {
          void setSize(size + 1);
        }
      });

      if (node !== null) {
        void observer.current.observe(node);
      }
    },
    [isLoading, isValidating, setSize, size],
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    observeIntersection,
  };
};
