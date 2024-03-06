import { getNoteList } from '@/utils/supabase/getNoteList';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetNoteList = () => {
  return useSuspenseQuery({ queryKey: ['noteList'], queryFn: getNoteList, staleTime: 300 });
};
