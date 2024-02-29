import { getPerfumeDetail } from '@/utils/supabase/getPerfumeDetail';
import { postPerfume } from '@/utils/supabase/postPerfume';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetPerfumeDetail = (id: string) => {
  return useQuery({ queryKey: ['perfumeDetail', id], queryFn: () => getPerfumeDetail(id), staleTime: 300 });
};

export const usePostPerfumeDetail = () => {
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
