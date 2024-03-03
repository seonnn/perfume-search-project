import { getFilteredPerfumeList, getPerfumeList, getFilterAndSearchPerfumeList } from '@/utils/supabase/getPerfumeList';
import { useQuery } from '@tanstack/react-query';

export const useGetPerfumeList = () => {
  return useQuery({
    queryKey: ['perfumeList'],
    queryFn: getPerfumeList,
    staleTime: 300000,
  });
};

export const useGetFilteredPerfumeList = (notes: string, brands: string) => {
  return useQuery({
    queryKey: ['filteredPerfumeList', notes, brands],
    queryFn: () => getFilteredPerfumeList(notes, brands),
    staleTime: 300000,
  });
};

export const useGetFilterAndSearchPerfumeList = (keyword: string, notes: string, brands: string) => {
  return useQuery({
    queryKey: ['filterAndSearchPerfumeList', keyword, notes, brands],
    queryFn: () => getFilterAndSearchPerfumeList(keyword, notes, brands),
    staleTime: 300000,
  });
};
