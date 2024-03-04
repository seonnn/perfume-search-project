import { getBrandList } from '@/utils/supabase/getBrandList';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetBrandList = () => {
  return useSuspenseQuery({ queryKey: ['brandList'], queryFn: getBrandList, staleTime: 300 });
};
