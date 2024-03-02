import { getFilteredPerfumeList, getPerfumeList } from '@/utils/supabase/getPerfumeList';
import { useQuery } from '@tanstack/react-query';

export const useGetPerfumeList = () => {
  return useQuery({ queryKey: ['perfumeList'], queryFn: getPerfumeList, staleTime: 300 });
};

export const useGetFilteredPerfumeList = (notes: string, brands: string) => {
  return useQuery({
    queryKey: ['filteredPerfumeList', notes, brands],
    queryFn: () => getFilteredPerfumeList(notes, brands),
    staleTime: 300,
  });
};
