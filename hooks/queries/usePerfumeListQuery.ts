import { getFilteredPerfumeList, getPerfumeList, getFilterAndSearchPerfumeList } from '@/utils/supabase/getPerfumeList';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetPerfumeList = () => {
  return useSuspenseQuery({
    queryKey: ['perfumeList'],
    queryFn: getPerfumeList,
    staleTime: 1000 * 60 * 10,
  });
};

export const useGetFilteredPerfumeList = (notes: string, brands: string) => {
  return useSuspenseQuery({
    queryKey: ['filteredPerfumeList', notes, brands],
    queryFn: () => getFilteredPerfumeList(notes, brands),
    staleTime: 1000 * 60 * 10,
  });
};

export const useGetFilterAndSearchPerfumeList = (keyword: string, notes: string, brands: string) => {
  return useSuspenseQuery({
    queryKey: ['filterAndSearchPerfumeList', keyword, notes, brands],
    queryFn: () => getFilterAndSearchPerfumeList(keyword, notes, brands),
    staleTime: 1000 * 60 * 10,
  });
};
