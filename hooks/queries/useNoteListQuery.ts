import { getNoteList } from '@/utils/supabase/getNoteList';
import { useQuery } from '@tanstack/react-query';

export const useGetNoteList = () => {
  return useQuery({ queryKey: ['noteList'], queryFn: getNoteList, staleTime: 300 });
};
