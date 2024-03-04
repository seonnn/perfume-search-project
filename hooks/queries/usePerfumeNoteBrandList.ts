import { getBrandList } from '@/utils/supabase/getBrandList';
import { getNoteList } from '@/utils/supabase/getNoteList';
import { getPerfumeList } from '@/utils/supabase/getPerfumeList';
import { useSuspenseQueries } from '@tanstack/react-query';

export const useGetPerfumeNoteBrandList = () => {
  return useSuspenseQueries({
    queries: [
      { queryKey: ['perfumeList'], queryFn: getPerfumeList, staleTime: 1000 * 60 * 10 },
      { queryKey: ['noteList'], queryFn: getNoteList, staleTime: 1000 * 60 * 10 },
      { queryKey: ['brandList'], queryFn: getBrandList, staleTime: 1000 * 60 * 10 },
    ],
  });
};
