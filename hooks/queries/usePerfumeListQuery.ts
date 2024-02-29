import { getPerfumeList } from '@/utils/supabase/getPerfumeList';
import { useQuery } from '@tanstack/react-query';

export const useGetPerfumeList = () => {
  return useQuery({ queryKey: ['perfumeList'], queryFn: getPerfumeList, staleTime: 300 });
};
