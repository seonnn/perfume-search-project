import { getBrandList } from '@/utils/supabase/getBrandList';
import { useQuery } from '@tanstack/react-query';

export const useGetBrandList = () => {
  return useQuery({ queryKey: ['noteList'], queryFn: getBrandList, staleTime: 300 });
};
