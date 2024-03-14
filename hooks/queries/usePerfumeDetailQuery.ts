import { deletePerfume } from '@/utils/supabase/deletePerfume';
import { getPerfumeDetail } from '@/utils/supabase/getPerfumeDetail';
import { postPerfume } from '@/utils/supabase/postPerfume';
import { putPerfume } from '@/utils/supabase/putPerfume';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useGetPerfumeDetail = (id: string) => {
  return useQuery({ queryKey: ['perfumeDetail', id], queryFn: () => getPerfumeDetail(id), staleTime: 300 });
};

export const usePostPerfumeDetail = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: postPerfume,
    onSuccess: (data) => {
      if (data.status === 409) {
        window.alert('이미 등록된 향수입니다.');
      } else {
        window.alert('향수 등록이 완료되었습니다.');
        queryClient.invalidateQueries({ queryKey: ['perfumeList'] });
        router.push('/admin/perfume');
      }
    },
  });
};

export const usePutPerfumeDetail = (perfumeId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: putPerfume,
    onSuccess: (data) => {
      if (data.status === 409) {
        window.alert('수정된 정보가 없습니다. 향수 정보를 수정하시려면 수정된 정보를 입력해주세요.');
      } else {
        window.alert('향수 수정이 완료되었습니다.');
        queryClient.invalidateQueries({ queryKey: ['perfumeList', perfumeId] });
        router.push('/admin/perfume');
      }
    },
  });
};

export const useDeletePerfumeDetail = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deletePerfume,
    onSuccess: () => {
      window.alert('향수 정보가 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['perfumeList'] });
      router.push('/admin/perfume');
    },
  });
};
