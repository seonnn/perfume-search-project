import { getPerfumeList } from '@/utils/supabase/getPerfumeList';
import { postPerfume } from '@/utils/supabase/postPerfume';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetPerfumeList = () => {
  return useQuery({ queryKey: ['perfumeList'], queryFn: getPerfumeList, staleTime: 300 });
};

export const usePostPerfume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPerfume,
    onSuccess: (data) => {
      if (data.status === 409) {
        window.alert('이미 등록된 향수입니다.');
      } else {
        window.alert('향수 등록이 완료되었습니다.');
        queryClient.invalidateQueries({ queryKey: ['perfumeList'] });
      }
    },
  });
};
